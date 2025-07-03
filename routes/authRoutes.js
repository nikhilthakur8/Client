const { Router } = require("express");
const {
	handleVerifyOtp,
	handleSendOtp,
} = require("../controllers/authController");

const authRouter = Router();

/**
 * @swagger
 * /api/auth/send-otp:
 *   post:
 *     summary: Send OTP to a user's phone number
 *     description: Sends an OTP using Cashfree's Mobile360 API for phone number verification.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - phone
 *             properties:
 *               phone:
 *                 type: string
 *                 description: 10-digit mobile number (Indian format, digits only)
 *                 example: "9876543210"
 *     responses:
 *       200:
 *         description: OTP sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   description: Response from Cashfree
 *                   example:
 *                     status: "SUCCESS"
 *                     message: "OTP Sent"
 *                     verification_id: "abc123xyz"
 *       400:
 *         description: Invalid phone number format
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Invalid phone number format. Must be exactly 10 digits."
 *       500:
 *         description: OTP sending failed due to server or third-party error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "OTP send failed"
 */
authRouter.post("/send-otp", handleSendOtp);


/**
 * @swagger
 * /api/auth/verify-otp:
 *   post:
 *     summary: Verify OTP for phone number
 *     description: Verifies the OTP received on the user's phone using Cashfree's Mobile360 API. On successful verification, marks the phone number as verified and returns a JWT token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - phone
 *               - verification_id
 *               - otp
 *             properties:
 *               phone:
 *                 type: string
 *                 description: 10-digit mobile number
 *                 example: "9876543210"
 *               verification_id:
 *                 type: string
 *                 description: Verification ID received during OTP send
 *                 example: "abc123xyz"
 *               otp:
 *                 type: string
 *                 description: The OTP received by the user
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: OTP verified successfully, user authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Phone verified successfully"
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: Missing or invalid input fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Phone number, verification ID, and OTP are required."
 *       500:
 *         description: OTP verification failed or server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "OTP verification failed"
 */

authRouter.post("/verify-otp", handleVerifyOtp);

module.exports = authRouter;
