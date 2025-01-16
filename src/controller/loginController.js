import "dotenv/config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User, Admin } from "../models/userModel.js";

// import { createToken } from "../utils/auth/createToken.js";

const SECRET_KEY = process.env.SECRET_KEY;

export const loginUser = async (req, res, next) => {
	try {
		const user = await User.findOne({
			"person.username": req.body.person.username,
		});

		const hashed = await bcrypt.compare(
			req.body.person.password,
			user.person.password
		);

		if (!user || !hashed) {
			return res.json({ message: "Invalid credentials" });
		}

		const token = await jwt.sign(
			{ username: user.person.username, role: user.role },
			SECRET_KEY,
			{
				expiresIn: "1h",
			}
		);

		if (!token) {
			return res.status(400).json({ messgae: "No token created." });
		}

		res.status(200)
			.cookie("token", token, {
				httpOnly: true,
			})
			.json({ message: "Logged in.", token });
	} catch (error) {
		console.dir(error, { depth: null });
		res.status(402).json({ message: "Some error.", error });
	}
};

export const loginAdmin = async (req, res, next) => {
	try {
		const admin = await Admin.findOne({
			"person.username": req.body.person.username,
		});

		const hashed = await bcrypt.compare(
			req.body.person.password,
			admin.person.password
		);

		if (!admin || !hashed) {
			return res.json({ message: "Invalid credentials" });
		}

		const token = await jwt.sign(
			{ username: admin.person.username },
			SECRET_KEY,
			{
				expiresIn: "1h",
			}
		);

		console.log(token);
		res.status(200)
			.cookie("token", token, {
				httpOnly: true,
			})
			.json({ message: "Logged in.", token });
	} catch (error) {
		console.dir(error, { depth: null });
		res.status(402).json({ message: "Some error.", error });
	}
};
