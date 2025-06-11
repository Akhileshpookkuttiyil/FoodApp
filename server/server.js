import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import connectDB from "./configs/db.js";
import userRouter from "./routes/userRoute.js";

dotenv.config();
await connectDB();

const app = express();
const PORT = process.env.PORT || 4000;

const allowedOrigins = ["http://localhost:5173"];

// Middleware
app.use(express.json());
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(cookieParser());
app.use(morgan("dev"));

// Routes
app.use("/api/users", userRouter);

app.get("/", (req, res) => {
  res.send("API is running...");
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Error handler
app.use((err, req, res, next) => {
  res.status(res.statusCode || 500).json({ message: err.message });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
