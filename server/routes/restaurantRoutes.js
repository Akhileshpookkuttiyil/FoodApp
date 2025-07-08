import express from "express";
import { getAllRestaurants, getRestaurantByUser } from "../controllers/restaurantsController.js";
import authRole from "../middlewares/authRole.js";

const restaurantRouter = express.Router();

restaurantRouter.get("/getAll", getAllRestaurants);
restaurantRouter.get("/getByUser",authRole('seller'), getRestaurantByUser);

export default restaurantRouter;
