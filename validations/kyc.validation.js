const z = require("zod");

const kycSchema = z.object({
	firstName: z
		.string({ required_error: "First name is required" })
		.min(1, "First name is required"),
	lastName: z
		.string({ required_error: "Last name is required" })
		.min(1, "Last name is required"),
	gender: z
		.string()
		.min(1)
		.max(1)
		.regex(/^[FMT]$/, "Invalid gender"),
	dob: z.string({
		required_error: "Date of birth is required",
	}),
	state: z
		.string({
			required_error: "State is required",
		})
		.length(2, "State code must be exactly 2 characters"),
	pincode: z
		.string({ required_error: "Pincode is required" })
		.regex(/^\d{6}$/, "Pincode must be exactly 6 digits"),
	fatherName: z.string(),
	phone: z
		.string({ required_error: "Phone number is required" })
		.regex(
			/^\d{10}$/,
			"Invalid phone number format. Must be exactly 10 digits."
		),
	email: z
		.string({ required_error: "Email is required" })
		.email("Invalid email format"),
	employmentStatus: z.enum(["salaried", "non-salaried"], {
		required_error: "Employment status is required",
	}),
	monthlySalary: z.number().nullable().optional(),
	companyName: z.string().optional(),
	companyAddress: z.string().optional(),
	companyPinCode: z.string().optional(),
	salaryMode: z.enum(["NEFT", "IMPS", "CASH"]).optional(),
	aadharNumber: z
		.string({ required_error: "Aadhar number is required" })
		.regex(/^\d{12}$/, "Aadhar number must be exactly 12 digits"),
	panNumber: z
		.string({ required_error: "PAN number is required" })
		.regex(/^[A-Z]{5}\d{4}[A-Z]$/, "Invalid PAN number format"),
	address: z
		.string({ required_error: "Address is required" })
		.min(1, "Address is required"),
});

module.exports = { kycSchema };
