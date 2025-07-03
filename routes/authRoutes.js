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
 *     summary: Send OTP to user's phone number
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *                 example: "9876543210"
 *                 description: 10-digit mobile number of the user
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
 *                   example:
 *                     reference_id: "123456"
 *                     verification_id: "some-verification-id"
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 errors:
 *                   type: object
 *                   example:
 *                     phone: "Invalid phone number format. Must be exactly 10 digits."
 */

authRouter.post("/send-otp", handleSendOtp);



/**
 * @swagger
 * /api/auth/verify-otp:
 *   post:
 *     summary: Verify OTP and log in the user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *                 example: "9876543210"
 *                 description: 10-digit mobile number
 *               verification_id:
 *                 type: string
 *                 example: "some-verification-id"
 *                 description: Verification ID from send-otp
 *               otp:
 *                 type: string
 *                 example: "1234"
 *                 description: OTP received by user
 *     responses:
 *       200:
 *         description: OTP verified, token returned
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
 *                   example: "jwt.token.here"
 *       400:
 *         description: Validation error or wrong input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example:
 *                     - "Invalid phone number format"
 *       500:
 *         description: Server or Cashfree error
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
