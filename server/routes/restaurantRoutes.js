import express from "express";
import {
  getAllRestaurants,
  getRestaurantByUser,
} from "../controllers/restaurantsController.js";
import authRole from "../middlewares/authRole.js";

const restaurantRouter = express.Router();
restaurantRouter.get("/getAll", getAllRestaurants);

// Protected seller-only routes
restaurantRouter.use(authRole("seller"));
restaurantRouter.get("/getByUser", getRestaurantByUser);

export default restaurantRouter;
