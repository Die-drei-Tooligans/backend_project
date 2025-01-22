import express from "express";
import { validationResult } from "express-validator";
import { userValidator } from "../middleware/validator/userValidator.js";
import { createUser, createAdmin } from "../controller/registerController.js";

const registerRouter = express.Router();

//? http://localhost:3000/register

registerRouter.route("/user").post(
	userValidator,
	(req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			console.log("!errors");
			return res.status(422).json({ errors: errors.array() });
		}
		next();
	},
	createUser
);

registerRouter.route("/admin").post(
	userValidator,
	(req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			console.log("!errors");
			return res.status(422).json({ errors: errors.array() });
		}
		next();
	},
	createAdmin
);

export default registerRouter;
