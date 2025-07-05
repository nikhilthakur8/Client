const CreditCardProvider = require("../models/CreditCardProvider");
const {
	creditCardProviderSchema,
} = require("../validations/admin/creditCardProvider.validation");

async function handleAddCreditCardProvider(req, res) {
	try {
		// Validate incoming data using Zod
		const result = creditCardProviderSchema.safeParse(req.body);

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

		const data = result.data;

		// Create new Credit Card Provider document
		const creditCardProvider = new CreditCardProvider(data);
		const savedProvider = await creditCardProvider.save();

		return res.status(201).json({
			success: true,
			message: "Credit Card Provider added successfully",
			data: savedProvider,
		});
	} catch (error) {
		console.error("Error adding credit card provider:", error);
		return res.status(500).json({
			success: false,
			message: "Failed to add credit card provider",
		});
	}
}

async function handleListCreditCardProviders(req, res) {
	try {
		const creditCards = await CreditCardProvider.find();

		return res.status(200).json({
			success: true,
			message: "Credit Card Providers fetched successfully",
			data: creditCards,
		});
	} catch (error) {
		console.error("Error fetching credit card providers:", error);
		return res.status(500).json({
			success: false,
			message: "Failed to fetch credit card providers",
		});
	}
}

async function handleUpdateCreditCardProvider(req, res) {
	try {
		const { id } = req.params;

		// Use partial schema for flexible validation
		const result = creditCardProviderSchema.partial().safeParse(req.body);

		if (!result.success) {
			const errorResponse = {};
			result.error.errors.forEach((err) => {
				const field = err.path?.[0] || "unknown";
				errorResponse[field] = err.message || "Invalid input";
			});

			return res.status(400).json({
				success: false,
				errors: errorResponse,
			});
		}

		const updates = result.data;

		const updatedCard = await CreditCardProvider.findByIdAndUpdate(
			id,
			updates,
			{
				new: true,
				runValidators: true,
			}
		);

		if (!updatedCard) {
			return res.status(404).json({
				success: false,
				message: "Credit Card Provider not found",
			});
		}

		return res.status(200).json({
			success: true,
			message: "Credit Card Provider updated successfully",
			data: updatedCard,
		});
	} catch (error) {
		console.error("Update Credit Card Provider Error:", error);
		return res.status(500).json({
			success: false,
			message: "Failed to update Credit Card Provider",
		});
	}
}

async function handleDeleteCreditCardProvider(req, res) {
	try {
		const { id } = req.params;

		const deletedCard = await CreditCardProvider.findByIdAndDelete(id);

		if (!deletedCard) {
			return res.status(404).json({
				success: false,
				message: "Credit Card Provider not found",
			});
		}

		return res.status(200).json({
			success: true,
			message: "Credit Card Provider deleted successfully",
		});
	} catch (error) {
		console.error("Delete Credit Card Provider Error:", error);
		return res.status(500).json({
			success: false,
			message: "Failed to delete Credit Card Provider",
		});
	}
}

async function handleGetCreditCardProvider(req, res) {
	try {
		const { id } = req.params;
		const creditCardProvider = await CreditCardProvider.findById(id);
		if (!creditCardProvider) {
			return res.status(404).json({
				success: false,
				message: "Credit card provider not found",
			});
		}
		res.status(200).json({ success: true, data: creditCardProvider });
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Server error",
			error: error.message,
		});
	}
}

module.exports = {
	handleAddCreditCardProvider,
	handleListCreditCardProviders,
	handleUpdateCreditCardProvider,
	handleDeleteCreditCardProvider,
	handleGetCreditCardProvider,
};
