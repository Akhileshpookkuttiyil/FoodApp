import express from "express";
import authRole from "../middlewares/authRole.js";
import { upload } from "../configs/multer.js";
import {
  addRestaurant,
  getAllOrders,
  getRestaurantsForAdmin,
  getSellers,
  getUsers,
} from "../controllers/adminController.js";

const adminRouter = express.Router();

adminRouter.post("/restaurants/add", upload.single("image"), addRestaurant);
adminRouter.get("/users/getAllUsers", getUsers);
adminRouter.get("/sellers/getAllSellers", getSellers);
adminRouter.get("/restaurant/getRestaurants", getRestaurantsForAdmin);
adminRouter.get("/orders/getAll", getAllOrders);

export default adminRouter;
