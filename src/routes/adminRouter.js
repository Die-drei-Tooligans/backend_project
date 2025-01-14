import express from "express";

import {
    createAdmin,
    //getAdmin,
    loginAdmin
    //softDeleteAdmin,
    //editAdmin
} from "../controller/adminController.js";

import { authorize } from "../middleware/authorize.js";

const adminRouter = express.Router();

adminRouter.route("/")
    .post(createAdmin)

adminRouter.route("/:id")
    //.get(getAdmin)
    .post(loginAdmin)
    //.patch(softDeleteAdmin)
    //.put(editAdmin)

export default adminRouter;
