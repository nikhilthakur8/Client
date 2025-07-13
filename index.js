const express = require("express");
require("dotenv").config();
const { connectToMongoDB } = require("./utils/connectToMongoDB");
const userRoutes = require("./routes/userRoutes");
const kycRoutes = require("./routes/kycRoutes");
const authRoutes = require("./routes/authRoutes");
const { requireAuth, allowRoles } = require("./middleware/auth");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const adminRoutes = require("./routes/adminRoutes");
const staticRoutes = require("./routes/staticRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
connectToMongoDB();
const cors = require("cors");
app.use(
	cors({
		origin: "*",
		credentials: true,
	})
);

const swaggerOptions = {
	swaggerDefinition: {
		openapi: "3.0.0",
		info: {
			title: "Loan Application API",
			version: "1.0.0",
			description: "API documentation for Loan Application System",
		},
		servers: [
			{
				url: "https://api.ezepay.in",
				description: "Production Server",
			},
		],
	},
	apis: ["./routes/*.js"],
};
const swaggerDocs = swaggerJsdoc(swaggerOptions);
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/api", staticRoutes);
app.use("/api/admin", requireAuth, allowRoles("admin"), adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", requireAuth, userRoutes);
app.use("/api/kyc", requireAuth, kycRoutes);
app.use("/api/payments", paymentRoutes);

app.listen(process.env.PORT || 3000, () => {
	console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
