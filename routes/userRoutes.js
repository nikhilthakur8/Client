const { Router } = require("express");
const {
	handleGetProfile,
	handleSubscription,
	handleCibilCheck,
} = require("../controllers/userController");

const userRouter = Router();

userRouter.get("/profile", handleGetProfile);
userRouter.post("/subscribe", handleSubscription);
userRouter.get("/cibil-check", handleCibilCheck);

module.exports = userRouter;

/**
 * @swagger
 * /api/user/profile:
 *   get:
 *     summary: Get User Profile
 *     description: Retrieve the authenticated user's profile details.
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []   # <- This enables "Authorization: Bearer" in Swagger UI
 *     responses:
 *       200:
 *         description: Successfully retrieved user profile
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
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "60f6c2fc5b3e2b001f5e5b67"
 *                     fullName:
 *                       type: string
 *                       example: "John Doe"
 *                     email:
 *                       type: string
 *                       example: "john@example.com"
 *                     phone:
 *                       type: string
 *                       example: "1234567890"
 *                     subscription:
 *                       type: object
 *                       properties:
 *                         plan:
 *                           type: string
 *                           example: "premium"
 *                         startDate:
 *                           type: string
 *                           example: "2025-07-05T00:00:00.000Z"
 *                         endDate:
 *                           type: string
 *                           example: "2025-08-05T00:00:00.000Z"
 *                     role:
 *                       type: string
 *                       example: "user"
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/user/subscribe:
 *   post:
 *     summary: Create or Update Subscription
 *     description: Allows the authenticated user to create or update their subscription plan.
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []   # <- Requires Authorization: Bearer token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - plan
 *               - startDate
 *               - endDate
 *             properties:
 *               plan:
 *                 type: string
 *                 example: "premium"
 *               startDate:
 *                 type: string
 *                 example: "2025-07-05"
 *               endDate:
 *                 type: string
 *                 example: "2025-08-05"
 *     responses:
 *       200:
 *         description: Subscription created successfully
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
 *                   example: Subscription created successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     plan:
 *                       type: string
 *                       example: "premium"
 *                     startDate:
 *                       type: string
 *                       example: "2025-07-05T00:00:00.000Z"
 *                     endDate:
 *                       type: string
 *                       example: "2025-08-05T00:00:00.000Z"
 *       400:
 *         description: Validation error
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
 *                     plan: "Plan is required"
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/user/cibil-check:
 *   get:
 *     summary: Check CIBIL score
 *     description: Retrieve and update the authenticated user's CIBIL score after verifying KYC.  
 *       Returns the full user object in the `data` field.
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []   # JWT Bearer token required
 *     responses:
 *       200:
 *         description: Successfully retrieved CIBIL score
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
 *                   example: CIBIL score retrieved successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "66a9e84f42a1bc23d45f1234"
 *                     phone:
 *                       type: string
 *                       example: "9876543210"
 *                     cibilScore:
 *                       type: number
 *                       example: 780
 *                     kyc:
 *                       type: object
 *                       properties:
 *                         userProvidedData:
 *                           type: object
 *                           properties:
 *                             firstName:
 *                               type: string
 *                               example: "John"
 *                             lastName:
 *                               type: string
 *                               example: "Doe"
 *                             gender:
 *                               type: string
 *                               example: "M"
 *                             dob:
 *                               type: string
 *                               example: "1995-08-15"
 *                             phone:
 *                               type: string
 *                               example: "9876543210"
 *                             panNumber:
 *                               type: string
 *                               example: "ABCDE1234F"
 *                             pincode:
 *                               type: string
 *                               example: "110001"
 *                             state:
 *                               type: string
 *                               example: "Delhi"
 *                             address:
 *                               type: string
 *                               example: "123 Example Street"
 *                             fatherName:
 *                               type: string
 *                               example: "Michael Doe"
 *                     role:
 *                       type: string
 *                       example: "user"
 *                     createdAt:
 *                       type: string
 *                       example: "2025-07-01T10:20:30.000Z"
 *                     updatedAt:
 *                       type: string
 *                       example: "2025-07-10T15:45:00.000Z"
 *       400:
 *         description: KYC not completed or CIBIL score not found
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
 *                   example: KYC not completed
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       500:
 *         description: Server error
 */
