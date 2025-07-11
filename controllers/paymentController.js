const { Cashfree, CFEnvironment } = require("cashfree-pg");
const User = require("../models/User");
const cashfree = new Cashfree(
	CFEnvironment.PRODUCTION,
	process.env.CASHFREE_CLIENT_ID,
	process.env.CASHFREE_CLIENT_SECRET
);

async function handleCreateOrder(req, res) {
	const { phone, _id } = req.user;
	const { order_amount } = req.body;
	if (!order_amount) {
		return res
			.status(400)
			.json({ success: false, error: "Order amount is required" });
	}
	const request = {
		order_amount: String(order_amount),
		order_currency: "INR",
		customer_details: {
			customer_id: _id,
			customer_phone: phone,
			customer_email: req.user.email || "example@email.com",
		},
		order_meta: {
			notify_url: `${process.env.BACKEND_URL}/api/payments/callback/callback`,
		},
	};
	try {
		const { data } = await cashfree.PGCreateOrder(request);
		return res.status(200).json({
			success: true,
			message: "Payment session created successfully",
			data: {
				orderId: data.order_id,
				paymentSessionId: data.payment_session_id,
			},
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Failed to create payment session",
			error: error?.response?.data?.message || error.message,
		});
	}
}

async function handleGetPaymentStatus(req, res) {
	const { orderId: paymentId } = req.body;
	if (!paymentId) {
		return res
			.status(400)
			.json({ success: false, error: "Payment ID is required" });
	}
	try {
		const response = await cashfree.PGFetchOrder(paymentId);
		return res.status(200).json({
			success: true,
			message: "Payment status retrieved successfully",
			data: response.data,
		});
	} catch (error) {
		console.error(
			"Error retrieving Cashfree payment status:",
			error?.response?.data || error.message
		);

		return res.status(500).json({
			success: false,
			message:
				error?.response?.data?.message ||
				error.message ||
				"Internal server error",
		});
	}
}

async function handlePaymentCallback(req, res) {
	try {
		// Optional: Verify Cashfree Signature (for production use)
		// const isValid = cashfree.PGVerifyWebhookSignature(
		//   req.headers["x-webhook-signature"],
		//   rawBody,
		//   req.headers["x-webhook-timestamp"]
		// );
		// if (!isValid) {
		//   return res.status(400).json({ success: false, message: "Invalid signature" });
		// }

		const orderId = req.body?.data?.order?.order_id || null;
		const customerId =
			req.body?.data?.customer_details?.customer_id || null; // Assuming this is user's ObjectId
		const amount = req.body?.data?.order?.order_amount || null;
		const subscription = {
			plan: "premium",
			startDate: new Date(),
			endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
			paymentId: orderId,
			amount: amount,
			isActive: true,
		};
		await User.findByIdAndUpdate(customerId, {
			$set: {
				subscription: subscription,
			},
		});
		return res.status(200).json({
			success: true,
			message: "Webhook processed successfully",
			orderId,
			customerId,
		});
	} catch (error) {
		console.error("Webhook Error:", error);
		return res
			.status(500)
			.json({ success: false, message: "Server error" });
	}
}

module.exports = {
	handleCreateOrder,
	handleGetPaymentStatus,
	handlePaymentCallback,
};
