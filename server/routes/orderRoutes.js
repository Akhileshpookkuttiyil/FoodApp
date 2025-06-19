import express from "express";
import authUser from "../middlewares/authUser.js";
import authRole from "../middlewares/authRole.js";
import {
  getAllOrders,
  getUserOrders,
  placeOrderCOD,
} from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.post("/cod", authUser, placeOrderCOD);
orderRouter.get("/user", authUser, getUserOrders);
orderRouter.get("/seller", authRole("seller"), getAllOrders);

export default orderRouter;
