const mongoose = require("mongoose");

const creditScoreRangeSchema = new mongoose.Schema({
	minScore: { type: Number, required: true },
	maxScore: { type: Number, required: true },
	loanAmount: { type: Number, required: true },
},{
	_id: false,
});

const offerLimitSchema = new mongoose.Schema({
	name: String,
	creditScoreMappings: [creditScoreRangeSchema],
	createdAt: { type: Date, default: Date.now },
});

const OfferLimit = mongoose.model("OfferLimit", offerLimitSchema);
module.exports = OfferLimit;
