const OfferLimit = require("../models/OfferLimit");
const {
	offerLimitSchema,
} = require("../validations/admin/offerLimit.validation");

async function handleCreateOfferLimit(req, res) {
	try {
		const result = offerLimitSchema.safeParse(req.body);

		if (!result.success) {
			const errors = {};
			result.error.errors.forEach((err) => {
				const field = err.path?.[0] || "unknown";
				errors[field] = err.message || "Invalid input";
			});
			return res.status(400).json({ success: false, errors });
		}

		const data = result.data;

		const updatedOfferLimit = await OfferLimit.findOneAndUpdate(
			{}, // Empty filter → always affects the first or only document
			{ $set: data },
			{ new: true, upsert: true }
		);

		return res.status(200).json({
			success: true,
			message: "Offer limit created/updated successfully",
			data: updatedOfferLimit,
		});
	} catch (error) {
		console.error("Offer Limit Create/Update Error:", error);
		return res.status(500).json({
			success: false,
			message: "Failed to create/update offer limit",
		});
	}
}

async function handleGetOfferLimit(req, res) {
	try {
		const offerLimit = await OfferLimit.findOne({});

		if (!offerLimit) {
			return res.status(404).json({
				success: false,
				message: "No offer limit found",
			});
		}

		return res.status(200).json({
			success: true,
			data: offerLimit,
		});
	} catch (error) {
		console.error("Error fetching offer limit:", error);
		return res.status(500).json({
			success: false,
			message: "Failed to retrieve offer limit",
		});
	}
}

async function handleUpdateOfferLimit(req, res) {
	try {
		const data = req.body;

		// Since there's only one document, find it
		let offerLimit = await OfferLimit.findOne();

		if (!offerLimit) {
			// If not found, create a new one
			offerLimit = new OfferLimit(data);
		} else {
			// Update existing document
			Object.assign(offerLimit, data);
		}

		const savedOfferLimit = await offerLimit.save();

		res.status(200).json({
			success: true,
			message: "Offer limit updated successfully",
			data: savedOfferLimit,
		});
	} catch (error) {
		console.error("Offer Limit Update Error:", error);
		res.status(500).json({
			success: false,
			message: "Failed to update offer limit",
		});
	}
}

module.exports = { handleCreateOfferLimit, handleGetOfferLimit, handleUpdateOfferLimit };
