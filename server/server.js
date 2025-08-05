import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./configs/db.js";
import connectCloudinary from "./configs/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import sellerRouter from "./routes/sellerRoutes.js";
import productRouter from "./routes/productRoutes.js";
import cartRouter from "./routes/cartRoutes.js";
import addressRouter from "./routes/addressRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import adminRouter from "./routes/adminRoutes.js";
import locationRouter from "./routes/locationRoutes.js";
import { stripeWebhooks } from "./controllers/orderController.js";
import restaurantRouter from "./routes/restaurantRoutes.js";
import categoryRouter from "./routes/categoryRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

const startServer = async () => {
  try {
    await connectCloudinary();
    console.log("Cloudinary connected successfully");

    await connectDB();

    // ========== Stripe Webhook Route (MUST BE FIRST) ==========

    app.post(
      "/api/stripe/webhook",
      express.raw({ type: "application/json" }),
      stripeWebhooks
    );

    // ========== Middleware ==========
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json({ limit: "10mb" }));
    app.use(cookieParser());
    app.use(morgan("dev"));

    const allowOrigin = [
      "https://food-app-one-rho.vercel.app",
      "http://localhost:5173",
    ];

    app.use(cors({ origin: allowOrigin, credentials: true }));

    // ========== API Routes ==========
    app.use("/api/user", userRouter);
    app.use("/api/seller", sellerRouter);
    app.use("/api/product", productRouter);
    app.use("/api/cart", cartRouter);
    app.use("/api/address", addressRouter);
    app.use("/api/order", orderRouter);
    app.use("/api/admin", adminRouter);
    app.use("/api/restaurant", restaurantRouter);
    app.use("/api/location", locationRouter);
    app.use("/api/category", categoryRouter);

    app.get("/", (req, res) => {
      res.send("API is running");
    });

    // ========== 404 Route ==========

    app.use((req, res) => {
      res.status(404).json({ success: false, message: "Route not found" });
    });

    // ========== Global Error Handler ==========

    app.use((err, req, res, next) => {
      const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
      res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error",
        ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
      });
    });

    // ========== Start Server ==========

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Startup failed:", err.message);
    process.exit(1);
  }
};

startServer();
