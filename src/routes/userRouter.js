import express from "express";
import { verifyToken } from "../utils/auth/verifyToken.js";
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

const userRouter = express.Router();

userRouter.route("/login").get(login);

userRouter.route("/").get(getAllUsers).post(createUser).delete(deleteAllUsers);

userRouter
	.route("/user", verifyToken)
	.delete(deleteSingleUser)
	.patch(editSingleUser)
	.get(getSingelUser);

userRouter.route("/password", verifyToken).patch(editPassword);

export default userRouter;
