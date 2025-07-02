const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
	{
		fullName: {
			type: String,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			lowercase: true,
		},
		password: {
			type: String,
		},
		role: {
			type: String,
			enum: ["user", "admin", "agent"],
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
	},
	{
		timestamps: true,
	}
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
