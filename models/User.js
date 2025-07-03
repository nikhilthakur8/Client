const mongoose = require("mongoose");

const kycSchema = new mongoose.Schema(
	{
		// Pre-verified inputs (from user)
		userProvidedData: {
			fullName: String,
			phone: String,
			email: String,
			employmentStatus: {
				type: String,
				enum: ["salaried", "non-salaried"],
			},
			monthlySalary: Number,
			companyName: String,
			companyAddress: String,
			companyPinCode: String,
			salaryMode: {
				type: String,
				enum: ["NEFT", "IMPS", "CASH"],
			},
			aadharNumber: String,
			panNumber: String,
			address: String,
		},

		// Verified data from Cashfree
		cashfreeKycData: {
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
		},
	},
	{
		_id: false,
	}
);

const UserSchema = new mongoose.Schema(
	{
		fullName: {
			type: String,
			trim: true,
		},
		email: {
			type: String,
			lowercase: true,
			unique: true,
		},
		password: {
			type: String,
			trim: true,
		},
		email: {
			type: String,
			lowercase: true,
			unique: true,
		},
		password: {
			type: String,
		},
		role: {
			type: String,
			enum: ["user", "admin", "employee"],
			default: "user",
		},
		phone: {
			type: String,
			required: true,
			unique: true,
		},
		isPhoneVerified: {
			type: Boolean,
			default: false,
		},

		// subscription details
		subscription: {
			plan: {
				type: String,
				enum: ["premium"],
			},
			startDate: Date,
			endDate: Date,
			paymentId: String,
		},

		// KYC details
		kyc: {
			type: kycSchema,
			default: {},
		},

		// referral system
		referralCode: {
			type: String,
			default: function () {
				return this._id.toString().slice(-6).toUpperCase();
			},
		},
		referralBonus: {
			type: Number,
			default: 0,
		},

		// for employees
		employeeId: {
			type: String,
			unique: true,
		},
		employeeAddress: {
			type: String,
			trim: true,
		},

		isActive: {
			type: Boolean,
			default: true,
		},
	},
	{
		timestamps: true,
	}
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
