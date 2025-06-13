// middleware/authRole.js
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authRole = (...allowedRoles) => {
  return async (req, res, next) => {
    try {
      const token = req.cookies?.sellerToken;

      if (!token) {
        return res.status(401).json({
          success: false,
          message: "Authentication token not found",
        });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findById(decoded.id).select("-password");
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "User not found",
        });
      }

      if (!allowedRoles.includes(user.role)) {
        return res.status(403).json({
          success: false,
          message: "Access denied: insufficient permissions",
        });
      }

      req.user = user;
      next();
    } catch (error) {
      console.error("Authorization error:", error.message);
      return res.status(401).json({
        success: false,
        message: "Unauthorized request",
      });
    }
  };
};

export default authRole;
