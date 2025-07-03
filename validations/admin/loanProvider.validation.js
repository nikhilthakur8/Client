const z = require("zod");

const loanProviderSchema = z.object({
	loanName: z
		.string()
		.min(1, "Loan name is required")
		.max(100, "Loan name must be less than 100 characters"),
	bankName: z
		.string()
		.min(1, "Bank name is required")
		.max(100, "Bank name must be less than 100 characters"),
	loanType: z
		.string()
		.min(1, "Loan type is required")
		.max(50, "Loan type must be less than 50 characters"),
	interestRate: z
		.number()
		.min(0, "Interest rate must be a positive number")
		.max(100, "Interest rate cannot exceed 100%"),
	minimumCreditScore: z
		.number()
		.int()
		.min(300, "Minimum credit score must be at least 300")
		.max(900, "Maximum credit score is 900"),
	minimumIncome: z
		.number()
		.min(0, "Minimum income must be a positive number"),
	maximumLoanAmount: z
		.number()
		.min(0, "Maximum loan amount must be a positive number"),
	minTenure: z
		.number()
		.int()
		.min(1, "Minimum tenure must be at least 1 month"),
	maxTenure: z
		.number()
		.int()
		.min(1, "Maximum tenure must be at least 1 month"),
	processingFee: z
		.number()
		.min(0, "Processing fee must be a positive number"),
	prepaymentCharges: z
		.number()
		.min(0, "Prepayment charges must be a positive number"),
	playStoreLink: z.string().url("Invalid Play Store link").optional(),
	websiteLink: z.string().url("Invalid website link").optional(),
	features: z.array(z.string()).optional(),
	EligibilityCriteria: z.array(z.string()).optional(),
});

module.exports = {
	loanProviderSchema,
};
