import "dotenv/config";
import mongoose from "mongoose";
import express from "express";
import cors from "cors";

import registerRouter from "./src/routes/registerRouter.js";
import loginRouter from "./src/routes/loginRouter.js";
import userRouter from "./src/routes/userRouter.js";
import adminRouter from "./src/routes/adminRouter.js";
import taskRouter from "./src/routes/taskRouter.js";

import { hashPassword } from "./src/utils/auth/hashPassword.js";
import { authorize } from "./src/utils/auth/authController.js";
import { invalidPathHandler } from "./src/middleware/invalidPathHandler.js";
import { errorHandler } from "./src/middleware/errorHandler.js";

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const URL = process.env.MONGODB_URI;
const PORT = process.env.PORT;

app.use("/register", hashPassword, registerRouter);
app.use("/login", loginRouter);
app.use("/user", authorize("user", "admin"), userRouter);
app.use("/admin", authorize("admin"), adminRouter);
app.use("/tasks", taskRouter);

app.use("*", invalidPathHandler);
app.use(errorHandler);

mongoose
	.connect(URL)
	.then(() => {
		console.log(`Connected to MongoDB`);
		app.listen(PORT, () => {
			console.log(`Server running on port: ${PORT}`);
		});
	})
	.catch((error) => {

		console.log(error);

	});
