const { sign, verify } = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

async function generateToken(payload) {
	return await sign(payload, JWT_SECRET, {
		expiresIn: "7d", // Token expires in 7 days
	});
}

async function verifyToken(token) {
	try {
		return await verify(token, JWT_SECRET);
	} catch (error) {
		return null;
	}
}

module.exports = { generateToken, verifyToken };
