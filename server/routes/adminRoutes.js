import express from "express";
import authRole from "../middlewares/authRole.js";
import { upload } from "../configs/multer.js";
import { addRestaurant } from "../controllers/adminController.js";

const adminRouter = express.Router();

adminRouter.post("/restaurants/add", upload.single("image"), addRestaurant);

export default adminRouter;
