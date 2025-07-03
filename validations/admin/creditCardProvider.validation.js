const z = require("zod");

const creditCardProviderSchema = z.object({
	cardName: z
		.string()
		.min(1, "Card name is required")
		.max(100, "Card name must be less than 100 characters"),
	bankName: z
		.string()
		.min(1, "Bank name is required")
		.max(100, "Bank name must be less than 100 characters"),
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
	maximumCreditLimit: z
		.number()
		.min(0, "Maximum credit limit must be a positive number"),
	annualFee: z.number().min(0, "Annual fee must be a positive number"),
	joiningFee: z.number().min(0, "Joining fee must be a positive number"),
	playStoreLink: z.string().url("Invalid Play Store link").optional(),
	websiteLink: z.string().url("Invalid website link").optional(),
	cardType: z
		.string()
		.min(1, "Card type is required")
		.max(50, "Card type must be less than 50 characters"),
	features: z.array(z.string()).optional(),
	eligibilityCriteria: z.array(z.string()).optional(),
});

module.exports = {
	creditCardProviderSchema,
};
