import express from "express";

import {
    getAdmin,
    reactivateAdmin,
    softDeleteAdmin,
    editAdmin
} from "../controller/adminController.js";

import {
    getAllUsers
} from "../controller/userController.js";

import {
    getAllOwnShops,
    createShop,
    softDeleteAllOwnShops,
    getSingleOwnShop,
    reactivateShop,
    softDeleteOwnShop,
    editOwnShop
} from "../controller/shopController.js";

import {
    createTask,
    reactivateTask,
    softDeleteAllOwnTasks,
    softDeleteSingleOwnTask,
    editOwnTask,
} from "../controller/taskController.js";


const adminRouter = express.Router();
//? http://localhost:3000/admin

adminRouter
    .route("/manageprofile/:id")
    .get(getAdmin)
    .post(reactivateAdmin)
    .patch(softDeleteAdmin)
    .put(editAdmin)

adminRouter
    .route("/manageusers")
    .get(getAllUsers)

adminRouter
    .route("/manageshops")
    .get(getAllOwnShops)
    .post(createShop)
    .patch(softDeleteAllOwnShops)
    
adminRouter
    .route("/manageshops/:id")
    .get(getSingleOwnShop)
    .post(reactivateShop)
    .patch(softDeleteOwnShop)
    .put(editOwnShop) 

adminRouter
    .route("/managetasks")
    .post(createTask)
    .patch(softDeleteAllOwnTasks)

adminRouter
    .route("/managetasks/:id")
    .post(reactivateTask)
    .patch(softDeleteSingleOwnTask)
    .put(editOwnTask)

export default adminRouter;
