const z = require("zod");

const offerLimitSchema = z.object({
	name: z
		.string()
		.min(1, "Offer limit name is required")
		.max(100, "Name must be less than 100 characters"),
	creditScoreMappings: z.array(
		z.object({
			minScore: z
				.number()
				.int()
				.min(0, "Minimum score must be at least 0")
				.max(900, "Maximum score is 900"),
			maxScore: z
				.number()
				.int()
				.min(0, "Minimum score must be at least 0")
				.max(900, "Maximum score is 900"),
			loanAmount: z
				.number()
				.positive("Loan amount must be a positive number"),
		})
	),
});

module.exports = { offerLimitSchema };
