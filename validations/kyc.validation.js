const z = require("zod");

const kycSchema = z.object({
	fullName: z.string().min(1, "Full name is required"),
	phone: z
		.string()
		.regex(
			/^\d{10}$/,
			"Invalid phone number format. Must be exactly 10 digits."
		),
	email: z.string().email("Invalid email format"),
	employmentStatus: z.enum(["salaried", "non-salaried"]),
	monthlySalary: z.number().optional(),
	companyName: z.string().optional(),
	companyAddress: z.string().optional(),
	companyPinCode: z.string().optional(),
	salaryMode: z.enum(["NEFT", "IMPS", "CASH"]).optional(),
	aadharNumber: z
		.string()
		.regex(/^\d{12}$/, "Aadhar number must be exactly 12 digits"),
	panNumber: z
		.string()
		.regex(/^[A-Z]{5}\d{4}[A-Z]$/, "Invalid PAN number format"),
	address: z.string().min(1, "Address is required"),
});

module.exports = { kycSchema };
