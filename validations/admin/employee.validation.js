const z = require("zod");

const employeeSchema = z.object({
	fullName: z.string().min(1, "Full name is required"),
	employeeId: z.string().min(1, "Employee ID is required"),
	phone: z
		.string()
		.regex(
			/^\d{10}$/,
			"Invalid phone number format. Must be exactly 10 digits."
		),
	email: z.string().email("Invalid email format"),
	password: z
		.string()
		.min(8, "Password must be at least 8 characters long")
		.regex(/[a-z]/, "Password must contain at least one lowercase letter")
		.regex(/[A-Z]/, "Password must contain at least one uppercase letter")
		.regex(/\d/, "Password must contain at least one number")
		.regex(
			/[@$!%*?&]/,
			"Password must contain at least one special character"
		),
	address: z.string().min(1, "Address is required"),
});

module.exports = {
	employeeSchema,
};
