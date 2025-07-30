import express from "express";
import { upload } from "../configs/multer.js";

import {
  addCategory,
  getAvailableCategories,
} from "../controllers/categoryController.js";

const categoryRouter = express.Router();

categoryRouter.get("/categories/getcategories", getAvailableCategories);
categoryRouter.post("/category/add", upload.single("image"), addCategory);

export default categoryRouter;
