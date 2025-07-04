const User = require("../models/User");
const { employeeSchema } = require("../validations/admin/employee.validation");

async function handleCreateEmployee(req, res) {
	const result = employeeSchema.safeParse(req.body);

	if (!result.success) {
		const errors = result.error.errors.reduce((acc, err) => {
			acc[err.path[0]] = err.message;
			return acc;
		}, {});
		return res.status(400).json({ success: false, errors });
	}

	const { fullName, email, phone, password, employeeId, address } =
		result.data;

	try {
		// Check if user with same phone or email or employeeId exists
		const existingUser = await User.findOne({
			$or: [{ email }, { phone }, { employeeId }],
		});

		if (existingUser) {
			return res.status(409).json({
				success: false,
				message:
					"Employee with provided email, phone, or employee ID already exists",
			});
		}

		const newEmployee = await User.create({
			fullName,
			email,
			phone,
			password,
			employeeId,
			employeeAddress: address,
			role: "employee",
			isPhoneVerified: true,
		});
		const { password, referralCode, ...safeEmployee } =
			newEmployee.toObject();

		res.status(201).json({
			success: true,
			message: "Employee created successfully",
			data: safeEmployee,
		});
	} catch (err) {
		console.error("Error creating employee:", err);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
}

async function handleListEmployees(req, res) {
	try {
		const employees = await User.find({ role: "employee" }).select(
			"-password -referralCode -referralBonus"
		);
		res.status(200).json({
			success: true,
			message: "Employees fetched successfully",
			data: employees,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Failed to fetch employees",
			error: error.message,
		});
	}
}

async function handleUpdateEmployee(req, res) {
	try {
		const { id } = req.params;
		const result = employeeSchema.safeParse(req.body);

		if (!result.success) {
			const errors = {};
			result.error.errors.forEach((err) => {
				errors[err.path[0]] = err.message;
			});
			return res.status(400).json({ success: false, errors });
		}

		const updatedEmployee = await User.findOneAndUpdate(
			{ _id: id, role: "employee" },
			{ $set: result.data },
			{ new: true }
		).select("-password -referralCode -referralBonus");

		if (!updatedEmployee) {
			return res.status(404).json({
				success: false,
				message: "Employee not found",
			});
		}

		res.status(200).json({
			success: true,
			message: "Employee updated successfully",
			data: updatedEmployee,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Failed to update employee",
			error: error.message,
		});
	}
}

async function handleDeleteEmployee(req, res) {
	try {
		const { id } = req.params;

		const deletedEmployee = await User.findOneAndDelete({
			_id: id,
			role: "employee",
		});

		if (!deletedEmployee) {
			return res.status(404).json({
				success: false,
				message: "Employee not found",
			});
		}

		res.status(200).json({
			success: true,
			message: "Employee deleted successfully",
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Failed to delete employee",
			error: error.message,
		});
	}
}

module.exports = {
	handleCreateEmployee,
	handleListEmployees,
	handleUpdateEmployee,
	handleDeleteEmployee,
};
