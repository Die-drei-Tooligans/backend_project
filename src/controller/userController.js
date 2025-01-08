import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

const SECRET_KEY = process.env.SECRET_KEY;

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

export const getSingelUser = async (req, res, next) => {
	try {
		const { mail } = req.body;
		const user = await User.findOne({ mail });
		if (user) {
			res.status(200).json({ message: user });
		}
	} catch (error) {
		next(error);
	}
};

export const createUser = async (req, res, next) => {
	try {
		const { firstname, username, mail, password } = req.body;

		if (await User.findOne({ username })) {
			return res.status(403).json({
				message: "Username already exists. Please choose another one.",
			});
		}

		const hashedPW = await bcrypt.hash(password, 10);
		const newUser = await User.create({ ...req.body, password: hashedPW });
		const token = jwt.sign({ username }, process.env.SECRET_KEY, {
			expiresIn: "1h",
		});

		res.status(201).json({
			message: `Nice to meet you ${firstname}`,
			newUser,
			token,
		});
	} catch (error) {
		console.dir(error, { depth: null });
	}
};

export const login = async (req, res, next) => {
	try {
		const user = await User.findOne({ username: req.body.username });
		const hashed = await bcrypt.compare(req.body.password, user.password);

		if (!user || !hashed) {
			return res.json({ message: "Invalid credentials" });
		}

		const token = jwt.sign({ username: user.username }, SECRET_KEY, {
			expiresIn: "1h",
		});
		res.cookie("token", token, {
			httpOnly: true,
		}).json({ message: "Logged in.", token });
	} catch (error) {
		console.dir(error, { depth: null });
		res.status(402).json({ message: "Some error." });
	}
};

export const deleteSingleUser = async (req, res, next) => {
	try {
		await User.deleteOne({ username: req.body.username });
		res.status(202).json({ message: `${req.body.username} deleted` });
	} catch (error) {
		console.dir(error, { depth: null });
		throw new Error(error);
	}
};

export const editSingleUser = async (req, res, next) => {
	try {
		const user = await User.findOne({ username: req.body.username });
		console.log("here");
		const samePassword = await bcrypt.compare(
			req.body.password,
			user.password
		);

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

export const taskData = [
	{
		_id: "task1",
		name: "Task 1",
		topic: "Topic 1",
		image: "task1",
		about: "Task 1 is a task that is very important",
		timeRequired: 30,
		isFree: false,
		isDoneBefore: false,
		doneLast: "2021-10-10",
		costs: 100,
		neededMaterials: [
			{
				name: "Material 1",
				image: "material1",
				quantity: 1,
			},
			{
				name: "Material 2",
				image: "material2",
				quantity: 2,
			},
		],
	},
];
