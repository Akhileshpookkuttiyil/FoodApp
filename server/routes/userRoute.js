import express from "express";
import {
  isAuthorized,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/userController.js";
import authUser from "../middlewares/authUser.js";
const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/is-Authorized", authUser, isAuthorized);
userRouter.get("/logout", authUser, logoutUser);

export default userRouter;
