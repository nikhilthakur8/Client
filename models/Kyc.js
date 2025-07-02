const mongoose = require("mongoose");
const User = require("./User");

const kycSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},

		// Pre-verified inputs (from user)
		isSalaried: Boolean,
		monthlyIncome: Number,
		loanAmount: Number,
		aadhaarNumber: String,
		panNumber: String,
		address: String,
		pinCode: String,
		companyName: String,
		companyAddress: String,
		companyPin: String,

		// Verified data from Cashfree
		verifiedName: String,
		verifiedEmail: String,
		verifiedMobile: String,
		aadhaarMasked: String,
		aadhaarCareOf: String,
		aadhaarDob: String,
		aadhaarGender: String,
		aadhaarFullAddress: String,
		aadhaarPhotoLink: String,
		aadhaarSplitAddress: {
			country: String,
			dist: String,
			house: String,
			landmark: String,
			pincode: String,
			po: String,
			state: String,
			street: String,
			subdist: String,
			vtc: String,
		},

		panNumber: String,
		panName: String,
		panType: String,
		aadhaarSeedingStatus: String,
		aadhaarSeedingStatusDesc: String,
		panLastUpdated: String,

		dob: String,
		gender: String,
		incomeCategory: String,
		occupation: String,

		fullVerifiedAddress: String,

		bankDetails: {
			bankAccount: String,
			nameAtBank: String,
			bankName: String,
			city: String,
			branch: String,
			micr: String,
		},

		referenceId: String,
		verificationId: String,

		kycStatus: {
			type: String,
			enum: ["pending", "verified", "rejected"],
			default: "pending",
		},
	},
	{
		timestamps: true,
	}
);

const Kyc = mongoose.model("Kyc", kycSchema);

module.exports = Kyc;
