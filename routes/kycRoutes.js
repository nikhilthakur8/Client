const { Router } = require("express");
const {
	handleKycStart,
	handleKycCallback,
} = require("../controllers/kycController");
const kycRouter = Router();
/**
 * @swagger
 * /api/kyc/start:
 *   post:
 *     summary: Start the KYC session for the logged-in user
 *     description: Validates KYC data, processes referral codes, stores KYC info, and initiates a KYC session with Cashfree.
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
 *                   properties:
 *                     reference_id:
 *                       type: integer
 *                       example: 3123123
 *                     verification_id:
 *                       type: string
 *                       example: "123456"
 *                     user:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           identifier_type:
 *                             type: string
 *                             example: "MOBILE"
 *                           identifier_value:
 *                             type: string
 *                             example: "9988123456"
 *                     expiry:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-12-31T23:59:59Z"
 *                     session_id:
 *                       type: string
 *                       example: "session_id_value"
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
 *     description: |
 *       Exchanges the provided `authCode` for an access token from Cashfree, then fetches the verified KYC details and updates the user's KYC information, including both user-provided and verified data.
 *     tags:
 *       - KYC
 *     parameters:
 *       - in: path
 *         name: authCode
 *         required: true
 *         description: Auth code received from Cashfree after KYC session
 *         schema:
 *           type: string
 *           example: "abc123xyz"
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: KYC data fetched successfully
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
 *                   example: KYC data fetched successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "60f6b3c4c456c4a3e8a2d7a9"
 *                     fullName:
 *                       type: string
 *                       example: "John Doe"
 *                     email:
 *                       type: string
 *                       example: "john@example.com"
 *                     phone:
 *                       type: string
 *                       example: "9876543210"
 *                     kyc:
 *                       type: object
 *                       properties:
 *                         userProvidedData:
 *                           type: object
 *                           properties:
 *                             fullName:
 *                               type: string
 *                               example: "John Doe"
 *                             phone:
 *                               type: string
 *                               example: "9876543210"
 *                             email:
 *                               type: string
 *                               example: "john@example.com"
 *                             employmentStatus:
 *                               type: string
 *                               enum: ["salaried", "non-salaried"]
 *                               example: "salaried"
 *                             monthlySalary:
 *                               type: number
 *                               example: 50000
 *                             companyName:
 *                               type: string
 *                               example: "Tech Pvt Ltd"
 *                             companyAddress:
 *                               type: string
 *                               example: "123 Tech Park, Mumbai"
 *                             companyPinCode:
 *                               type: string
 *                               example: "400001"
 *                             salaryMode:
 *                               type: string
 *                               enum: ["NEFT", "IMPS", "CASH"]
 *                               example: "NEFT"
 *                             aadharNumber:
 *                               type: string
 *                               example: "123412341234"
 *                             panNumber:
 *                               type: string
 *                               example: "ABCDE1234F"
 *                             address:
 *                               type: string
 *                               example: "123 Main Street, City"
 *                         cashfreeKycData:
 *                           type: object
 *                           properties:
 *                             verifiedName:
 *                               type: string
 *                               example: "John Doe"
 *                             verifiedEmail:
 *                               type: string
 *                               example: "john@example.com"
 *                             verifiedMobile:
 *                               type: string
 *                               example: "9876543210"
 *                             aadhaarMasked:
 *                               type: string
 *                               example: "XXXX-XXXX-1234"
 *                             aadhaarCareOf:
 *                               type: string
 *                               example: "S/O John Smith"
 *                             aadhaarDob:
 *                               type: string
 *                               example: "1990-01-01"
 *                             aadhaarGender:
 *                               type: string
 *                               example: "M"
 *                             aadhaarFullAddress:
 *                               type: string
 *                               example: "123 Main Street, City"
 *                             aadhaarPhotoLink:
 *                               type: string
 *                               example: "https://cdn.cashfree.com/photo.jpg"
 *                             aadhaarSplitAddress:
 *                               type: object
 *                               properties:
 *                                 country: { type: string, example: "India" }
 *                                 dist: { type: string, example: "Pune" }
 *                                 house: { type: string, example: "House 123" }
 *                                 landmark: { type: string, example: "Landmark" }
 *                                 pincode: { type: string, example: "411001" }
 *                                 po: { type: string, example: "PO Name" }
 *                                 state: { type: string, example: "Maharashtra" }
 *                                 street: { type: string, example: "MG Road" }
 *                                 subdist: { type: string, example: "SubDist" }
 *                                 vtc: { type: string, example: "VTC Name" }
 *                             panNumber:
 *                               type: string
 *                               example: "ABCDE1234F"
 *                             panName:
 *                               type: string
 *                               example: "John Doe"
 *                             panType:
 *                               type: string
 *                               example: "INDIVIDUAL"
 *                             aadhaarSeedingStatus:
 *                               type: string
 *                               example: "SEEDED"
 *                             aadhaarSeedingStatusDesc:
 *                               type: string
 *                               example: "Linked"
 *                             panLastUpdated:
 *                               type: string
 *                               example: "2023-05-12"
 *                             dob:
 *                               type: string
 *                               example: "1990-01-01"
 *                             gender:
 *                               type: string
 *                               example: "Male"
 *                             incomeCategory:
 *                               type: string
 *                               example: "Middle Income"
 *                             occupation:
 *                               type: string
 *                               example: "Salaried"
 *                             fullVerifiedAddress:
 *                               type: string
 *                               example: "123 Verified Street"
 *                             bankDetails:
 *                               type: object
 *                               properties:
 *                                 bankAccount: { type: string, example: "XXXXXX1234" }
 *                                 nameAtBank: { type: string, example: "John Doe" }
 *                                 bankName: { type: string, example: "HDFC Bank" }
 *                                 city: { type: string, example: "Mumbai" }
 *                                 branch: { type: string, example: "Andheri" }
 *                                 micr: { type: string, example: "400240001" }
 *                             referenceId:
 *                               type: string
 *                               example: "REF123456"
 *                             verificationId:
 *                               type: string
 *                               example: "VERIF123456"
 *       400:
 *         description: Missing or invalid auth code
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
 *                   example: Auth Code Missing
 *       500:
 *         description: Failed to fetch KYC data from Cashfree
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
 *                   example: Failed to fetch KYC data
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */

kycRouter.post("/callback/:authCode", handleKycCallback);

module.exports = kycRouter;
