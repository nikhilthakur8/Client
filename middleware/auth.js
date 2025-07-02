const { verify } = require("jsonwebtoken");

async function requireAuth(req, res, next) {
	const authHeader = req.headers?.authorization;
	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		return res.status(401).json({ error: "Unauthorized: Token missing" });
	}
	const token = authHeader.split(" ")[1];
	const userData = await verify(token, process.env.JWT_SECRET);
	if (!userData) {
		return res.status(401).json({ error: "Invalid or expired token" });
	}
	req.user = userData;
	next();
}

async function allowRoles(...roles) {
	return (req, res, next) => {
		if (!roles.includes(req.user.role)) {
			return res.status(403).json({ error: "Forbidden: Access denied" });
		}
		next();
	};
}

module.exports = {
	requireAuth,
	allowRoles,
};
