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

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

const startServer = async () => {
  try {
    await connectCloudinary();
    console.log("Cloudinary connected successfully");

    await connectDB();

    // Middleware
    app.use(express.json());
    app.use(cookieParser());
    app.use(morgan("dev"));

    const allowedOrigins = [process.env.CLIENT_URL || "http://localhost:5173"];

    app.use(
      cors({
        origin: (origin, callback) => {
          // Allow requests with no origin (like mobile apps or curl)
          if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
          } else {
            callback(new Error("Not allowed by CORS"));
          }
        },
        credentials: true,
      })
    );

    // Routes
    app.use("/api/user", userRouter);
    app.use("/api/seller", sellerRouter);
    app.use("/api/product", productRouter);
    app.use("/api/cart", cartRouter);
    app.use("/api/address", addressRouter);
    app.use("/api/order", orderRouter);
    app.use("/api/admin", adminRouter);

    app.get("/", (req, res) => {
      res.send("API is running");
    });

    app.use((req, res) => {
      res.status(404).json({ success: false, message: "Route not found" });
    });

    app.use((err, req, res, next) => {
      const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
      res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error",
        ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
      });
    });

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Startup failed:", err.message);
    process.exit(1);
  }
};

startServer();
