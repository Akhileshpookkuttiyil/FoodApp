import express from "express";
import sellerController from "../controllers/sellerController.js";
import authRole from "../middlewares/authRole.js";

const sellerRouter = express.Router();

// Public route
sellerRouter.post("/login", sellerController.sellerLogin);

// Protected route
sellerRouter.get(
  "/checkAuth",
  authRole("seller"),
  sellerController.isAuthorized
);
// Checks for valid JWT and attaches req.user &Ensures the role is 'seller'
sellerRouter.post("/logout", authRole("seller"), sellerController.sellerLogout);

export default sellerRouter;
