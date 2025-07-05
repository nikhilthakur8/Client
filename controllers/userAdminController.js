const User = require("../models/User");

async function handleListUsers(req, res) {
	try {
		const users = await User.find({
			role: "user",
		}).select("-password -__v");

		return res.status(200).json({
			success: true,
			message: "Users fetched successfully",
			data: users,
		});
	} catch (error) {
		console.error("Error fetching users:", error);
		return res.status(500).json({
			success: false,
			message: "Failed to fetch users",
		});
	}
}

async function handleGetUserById(req, res) {
	try {
		const userId = req.params.id;

		const user = await User.findById(userId);

		if (!user) {
			return res.status(404).json({
				success: false,
				message: "User not found",
			});
		}

		return res.status(200).json({
			success: true,
			message: "User fetched successfully",
			data: user,
		});
	} catch (error) {
		console.error("Error fetching user:", error);
		return res.status(500).json({
			success: false,
			message: "Failed to fetch user",
		});
	}
}

async function handleUpdateUser(req, res) {
	try {
		const userId = req.params.id;
		const updates = req.body;

		const updatedUser = await User.findByIdAndUpdate(userId, updates, {
			new: true,
		});

		if (!updatedUser) {
			return res.status(404).json({
				success: false,
				message: "User not found",
			});
		}

		return res.status(200).json({
			success: true,
			message: "User updated successfully",
			data: updatedUser,
		});
	} catch (error) {
		console.error("Error updating user:", error);
		return res.status(500).json({
			success: false,
			message: "Failed to update user",
		});
	}
}

async function handleDeleteUser(req, res) {
	try {
		const userId = req.params.id;

		const deletedUser = await User.findByIdAndDelete(userId);

		if (!deletedUser) {
			return res.status(404).json({
				success: false,
				message: "User not found",
			});
		}

		return res.status(200).json({
			success: true,
			message: "User deleted successfully",
		});
	} catch (error) {
		console.error("Error deleting user:", error);
		return res.status(500).json({
			success: false,
			message: "Failed to delete user",
		});
	}
}

module.exports = {
	handleListUsers,
	handleGetUserById,
	handleUpdateUser,
	handleDeleteUser,
};
