import express from "express";
import authRole from "../middlewares/authRole.js";
import { addRestaurant } from "../controllers/adminController.js";

const adminRouter = express.Router();

adminRouter.post("/restaurants/add", addRestaurant);

export default adminRouter;
