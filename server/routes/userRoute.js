import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  isAuthorized,
  updateUser,
} from "../controllers/userController.js";
import { upload } from "../configs/multer.js";
import authUser from "../middlewares/authUser.js";

const userRouter = express.Router();

// Public Routes
userRouter.post("/register", registerUser);
userRouter.put("/update", authUser, upload.single("profileImage"), updateUser);
userRouter.post("/login", loginUser);

// Protected Routes
userRouter.get("/checkAuth", authUser, isAuthorized);
userRouter.post("/logout", authUser, logoutUser);

export default userRouter;
