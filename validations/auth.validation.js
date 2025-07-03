const z = require("zod");

const sendOtpSchema = z.object({
	phone: z
		.string()
		.regex(
			/^\d{10}$/,
			"Invalid phone number format. Must be exactly 10 digits."
		),
});

const verifyOtpSchema = z.object({
	phone: z
		.string()
		.regex(
			/^\d{10}$/,
			"Invalid phone number format. Must be exactly 10 digits."
		),
	verification_id: z.string().min(1, "Verification ID is required."),
	otp: z.string().min(4, "OTP must be at least 4 digits."),
});

module.exports = {
	sendOtpSchema,
	verifyOtpSchema,
};
