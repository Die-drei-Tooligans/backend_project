import express from "express";
import {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  softDeleteTask,
  deleteTask,
} from "../controller/taskController.js";
const taskRouter = express.Router();

taskRouter
  .route("/tasks")
  .get(getAllTasks)
  .post(createTask);

taskRouter
  .route("/tasks/:id")
  .get(getTask)
  .patch(softDeleteTask)
  .put(updateTask)
  .delete(deleteTask);
