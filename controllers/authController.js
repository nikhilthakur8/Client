const axios = require("axios");
const User = require("../models/User");
const { generateToken } = require("../utils/jwt");
const { v4: uuidv4 } = require("uuid");
const {
	sendOtpSchema,
	verifyOtpSchema,
} = require("../validations/auth.validation");

async function handleSendOtp(req, res) {
	const result = sendOtpSchema.safeParse(req.body);

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

	const { phone } = result.data;

	try {
		const requestBody = {
			mobile_number: phone,
			verification_id: uuidv4(),
			name: "User",
			notification_modes: ["SMS"],
			user_consent: {
				timestamp: new Date().toISOString(),
				purpose: "Phone number verification",
				obtained: true,
				type: "EXPLICIT",
			},
		};

		const response = await axios.post(
			"https://sandbox.cashfree.com/verification/mobile360/otp/send",
			requestBody,
			{
				headers: {
					"x-client-id": process.env.CASHFREE_CLIENT_ID,
					"x-client-secret": process.env.CASHFREE_CLIENT_SECRET,
					"x-api-version": process.env.CASHFREE_API_VERSION,
					"Content-Type": "application/json",
				},
			}
		);

		res.status(200).json({ success: true, data: response.data });
	} catch (err) {
		const status = err.response?.status || 500;
		const message =
			err.response?.data?.message ||
			err.response?.data?.error ||
			err.message ||
			"OTP send failed";

		res.status(status).json({
			success: false,
			message,
		});
	}
}

async function handleVerifyOtp(req, res) {
	const result = verifyOtpSchema.safeParse(req.body);

	if (!result.success) {
		return res.status(400).json({
			success: false,
			errors: result.error.errors.map((e) => e.message),
		});
	}

	const { otp, verification_id, phone } = result.data;

	try {
		await axios.post(
			"https://sandbox.cashfree.com/verification/mobile360/otp/verify",
			{ verification_id, otp },
			{
				headers: {
					"x-client-id": process.env.CASHFREE_CLIENT_ID,
					"x-client-secret": process.env.CASHFREE_CLIENT_SECRET,
					"x-api-version": process.env.CASHFREE_API_VERSION,
					"Content-Type": "application/json",
				},
			}
		);

		let user = await User.findOne({ phone });
		if (!user) {
			user = await User.create({ phone, isPhoneVerified: true });
		} else {
			user.isPhoneVerified = true;
			await user.save();
		}
		console.log("User after phone verification:", user);
		const token = await generateToken(user.toObject());

		res.status(200).json({
			success: true,
			message: "Phone verified successfully",
			token,
		});
	} catch (err) {
		const status = err.response?.status || 500;
		const message =
			err.response?.data?.message ||
			err.response?.data?.error ||
			err.message ||
			"OTP verification failed";

		res.status(status).json({
			success: false,
			message,
		});
	}
}

module.exports = {
	handleSendOtp,
	handleVerifyOtp,
};
