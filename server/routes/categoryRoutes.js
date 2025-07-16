import express from "express";

import { getAvailableCategories } from "../controllers/categoryController.js";

const categoryRouter = express.Router();

categoryRouter.get("/categories/getcategories", getAvailableCategories);
// categoryRouter.post("/category/add",)

export default categoryRouter;
