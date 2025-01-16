import bcrypt from "bcrypt";

import { User } from "../models/userModel.js";
import { Admin } from "../models/userModel.js";
import { sendEmail } from "../services/sendEmail.js";

export const createUser = async (req, res, next) => {
	try {
		const { firstname, username, mail, password } = req.body.person;

		if (await User.findOne({ "person.username": username })) {
			return res.status(403).json({
				message: "Username already exists. Please choose another one.",
			});
		}

		const newUser = await User.create(req.body);

		sendEmail(username, mail);

		res.status(201).json({
			message: `Nice to meet you ${firstname}`,
			newUser,
		});
	} catch (error) {
		console.dir(error, { depth: null });
	}
};

export const createAdmin = async (req, res, next) => {

	try {
		const { firstname, username, mail, password } = req.body.person;

		if (await Admin.findOne({ "person.username": username })) {
			return res.status(403).json({
				message: "Username already exists. Please choose another one.",
			});
		}

		const newAdmin = await Admin.create(req.body);

		sendEmail(username, mail);

		res.status(201).json({
			message: `Nice to meet you ${firstname}`,
			newAdmin,
		});
	} catch (error) {
		console.dir(error, { depth: null });
	}
};

