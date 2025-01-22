import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { User } from "./src/models/userModel.js";
import { Company } from "./src/models/companyModel.js";
import { Task } from "./src/models/taskModel.js";

import { users, companies, tasks } from "./forFinalSeed.js";
import { hashManyPasswords } from "./src/utils/auth/hashManyPasswords.js";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017";

mongoose
	.connect(MONGODB_URI)
	.then(async () => {
		console.log(`Connected to MongoDB.`);

		await User.deleteMany();
		await Company.deleteMany();
		await Task.deleteMany();

		console.log(`All collections deleted.`);

		await hashManyPasswords(users);
		console.log(`User passwords hashed.`);

		await User.insertMany(users);
		await Company.insertMany(companies);
		await Task.insertMany(tasks);

		//! Der Fehler der doppelten Keys lag darin dass ich versucht habe companies, tasks und cars alle in "User"-Collection zu pushen, anstatt in die passenden Collections
		//: await User.insertMany(companies);
		//: await User.insertMany(tasks);
		//: await User.insertMany(cars);

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
