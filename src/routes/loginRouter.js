import express from "express";

import { loginUser, loginAdmin } from "../controller/loginController.js";

const loginRouter = express.Router();

//? http://localhost:3000/login

loginRouter
    .route("/user")
    .post(loginUser);



loginRouter
    .route("/admin")
    .post(loginAdmin);

export default loginRouter;
