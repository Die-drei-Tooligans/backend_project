import express from "express";

import {
    getAdmin,
    reactivateAdmin,
    softDeleteAdmin,
    editAdmin
} from "../controller/adminController.js";

import {
    getAllUsers,
    deleteAllUsers,
    deleteUser,
} from "../controller/userController.js";

import { deleteCar } from "../controller/carController.js";

import {
    getAllOwnShops,
    createShop,
    softDeleteAllOwnShops,
    // deleteAllOwnShops,
    getSingleOwnShop,
    softDeleteOwnShop,
    editOwnShop
    // deleteSingleOwnShop,
} from "../controller/shopController.js";

import {
    createTask
    // softDeleteAllOwnTasks,
    // deleteAllOwnTasks,
    // softDeleteOwnTask,
    // editOwnTask,
    // deleteSingleOwnTask
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
    .delete(deleteAllUsers)

adminRouter
    .route("/manageusers/:id")
    .delete(deleteUser)

adminRouter
    .route("/managecars/:id")
    .delete(deleteCar)

adminRouter
    .route("/manageshops")
    .get(getAllOwnShops)
    .post(createShop)
    .patch(softDeleteAllOwnShops)
    // .delete(deleteAllOwnShops)
    
adminRouter
    .route("/manageshops/:id")
    .get(getSingleOwnShop)
    // .post(reactivateShop)
    .patch(softDeleteOwnShop)
    .put(editOwnShop)
    // .delete(deleteSingleOwnShop)    

adminRouter
    .route("/managetasks")
    .post(createTask)
    // .patch(softDeleteAllOwnTasks)
    // .delete(deleteAllOwnTasks)

adminRouter
    .route("/managetasks/:id")
    // .patch(softDeleteOwnTask)
    // .put(editOwnTask)
    // .delete(deleteSingleOwnTask)

export default adminRouter;
