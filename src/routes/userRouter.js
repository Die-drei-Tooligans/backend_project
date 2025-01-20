import express from "express";

import {
	getSingleUser,
	softDeleteUser,
	editSingleUser,
} from "../controller/userController.js";

import
{
	getAllOwnCars,
	createCar,
	softDeleteAllOwnCars,
	getSingleOwnCar,
	reactivateCar,
	softDeleteOwnCar,
	editOwnCar
} from "../controller/carController.js";

import { userValidator } from "../middleware/validator/userValidator.js";

const userRouter = express.Router();
//? http://localhost:3000/user

userRouter
	.route("/")
	.get(getSingleUser)
	// .post()
	.patch(softDeleteUser)
	.put(editSingleUser);

userRouter
	.route("/cars")
	.get(getAllOwnCars)
	.post(
		userValidator,
		(req, res, next) => {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				console.log("!errors");
				return res.status(422).json({ errors: errors.array() });
			}
			console.log("after error");
			next();
		},
		createCar
	)
	.patch(softDeleteAllOwnCars)

userRouter
.route("/cars/:id")
.get(getSingleOwnCar)
.post(reactivateCar)
.patch(softDeleteOwnCar)
.put(editOwnCar)

export default userRouter;
