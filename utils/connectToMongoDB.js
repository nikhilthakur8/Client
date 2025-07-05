const mongoose = require("mongoose");

const connectToMongoDB = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_PRODUCTION_URI);
		console.log("Connected to MongoDB successfully");
	} catch (error) {
		console.error("Error connecting to MongoDB:", error);
		process.exit(1);
	}
};

module.exports = { connectToMongoDB };
