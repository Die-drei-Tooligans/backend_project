import {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  softDeleteTask,
  deleteTask,
} from "../controller/taskController.js";

const userRouter = express.Router();

userRouter.route("/tasks").get(getAllTasks).post(createTask);

userRouter
  .route("/tasks/:id")
  .get(getTask)
  .patch(updateTask)
  .delete(deleteTask);
