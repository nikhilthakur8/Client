const mongoose = require("mongoose");
const LoanTypeSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	referTo: {
		type: String,
		enum: ["loan_provider", "credit_card_provider"],
	},
});

const LoanType = mongoose.model("LoanType", LoanTypeSchema);
module.exports = LoanType;
