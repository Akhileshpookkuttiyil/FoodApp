import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  isAuthorized,
  updateUser,
  verifyOtp,
} from "../controllers/userController.js";
import { upload } from "../configs/multer.js";
import authUser from "../middlewares/authUser.js";

const userRouter = express.Router();

// Public Routes
userRouter.post("/request-otp", registerUser);
userRouter.post("/verify-otp", verifyOtp);
userRouter.post("/login", loginUser);

// Protected Routes
userRouter.get("/checkAuth", authUser, isAuthorized);
userRouter.put("/update", authUser, upload.single("profileImage"), updateUser);
userRouter.post("/logout", authUser, logoutUser);

export default userRouter;
