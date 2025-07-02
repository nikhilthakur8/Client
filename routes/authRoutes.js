const { Router } = require("express");
const {
	handleVerifyOtp,
	handleSendOtp,
} = require("../controllers/authController");

const authRouter = Router();

authRouter.post("/send-otp", handleSendOtp);
authRouter.post("/verify-otp", handleVerifyOtp);

module.exports = authRouter;
