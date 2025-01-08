import "dotenv/config";
import mongoose from "mongoose";
import express from "express";
import userRouter from "./src/routes/userRouter.js";
import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const URL = process.env.MONGODB_URI;
const PORT = process.env.PORT;

app.use("/", userRouter);
app.use("/user", userRouter);
mongoose
	.connect(URL)
	.then(() => {
		console.log(`Connected to MongoDB`);
		app.listen(PORT, () => {
			console.log(`Server running on port: ${PORT}`);
		});
	})
	.catch((error) => {
		process.exit(1);
		throw new Error(error);
	});
