const axios = require("axios");
const User = require("../models/User");
const { generateToken } = require("../utils/jwt");
const { v4: uuidv4 } = require("uuid");
const {
	sendOtpSchema,
	verifyOtpSchema,
	adminLoginSchema,
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
			`${process.env.CASHFREE_API_URI}/verification/mobile360/otp/send`,
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

	const { otp, verification_id, phone } = result.data;

	try {
		await axios.post(
			`${process.env.CASHFREE_API_URI}/verification/mobile360/otp/verify`,
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
		const userObject = user.toObject();
		const userPayload = {
			_id: userObject._id,
			role: userObject.role,
			phone: userObject.phone,
		};
		const token = await generateToken(userPayload);

		res.status(200).json({
			success: true,
			message: "Phone verified successfully",
			token,
			data: user,
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

async function handleAdminLogin(req, res) {
	const result = adminLoginSchema.safeParse(req.body);

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

	const { email, password } = result.data;

	try {
		const admin = await User.findOne({ email, role: "admin" });

		if (!admin) {
			return res.status(404).json({
				success: false,
				message: "Admin not found",
			});
		}

		if (admin.password !== password) {
			return res.status(401).json({
				success: false,
				message: "Invalid password",
			});
		}

		const {
			password: _,
			referralCode,
			referralBonus,
			...safeAdmin
		} = admin.toObject();
		const adminDataPayload = {
			_id: safeAdmin._id,
			email: safeAdmin.email,
			role: safeAdmin.role,
			phone: safeAdmin?.phone,
		};
		const token = await generateToken(adminDataPayload);

		res.status(200).json({
			success: true,
			message: "Admin login successful",
			token,
			data: safeAdmin,
		});
	} catch (err) {
		res.status(500).json({
			success: false,
			message: "Server error",
			error: err.message,
		});
	}
}

module.exports = {
	handleSendOtp,
	handleVerifyOtp,
	handleAdminLogin,
};
