const User = require("../models/User");
const { subscriptionSchema } = require("../validations/user.validation");
const { v4: uuidv4 } = require("uuid");
const axios = require("axios");

async function handleGetProfile(req, res) {
	const userId = req.user._id;

	try {
		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({
				success: false,
				message: "User not found",
			});
		}
		return res.status(200).json({
			success: true,
			data: user,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Server error",
		});
	}
}

async function handleSubscription(req, res) {
	const userId = req.user._id;

	const result = subscriptionSchema.safeParse(req.body);

	if (!result.success) {
		const errorResponse = {};
		result.error.errors.forEach((err) => {
			const field = err.path?.[0] || "unknown";
			const message = err.message || "Invalid input";
			errorResponse[field] = message;
		});
		return res.status(400).json({
			success: false,
			errors: errorResponse,
		});
	}
	const { plan, startDate, endDate } = result.data;

	try {
		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({
				success: false,
				message: "User not found",
			});
		}

		user.subscription = {
			plan,
			startDate,
			endDate,
		};

		await user.save();
		return res.status(200).json({
			success: true,
			message: "Subscription created successfully",
			user: user,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Server error",
		});
	}
}

async function handleCibilCheck(req, res) {
	const { _id } = req.user;
	console.log("Checking CIBIL score for user:", _id);
	try {
		const user = await User.findById(_id);
		if (!user.kyc && !user.kyc.userProvidedData) {
			return res.status(400).json({
				success: false,
				message: "KYC not completed",
			});
		}
		const userProvidedData = user.kyc.userProvidedData;
		const cibilScore = await checkCibilScore(userProvidedData);
		if (!cibilScore) {
			return res.status(400).json({
				success: false,
				message:
					"CIBIL score not found or user is not eligible for Loan",
			});
		}
		user.cibilScore = Number(cibilScore);
		await user.save();
		return res.status(200).json({
			success: true,
			message: "CIBIL score retrieved successfully",
			data: user,
		});
	} catch (error) {
		console.error("Error checking CIBIL score:", error.response?.data || error.message);
		return res.status(500).json({
			success: false,
			message: "Server error: " + error.message,
		});
	}
}

const checkCibilScore = async (userProvidedData) => {
	const reqDetails = {
		first_name: userProvidedData.firstName,
		MiddleName: "",
		last_name: userProvidedData.lastName,
		gender: userProvidedData.gender,
		dob: userProvidedData.dob,
		phone: userProvidedData.phone,
		id_type: "T",
		id_value: userProvidedData.panNumber,
		InquiryPurpose: "05",
		pin_code: userProvidedData.pincode,
		state: userProvidedData.state,
		address: userProvidedData.address,
		AdditionalNameType: "F",
		AdditionalName: userProvidedData.fatherName,
		ref_id: uuidv4(),
	};
	console.log("Request Details for CIBIL Check:", reqDetails);
	const response = await axios.post(
		"https://api.anvineo.in/api/cibil-check",
		reqDetails,
		{
			headers: {
				"Content-Type": "application/json",
				authorizations: process.env.ANVINEO_AUTHORIZATION,
				mkey: process.env.ANVINEO_API_MKEY,
				mid: process.env.ANVINEO_API_MID,
			},
		}
	);
	console.log(
		process.env.ANVINEO_API_MID,
		process.env.ANVINEO_API_MKEY,
		process.env.ANVINEO_AUTHORIZATION
	);
	if (response.data.data.InquiryResponseHeader.SuccessCode === "0") {
		throw new Error(
			"CIBIL score not found or user is not eligible for Loan"
		);
	}

	return response.data.data.CCRResponse.CIRReportDataLst[0].CIRReportData
		.ScoreDetails[0].Value;
};

module.exports = {
	handleGetProfile,
	handleSubscription,
	handleCibilCheck,
};
