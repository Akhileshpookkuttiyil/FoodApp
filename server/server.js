import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./configs/db.js";
import userRouter from "./routes/userRoute.js";
import sellerRouter from "./routes/sellerRoutes.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// ===================== Connect to MongoDB =====================
connectDB()
  .then(() => {
    console.log("MongoDB connected successfully");

    // ===================== Middleware =====================
    app.use(express.json()); // Parse JSON requests
    app.use(cookieParser()); // Parse cookies
    app.use(morgan("dev")); // Log HTTP requests

    // CORS configuration
    const allowedOrigins = [process.env.CLIENT_URL || "http://localhost:5173"];
    app.use(
      cors({
        origin: allowedOrigins,
        credentials: true,
      })
    );

    // ===================== Routes =====================
    app.use("/api/user", userRouter);
    app.use("/api/seller", sellerRouter);

    // Health check or root route
    app.get("/", (req, res) => {
      res.send("API is running...");
    });

    // ===================== 404 Not Found Handler =====================
    app.use((req, res) => {
      res.status(404).json({ success: false, message: "Route not found" });
    });

    // ===================== Global Error Handler =====================
    app.use((err, req, res, next) => {
      const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
      res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error",
        ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
      });
    });

    // ===================== Start Server =====================
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  });
