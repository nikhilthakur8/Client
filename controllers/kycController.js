const axios = require("axios");
const User = require("../models/User");
const { kycSchema } = require("../validations/kyc.validation");
const { v4: uuidv4 } = require("uuid");

const headers = {
	"x-client-id": process.env.CASHFREE_ONBOARDING_CLIENT_ID,
	"x-client-secret": process.env.CASHFREE_ONBOARDING_CLIENT_SECRET,
	"x-api-version": process.env.CASHFREE_API_VERSION,
};
async function handleKycStart(req, res) {
	if (!req.body?.kycData) {
		return res.status(400).json({
			success: false,
			message: "KYC data is required",
		});
	}
	try {
		const { kycData, referralCode } = req?.body;
		const user = await User.findById(req.user._id);
		// Validate KYC data
		const result = kycSchema.safeParse(kycData);
		if (!result.success) {
			const errorResponse = {};
			result.error.errors.forEach((err) => {
				console.log(err.path);
				const field = err.path?.[0] || "unknown";
				const message = err.message || "Invalid input";
				errorResponse[field] = message;
			});
			return res.status(400).json({
				success: false,
				errors: errorResponse,
			});
		}

		// referral code processing
		if (referralCode && referralCode.length === 6) {
			try {
				await User.updateOne(
					{ referralCode },
					{ $inc: { referralBonus: 50 } }
				);
			} catch (error) {
				console.error("Error processing referral:", error);
				return res.json({
					success: false,
					message: "Invalid referral code",
				});
			}
		}
		// create kyc data in database
		user.kyc.userProvidedData = kycData;

		await user.save();

		//  Start Cashfree KYC session
		const response = await axios.post(
			`${process.env.CASHFREE_API_URI}/verification/oauth2/session`,
			{
				user: {
					identifier_type: "MOBILE",
					identifier_value: user.phone,
				},
				verification_id: uuidv4().split("-").join(""),
			},
			{
				headers: {
					"Content-Type": "application/json",
					...headers,
				},
			}
		);
		res.status(200).json({
			success: true,
			message: "KYC session started successfully",
			data: response.data,
		});
	} catch (error) {
		const status = error.response?.status || 500;
		const message =
			error.response?.data?.message ||
			error.response?.data?.error ||
			error.message;

		res.status(status).json({
			success: false,
			message: "Failed to start KYC session",
			error: message,
		});
	}
}

async function handleKycCallback(req, res) {
	const { authCode } = req.params;
	if (!authCode) {
		return res.status(400).json({ error: "Auth Code Missing" });
	}
	try {
		const response = await axios.post(
			"https://sandbox.cashfree.com/verification/oauth2/generate-token",
			{
				auth_code: authCode,
			},
			{
				headers: {
					"Content-Type": "application/json",
					...headers,
				},
			}
		);
		const { accessToken } = response.data;

		// Fetch KYC data using the access token
		const cashfreeKyc = await axios.get(
			`${process.env.CASHFREE_API_URI}/verification/oauth2/user-details`,
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
					"Content-Type": "application/json",
					"x-api-version": headers["x-api-version"],
				},
			}
		);

		// extract scope from cashfree response
		const updatedUser = await User.findOneAndUpdate(
			{ _id: req.user._id },
			{
				$set: {
					"kyc.cashfreeKycData": getSanitizeKycData(cashfreeKyc.data),
				},
			},
			{ new: true } // <-- This returns the updated document
		);
		res.status(200).json({
			success: true,
			message: "KYC data fetched successfully",
			data: updatedUser,
		});
	} catch (error) {
		const status = error.response?.status || 500;
		const message =
			error.response?.data?.message ||
			error.response?.data?.error ||
			error.message;

		res.status(status).json({
			success: false,
			message: "Failed to fetch KYC data",
			error: message,
		});
	}
}

function getSanitizeKycData(cashfreeKyc) {
	const extractScope = (scopes, key) => {
		const scope = scopes.find((s) => s.scope === key);
		return scope && scope.records.length > 0
			? scope.records[0].metadata
			: null;
	};

	const scopes = cashfreeKyc.scopes;

	const aadhaar = extractScope(scopes, "AADHAAR");
	const pan = extractScope(scopes, "PAN");
	const name = extractScope(scopes, "NAME");
	const mobile = extractScope(scopes, "MOBILE");
	const email = extractScope(scopes, "EMAIL");
	const address = extractScope(scopes, "ADDRESS");
	const gender = extractScope(scopes, "GENDER");
	const dob = extractScope(scopes, "DOB");
	const occupation = extractScope(scopes, "OCCUPATION");
	const income = extractScope(scopes, "INCOME");
	const bank = extractScope(scopes, "BANK_ACCOUNT");

	const sanitizedKycData = {
		// Core verified fields
		verifiedName:
			name?.name || aadhaar?.name || pan?.registered_name || null,
		verifiedEmail: email?.email || aadhaar?.email || null,
		verifiedMobile: mobile?.mobile || null,

		// Aadhaar details
		aadhaarMasked: aadhaar?.aadhaar || null,
		aadhaarCareOf: aadhaar?.care_of || null,
		aadhaarDob: aadhaar?.dob || null,
		aadhaarGender: aadhaar?.gender || null,
		aadhaarFullAddress: aadhaar?.address || null,
		aadhaarPhotoLink: aadhaar?.photo_link || null,
		aadhaarSplitAddress: aadhaar?.split_address || null,

		// PAN details
		panNumber: pan?.pan || null,
		panName: pan?.name_pan_card || pan?.registered_name || null,
		panType: pan?.type || null,
		aadhaarSeedingStatus: pan?.aadhaar_seeding_status || null,
		aadhaarSeedingStatusDesc: pan?.aadhaar_seeding_status_desc || null,
		panLastUpdated: pan?.last_updated_at || null,

		// General KYC info
		dob: dob?.dob || aadhaar?.dob || null,
		gender: gender?.gender || aadhaar?.gender || null,
		incomeCategory: income?.income || null,
		occupation: occupation?.occupation || null,
		fullVerifiedAddress:
			address?.complete_address || aadhaar?.address || null,

		// Bank details
		bankDetails: bank
			? {
					bankAccount: bank.bank_account || null,
					bankName: bank.bank_name || null,
					nameAtBank: bank.name_at_bank || null,
					city: bank.city || null,
					branch: bank.branch || null,
					micr: bank.micr || null,
			  }
			: null,

		// Meta data
		referenceId: cashfreeResponse.reference_id || null,
		verificationId: cashfreeResponse.verification_id || null,
		kycStatus: "verified",
	};

	return sanitizedKycData;
}

module.exports = {
	handleKycStart,
	handleKycCallback,
};
