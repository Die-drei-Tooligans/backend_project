import express from "express";
import { verifyPassword } from "../utils/auth/verifyPassword.js";
import { createUser, login } from "../controller/regLogController.js";

const regLogRouter = express.Router();

regLogRouter.route("/loginnew", verifyPassword).get(login);

export default regLogRouter;
