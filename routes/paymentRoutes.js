const { Router } = require("express");
const {
	handleCreateOrder,
	handlePaymentCallback,
	handleGetPaymentStatus,
} = require("../controllers/paymentController");
const { requireAuth } = require("../middleware/auth");

const paymentRouter = Router();

/**
 * @swagger
 * /api/payments/cashfree/create-order:
 *   post:
 *     tags:
 *       - Payments
 *     summary: Create a Cashfree payment order
 *     description: Creates a new payment session using Cashfree. Requires user authentication.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - order_amount
 *             properties:
 *               order_amount:
 *                 type: number
 *                 example: 199
 *     responses:
 *       200:
 *         description: Payment session created successfully
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
 *                   example: Payment session created successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     orderId:
 *                       type: string
 *                       example: order_sand9tWz7V4
 *                     paymentSessionId:
 *                       type: string
 *                       example: session_XYZ123
 *       400:
 *         description: Missing order amount
 *       500:
 *         description: Failed to create payment session
 */
paymentRouter.post("/cashfree/create-order", requireAuth, handleCreateOrder);

/**
 * @swagger
 * /api/payments/cashfree/order-status:
 *   get:
 *     tags:
 *       - Payments
 *     summary: Get Cashfree payment status
 *     description: Retrieves the status of a Cashfree payment order.
 *     parameters:
 *       - name: orderId
 *         in: query
 *         required: true
 *         description: The Cashfree order ID
 *         schema:
 *           type: string
 *           example: order_sand9tWz7V4
 *     responses:
 *       200:
 *         description: Payment status retrieved successfully
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
 *                   example: Payment status retrieved successfully
 *                 data:
 *                   type: object
 *       500:
 *         description: Failed to retrieve payment status
 */
paymentRouter.get("/cashfree/order-status", handleGetPaymentStatus);

// No Swagger for callback as requested
paymentRouter.post("/cashfree/callback", handlePaymentCallback);

module.exports = paymentRouter;
