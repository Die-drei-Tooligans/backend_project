import mongoose from "mongoose";
import { users } from "../../../forSeeding.js";
import bcrypt from "bcrypt";

export const hashManyPasswords = async (users) => {
	for (const user of users) {
		user.person.password = await bcrypt.hash(user.person.password, 10);
	}
};
