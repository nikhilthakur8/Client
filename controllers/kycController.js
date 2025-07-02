const Kyc = require("../models/Kyc");
const axios = require("axios");

const headers = {
	"x-client-id": process.env.CASHFREE_ONBOARDING_CLIENT_ID,
	"x-client-secret": process.env.CASHFREE_ONBOARDING_CLIENT_SECRET,
	"x-api-version": process.env.CASHFREE_API_VERSION,
};
async function handleKycStart(req, res) {
	try {
		const { kycData } = req?.body;
		const user = req.user;

		if (!kycData || !user) {
			return res
				.status(400)
				.json({ success: false, message: "Missing KYC data or user" });
		}

		const userKycData = await Kyc.create({
			userId: user._id,
			...kycData,
		});

		console.log(headers);

		// 🚀 Start Cashfree KYC session
		const response = await axios.post(
			"https://sandbox.cashfree.com/verification/oauth2/session",
			{
				user: {
					identifier_type: "MOBILE",
					identifier_value: user.phone,
				},
				verification_id: userKycData._id.toString(),
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
			"https://sandbox.cashfree.com/verification/oauth2/user-details",
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
					"Content-Type": "application/json",
					"x-api-version": headers["x-api-version"],
				},
			}
		);

		// extract scope from cashfree response
		await Kyc.findByIdAndUpdate(
			{ _id: authCode },
			getSanitizeKycData(cashfreeKyc)
		);
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
