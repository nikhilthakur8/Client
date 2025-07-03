const mongoose = require("mongoose");

const loanProviderSchema = new mongoose.Schema({
	loanName: {
		type: String,
		required: true,
		unique: true,
	},
	bankName: {
		type: String,
		required: true,
	},
	loanType: {
		type: String,
		required: true,
	},
	interestRate: {
		type: Number,
		required: true,
	},
	minimumCreditScore: {
		type: Number,
		required: true,
	},
	// in rupees
	minimumIncome: {
		type: Number,
		required: true,
	},
	maximumLoanAmount: {
		type: Number,
		required: true,
	},
	minTenure: {
		type: Number,
		required: true,
	},
	maxTenure: {
		type: Number,
		required: true,
	},
	processingFee: {
		type: Number,
		required: true,
	},
	prepaymentCharges: {
		type: Number,
		required: true,
	},
	playStoreLink: String,
	websiteLink: String,
	features: [String],
	EligibilityCriteria: [String],
});

const LoanProvider = mongoose.model("LoanProvider", loanProviderSchema);

module.exports = LoanProvider;
