import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authUser = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized: No token provided" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user to ensure they still exist (optional but safer)
   const user = await User.findById(decoded.id).select("+sessionId");
        if (!user || user.sessionId !== decoded.sessionId) {
      return res.status(401).json({ success: false, message: "Session invalid or expired. Please log in again." });
        }

    // Attach user to request object
    req.user = user;
    req.userId = user._id;

    next();
  } catch (error) {
    console.error("authUser error:", error.message);
    const message =
      error.name === "TokenExpiredError"
        ? "Session expired. Please log in again."
        : "Unauthorized: Invalid token";

    return res.status(401).json({ success: false, message });
  }
};

export default authUser;
