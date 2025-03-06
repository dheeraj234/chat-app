import { Router } from "express";
import { login, signup, getUserInfo} from "../controllers/AuthController.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import multer from "multer";
const authRoutes=Router();
const upload = multer({dest:"uploads/profiles/"})
authRoutes.post("/signup",signup)
authRoutes.post("/login",login)
authRoutes.get("/user-info",verifyToken,getUserInfo)
authRoutes.post("/update-profile",verifyToken,updateProfile)
authRoutes.post("/add-profile-image",verifyToken,upload.single("profile-image"),addProfileImage);
authRoutes.post("/remove-profile-image",verifyToken,upload.single("profile-image"),removeProfileImage)

export default authRoutes