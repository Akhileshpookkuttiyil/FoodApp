import express from "express";
import { upload } from "../configs/multer.js";
import authRole from "../middlewares/authRole.js";
import {
  addProduct,
  productList,
  productById,
  toggleStock,
} from "../controllers/productController.js";

const productRouter = express.Router();

// Add new product (only sellers allowed, with image uploads)
productRouter.post(
  "/add",
  authRole("seller"),
  upload.array("images"),
  addProduct
);

// Get all products
productRouter.get("/list", productList);

// Get product by ID (pass id as query or param based on your frontend setup)
productRouter.get("/:id", authRole("seller"), productById);

// Toggle inStock status of a product (seller access)
productRouter.patch("/toggle-stock", authRole("seller"), toggleStock);

export default productRouter;
