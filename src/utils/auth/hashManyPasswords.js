import mongoose from "mongoose";
import { users } from "./hashIt.js";
import bcrypt from "bcrypt";

export const hashManyPasswords = async (users) => {
	for (const user of users) {
		user.password = await bcrypt.hash(user.password, 10);
	}
};
