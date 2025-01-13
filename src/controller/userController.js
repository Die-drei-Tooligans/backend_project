import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { User } from "../models/userModel.js";
import { createToken } from "../utils/auth/createToken.js";
import { compareWithHashedPassword } from "../utils/auth/compareWithHashedPassword.js";
import { sendEmail } from "../services/sendEmail.js";

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
		console.log(hashedPW);

		const newUser = await User.create({ ...req.body, password: hashedPW });
		console.log(newUser);

		sendEmail(username, mail);

		res.status(201).json({
			message: `Nice to meet you ${firstname}`,
			newUser,
		});
	} catch (error) {
		console.dir(error, { depth: null });
	}
};

export const login = async (req, res, next) => {
	try {
		const user = await User.findOne({ username: req.body.username });
		const hashed = await compareWithHashedPassword(
			req.body.password,
			user.password
		);
		console.log("login");
		if (!user || !hashed) {
			return res.json({ message: "Invalid credentials" });
		}

		const token = await createToken({ user: user.username }, SECRET_KEY, {
			expiresIn: "1h",
		});

		res.status(200)
			.cookie("token", token, {
				httpOnly: true,
			})
			.json({ message: "Logged in.", token });
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
// : AUTHORIZE AUTHORIZE AUTHORIZE AUTHORIZE AUTHORIZE
// : AUTHORIZE AUTHORIZE AUTHORIZE AUTHORIZE AUTHORIZE

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
