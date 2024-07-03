import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { completeTask, createTask, getAllCompletedTasksinProject, getMyTasks, incompleteTask } from "../controllers/task.controller.js";

const router = express.Router();

router.route("/create-task").post(verifyJWT, createTask)

router.route("/mark-as-completed").post(verifyJWT, completeTask)

router.route('/mark-as-incomplete').post(verifyJWT, incompleteTask)

router.route("/get-my-tasks/:projectId").get(verifyJWT, getMyTasks)

router.route("/getAllCompletedTasksInProject/:projectId").get(verifyJWT, getAllCompletedTasksinProject)

export default router