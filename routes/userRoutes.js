const { Router } = require("express");
const {
	handleGetProfile,
	handleSubscription,
} = require("../controllers/userController");

const userRouter = Router();


userRouter.get("/profile", handleGetProfile);
userRouter.post("/subscribe", handleSubscription);

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
