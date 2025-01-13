import express from "express";
import { verifyToken } from "../utils/auth/verifyToken.js";
import { createToken } from "../utils/auth/createToken.js";

import {
	getAllUsers,
	deleteAllUsers,
	createUser,
	login,
	editSingleUser,
	editPassword,
	deleteSingleUser,
	getSingelUser,
} from "../controller/userController.js";

import { authorize } from "../middleware/authorize.js";
import { createHashedPassword } from "../utils/auth/hashPassword.js";

const userRouter = express.Router();

userRouter.route("/login").get(login);

userRouter
	.route("/")
	.get(getAllUsers)
	.post(createHashedPassword, createUser)
	.delete(deleteAllUsers);

userRouter
	.route("/user")
	.delete(authorize, deleteSingleUser)
	.patch(authorize, editSingleUser)
	.get(getSingelUser);

userRouter.route("/password").patch(editPassword);

export default userRouter;
