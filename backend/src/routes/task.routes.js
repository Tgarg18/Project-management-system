import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createTask } from "../controllers/task.controller.js";

const router = express.Router();

router.route("/create-task").post(verifyJWT,createTask)

export default router