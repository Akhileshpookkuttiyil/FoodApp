import express from "express";
import authUser from "../middlewares/authUser.js";
import { clearCart, updateCart } from "../controllers/cartController.js";

const cartRouter = express.Router();

cartRouter.post("/update", authUser, updateCart);
cartRouter.post("/clear", authUser, clearCart);

export default cartRouter;
