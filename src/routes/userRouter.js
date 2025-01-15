import express from "express";

import {
	// getSingleUser,
	// softDeleteUser,
	// editSingleUser
} from "../controller/userController.js";

import {
	// getAllOwnCars,
	// createCar,
	// softDeleteAllOwnCars,
	// getSingleOwnCar,
	// softDeleteOwnCar,
	// editOwnCar
} from "../controller/carController.js";

const userRouter = express.Router();
//? http://localhost:3000/user

userRouter
	.route("/")
	// .get(getSingelUser)
	// .post()
	// .patch(softDeleteUser)
	// .put(editSingleUser)

userRouter
	.route("/cars")
	// .get(getAllOwnCars)
	// .post(createCar)
	// .patch(softDeleteAllOwnCars)
	// .put()

userRouter
	.route("/cars/:id")
	// .get(getSingleOwnCar)
	//.post()
	// .patch(softDeleteOwnCar)
	// .put(editOwnCar)

export default userRouter;
