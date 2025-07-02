const express = require("express");
require("dotenv").config();
const { connectToMongoDB } = require("./utils/connectToMongoDB");
const userRoutes = require("./routes/userRoutes");
const kycRoutes = require("./routes/kycRoutes");
const authRoutes = require("./routes/authRoutes");
const { requireAuth } = require("./middleware/auth");

connectToMongoDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/kyc", requireAuth, kycRoutes);

app.listen(process.env.PORT || 3000, () => {
	console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
