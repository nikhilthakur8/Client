const { z } = require("zod");
const subscriptionSchema = z.object({
	plan: z.string().min(1, "Plan is required"),

	startDate: z
		.string()
		.refine((val) => !isNaN(new Date(val).getTime()), {
			message: "Invalid startDate format",
			path: ["startDate"],
		}),

	endDate: z
		.string()
		.refine((val) => !isNaN(new Date(val).getTime()), {
			message: "Invalid endDate format",
			path: ["endDate"],
		}),
});

module.exports = { subscriptionSchema };
