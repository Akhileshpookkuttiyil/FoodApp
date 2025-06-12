import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  isAuthorized,
} from "../controllers/userController.js";
import authUser from "../middlewares/authUser.js";

const userRouter = express.Router();

// Public Routes
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

// Protected Routes
userRouter.get("/checkAuth", authUser, isAuthorized);
userRouter.post("/logout", authUser, logoutUser);

export default userRouter;
