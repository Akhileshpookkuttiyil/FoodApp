import express from "express";
import { upload } from "../configs/multer.js";
import authRole from "../middlewares/authRole.js";
import {
  addProduct,
  productList,
  productById,
  toggleStock,
  updateProduct,
  productByRestaurant,
  productBySeller,
} from "../controllers/productController.js";

const productRouter = express.Router();

// --- Public Routes ---
productRouter.get("/list", productList); //list all products
productRouter.get("/:id", productById); //

// --- Seller Routes (protected) ---
productRouter.use(authRole("seller"));

productRouter.post("/add", upload.array("images"), addProduct);
productRouter.get("/getByRestaurant", productByRestaurant);
productRouter.get("/getProductsBySeller", productBySeller);
productRouter.patch("/toggle-stock", toggleStock);
productRouter.patch("/update", updateProduct);

export default productRouter;
