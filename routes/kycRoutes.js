const { Router } = require("express");
const { handleKycStart, handleKycCallback } = require("../controllers/kycController");
const kycRouter = Router();
/**
 * @swagger
 * /api/kyc/start:
 *   post:
 *     summary: Start the KYC session for the logged-in user
 *     tags:
 *       - KYC
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - kycData
 *             properties:
 *               kycData:
 *                 type: object
 *                 required:
 *                   - fullName
 *                   - phone
 *                   - email
 *                   - employmentStatus
 *                   - aadharNumber
 *                   - panNumber
 *                   - address
 *                 properties:
 *                   fullName:
 *                     type: string
 *                     example: "John Doe"
 *                   phone:
 *                     type: string
 *                     example: "9876543210"
 *                   email:
 *                     type: string
 *                     example: "john@example.com"
 *                   employmentStatus:
 *                     type: string
 *                     enum: ["salaried", "non-salaried"]
 *                     example: "salaried"
 *                   monthlySalary:
 *                     type: number
 *                     example: 50000
 *                   companyName:
 *                     type: string
 *                     example: "Tech Pvt Ltd"
 *                   companyAddress:
 *                     type: string
 *                     example: "123 Tech Park, Mumbai"
 *                   companyPinCode:
 *                     type: string
 *                     example: "400001"
 *                   salaryMode:
 *                     type: string
 *                     enum: ["NEFT", "IMPS", "CASH"]
 *                     example: "NEFT"
 *                   aadharNumber:
 *                     type: string
 *                     example: "123412341234"
 *                   panNumber:
 *                     type: string
 *                     example: "ABCDE1234F"
 *                   address:
 *                     type: string
 *                     example: "123 Main Street, City"
 *               referralCode:
 *                 type: string
 *                 example: "ABC123"
 *     responses:
 *       200:
 *         description: KYC session started successfully
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
 *                   example: KYC session started successfully
 *                 data:
 *                   type: object
 *       400:
 *         description: Invalid input data
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
 *       500:
 *         description: Failed to start KYC session
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
 *                   example: Failed to start KYC session
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */

kycRouter.post("/start", handleKycStart);
/**
 * @swagger
 * /api/kyc/callback/{authCode}:
 *   post:
 *     summary: Handle KYC callback and fetch verified KYC details from Cashfree
 *     tags:
 *       - KYC
 *     parameters:
 *       - in: path
 *         name: authCode
 *         required: true
 *         description: Auth code received from Cashfree
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: KYC data fetched successfully
 *       400:
 *         description: Auth code missing or invalid
 *       500:
 *         description: Failed to fetch KYC data
 */

kycRouter.post("/callback/:authCode", handleKycCallback);

module.exports = kycRouter;
