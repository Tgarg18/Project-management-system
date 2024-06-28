import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { createProject, getAllMyProjects, getAllProjects, getProjectsCreatedByLoggedInUser, getProjectsCreatedByUser, getprojectById } from "../controllers/project.controller.js";

const router = express.Router();

router.route('/create-project').post(verifyJWT, upload.single('projectPhoto'), createProject)

router.route('/get-all-my-projects').get(verifyJWT, getAllMyProjects)

router.route('/get-all-projects').get(verifyJWT, getAllProjects)

router.route('/get-projects-created-by-loggedin-user').get(verifyJWT, getProjectsCreatedByLoggedInUser)

router.route('/get-projects-created-by-user/:userId').get(verifyJWT, getProjectsCreatedByUser)

router.route('/get-project-by-id/:projectId').get(verifyJWT, getprojectById)

export default router