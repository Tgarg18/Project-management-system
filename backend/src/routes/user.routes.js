import express from "express";
import { getCurrentUserData, loginUser, registerUser, registerUserStage2 } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.route('/register').post(registerUser)

router.route('/register-stage-2').post(verifyJWT, upload.single('avatar'), registerUserStage2)

router.route("/login").post(loginUser)

router.route("/get-my-profile-data").get(verifyJWT, getCurrentUserData)

export default router