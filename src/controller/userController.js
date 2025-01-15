import bcrypt from "bcrypt";

import { User } from "../models/userModel.js";



export const getSingelUser = async (req, res, next) => {
	try {
		const { mail } = req.body.person;
		const user = await User.person.findOne({ mail });
		if (!user) {
			return res.status(400).json({ message: "Wrong mail adress" });
		}
		res.status(200).json({ message: user });
	} catch (error) {
		next(error);
	}
};


export const editSingleUser = async (req, res, next) => {
	try {
		const user = await User.findOne({ username: req.body.username });
		const samePassword = await bcrypt.compare(
			req.body.password,
			user.password
		);
		console.log("editSingleUser");
		const { password, ...rest } = req.body;

		if (samePassword) {
			const updatedUser = await User.updateOne({ _id: user._id }, rest);
			return res.json({ message: "Done", updatedUser });
		}
	} catch (error) {
		res.status(400).json({ message: "Could not edit User" });
	}
};

export const editPassword = async (req, res, next) => {
	try {
		const user = await User.findOne({ username: req.body.username });

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		const isSamePassword = await bcrypt.compare(
			req.body.password,
			user.password
		);

		if (isSamePassword) {
			return res.status(400).json({
				message:
					"New password cannot be the same as the current password.",
			});
		}

		const hashedPassword = await bcrypt.hash(req.body.password, 10);
		await User.updateOne({ _id: user._id }, { password: hashedPassword });

		return res
			.status(200)
			.json({ message: "Password updated successfully." });
	} catch (error) {
		next(error);
	}
};

export const setUserRoles = async (req, res, next) => {
	try {
	} catch (error) {}
};




// ADMIN ADMIN ADMIN --> :3000/admin/manageusers
export const getAllUsers = async (req, res, next) => {
	try {
		res.json(await User.find());
	} catch (error) {
		next(error);
	}
};

export const deleteAllUsers = async (req, res, next) => {
	try {
		await User.deleteMany();

		res.status(201).json({ message: `Deleted all users.` });
	} catch (error) {
		next(error);
	}
};

// ADMIN ADMIN ADMIN --> :3000/admin/manageusers/:id
export const deleteUser = async (req, res, next) => {
	try {
		await User.deleteOne({ username: req.body.username });
		res.status(202).json({ message: `${req.body.username} deleted` });
	} catch (error) {
		console.dir(error, { depth: null });
		throw new Error(error);
	}
};