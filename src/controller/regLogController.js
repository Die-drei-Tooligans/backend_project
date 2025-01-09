import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";
import { verifyPassword } from "../utils/auth/verifyPassword.js";

const SECRET_KEY = process.env.SECRET_KEY;

export const login = async (req, res, next) => {
	try {
		const user = await User.findOne({ username: req.body.username });
		console.log("login true", user);
		res.json({ message: user });
	} catch (error) {
		console.dir(error, { depth: null });
		res.status(402).json({ message: "Some error." });
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
