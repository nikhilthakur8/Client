const mongooose = require("mongoose");

const creditCardProviderSchema = new mongooose.Schema({
	cardName: {
		type: String,
		required: true,
		unique: true,
	},
	bankName: {
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
	maximumCreditLimit: {
		type: Number,
		required: true,
	},
	annualFee: {
		type: Number,
		required: true,
	},
	joiningFee: {
		type: Number,
		required: true,
	},
	playStoreLink: String,
	websiteLink: String,
	cardType: {
		type: String,
		required: true,
	},
	features: [String],
	eligibilityCriteria: [String],
});

const CreditCardProvider = mongooose.model(
	"CreditCardProvider",
	creditCardProviderSchema
);

module.exports = CreditCardProvider;
