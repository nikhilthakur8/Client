const mongoose = require("mongoose");

const kycSchema = new mongoose.Schema(
	{
		// Pre-verified inputs (from user)
		userProvidedData: {
			firstName: String,
			lastName: String,
			gender: {
				type: String,
				enum: ["F", "M", "T"],
			},
			dob: Date,
			pincode: String,
			state: String,
			fatherName: String,
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

const subscriptionSchema = new mongoose.Schema(
	{
		plan: String,
		startDate: Date,
		endDate: Date,
		paymentId: String,
		amount: Number,
		isActive: {
			type: Boolean,
			default: true,
		},
	},
	{
		_id: false,
	}
);

const cibilSchema = new mongoose.Schema(
	{
		cibilScore: {
			type: Number,
		},
		lastFetched: {
			type: Date,
			default: Date.now,
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
			unique: true,
		},
		isPhoneVerified: {
			type: Boolean,
			default: false,
		},

		// KYC details
		kyc: {
			type: kycSchema,
			default: null,
		},
		// Subscription details
		subscription: {
			type: subscriptionSchema,
			default: null,
		},
		cibil: {
			type: cibilSchema,
			default: null,
		},
		// referral system
		referralCode: {
			type: String,
			default: function () {
				return this._id.toString().slice(-6).toUpperCase();
			},
			unique: true,
		},
		referralBonus: {
			type: Number,
			default: 0,
		},

		// for employees
		employeeId: {
			type: String,
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
