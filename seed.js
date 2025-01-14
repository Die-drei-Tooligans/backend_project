import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { User, Admin } from "./src/models/userModel.js";
import { Task } from "./src/models/taskModel.js";
import { users, admins, tasks } from "./forSeeding.js";
import { hashManyPasswords } from "./src/utils/auth/hashManyPasswords.js";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017";

mongoose
	.connect(MONGODB_URI)
	.then(async () => {
		console.log(`Connected to MongoDB.`);

		await User.deleteMany();
		console.log(`All users deleted.`);

		await hashManyPasswords(users);
		console.log(`Passwords hashed.`);

		await User.insertMany(users);
		await Admin.insertMany(admins);
		await Task.insertMany(tasks);
		console.log(`Users seeded successfully`);

		mongoose.disconnect();
		console.log(`Disconnected from MongoDB.`);
	})
	.catch((error) => {
		console.error("Testdaten nicht erfolgreich hinzugefügt.");
		console.error(error);
		mongoose.disconnect();
	})
	.catch((error) => {
		console.error(`Connection with mongoDB: FAILED:`, error);
	});
