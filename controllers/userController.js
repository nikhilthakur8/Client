const User = require("../models/User");
const { subscriptionSchema } = require("../validations/user.validation");

async function handleGetProfile(req, res) {
	const userId = req.user._id;

	try {
		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({
				success: false,
				message: "User not found",
			});
		}
		return res.status(200).json({
			success: true,
			data: user,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Server error",
		});
	}
}

async function handleSubscription(req, res) {
	const userId = req.user._id;

	const result = subscriptionSchema.safeParse(req.body);

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

	const { plan, startDate, endDate } = result.data;

	try {
		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({
				success: false,
				message: "User not found",
			});
		}

		user.subscription = {
			plan,
			startDate,
			endDate,
		};

		await user.save();
		return res.status(200).json({
			success: true,
			message: "Subscription created successfully",
			data: {
				plan: user.subscription.plan,
				startDate: user.subscription.startDate,
				endDate: user.subscription.endDate,
			},
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Server error",
		});
	}
}
module.exports = {
	handleGetProfile,
	handleSubscription,
};
