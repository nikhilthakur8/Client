const axios = require("axios");
const User = require("../models/User");
const { generateToken } = require("../utils/jwt");
const { v4: uuidv4 } = require("uuid");
async function handleSendOtp(req, res) {
	const body = req.body;
	const phone = body?.phone;

	if (!/^\d{10}$/.test(phone)) {
		return res.status(400).json({
			success: false,
			error: "Invalid phone number format. Must be exactly 10 digits.",
		});
	}

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

		// ✅ 5. Return response to client
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
	if (
		!req.body ||
		!req.body.phone ||
		!req.body.verification_id ||
		!req.body.otp
	) {
		return res.status(400).json({
			success: false,
			message: "Phone number, verification ID, and OTP are required.",
		});
	}
	const { otp, verification_id, phone } = req.body;
	try {
		await axios.post(
			"https://sandbox.cashfree.com/verification/mobile360/otp/verify",
			{
				verification_id: verification_id,
				otp,
			},
			{
				headers: {
					"x-client-id": process.env.CASHFREE_CLIENT_ID,
					"x-client-secret": process.env.CASHFREE_CLIENT_SECRET,
					"x-api-version": process.env.CASHFREE_API_VERSION,
					"Content-Type": "application/json",
				},
			}
		);

		const user = await User.findOneAndUpdate(
			{ phone },
			{ $set: { isPhoneVerified: true } },
			{ new: true, upsert: true }
		);
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
			"OTP send failed";
		res.status(status).json({
			success: false,
			message,
		});
	}
}

module.exports = { handleVerifyOtp };

module.exports = {
	handleSendOtp,
	handleVerifyOtp,
};
