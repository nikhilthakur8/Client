const LoanProvider = require("../models/LoanProvider");
const {
	loanProviderSchema,
} = require("../validations/admin/loanProvider.validation");

async function handleCreateLoanProvider(req, res) {
	try {
		const result = loanProviderSchema.safeParse(req.body);

		if (!result.success) {
			const errors = result.error.errors.reduce((acc, err) => {
				const field = err.path?.[0] || "unknown";
				acc[field] = err.message;
				return acc;
			}, {});
			return res.status(400).json({
				success: false,
				errors,
			});
		}

		const data = result.data;
		const loanProvider = await LoanProvider.create(data);
		return res.status(201).json({
			success: true,
			message: "Loan Provider created successfully",
			data: loanProvider,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
}

async function handleGetAllLoanProviders(req, res) {
	try {
		const loanProviders = await LoanProvider.find();

		return res.status(200).json({
			success: true,
			message: "Loan providers fetched successfully",
			data: loanProviders,
		});
	} catch (error) {
		console.error("Error fetching loan providers:", error);
		return res.status(500).json({
			success: false,
			message: "Failed to fetch loan providers",
		});
	}
}

async function handleUpdateLoanProvider(req, res) {
	try {
		const { id } = req.params;
		const result = loanProviderSchema.partial().safeParse(req.body);

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

		const updatedLoanProvider = await LoanProvider.findByIdAndUpdate(
			id,
			updates,
			{
				new: true,
				runValidators: true,
			}
		);

		if (!updatedLoanProvider) {
			return res.status(404).json({
				success: false,
				message: "Loan provider not found",
			});
		}

		return res.status(200).json({
			success: true,
			message: "Loan provider updated successfully",
			data: updatedLoanProvider,
		});
	} catch (error) {
		console.error("Update Loan Provider Error:", error);
		return res.status(500).json({
			success: false,
			message: "Failed to update loan provider",
		});
	}
}

async function handleDeleteLoanProvider(req, res) {
	try {
		const { id } = req.params;

		const deletedProvider = await LoanProvider.findByIdAndDelete(id);

		if (!deletedProvider) {
			return res.status(404).json({
				success: false,
				message: "Loan provider not found",
			});
		}

		return res.status(200).json({
			success: true,
			message: "Loan provider deleted successfully",
		});
	} catch (error) {
		console.error("Error deleting loan provider:", error);
		return res.status(500).json({
			success: false,
			message: "Failed to delete loan provider",
		});
	}
}

module.exports = {
	handleCreateLoanProvider,
	handleGetAllLoanProviders,
	handleUpdateLoanProvider,
	handleDeleteLoanProvider,
};
