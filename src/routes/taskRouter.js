import express from "express";
import {
  // getAllTasks,
  // getTask
} from "../controller/taskController.js";


const taskRouter = express.Router();
//? http://localhost/3000/tasks

taskRouter
  .route("/")
  // .get(getAllTasks)

taskRouter
  .route("/:id")
  // .get(getTask)
