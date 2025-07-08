import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authRole = (...allowedRoles) => {
  return async (req, res, next) => {
    try {
      const { sellerToken, adminToken } = req.cookies;

      const tokenMap = {
        seller: sellerToken,
        admin: adminToken,
      };

      for (const role of allowedRoles) {
        const token = tokenMap[role];
        if (!token) continue;

        try {
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
          const user = await User.findById(decoded.id).select("-password");

          if (user && user.role === role) {
            req.user = user;
            if (role === "seller") req.seller = user;
            if (role === "admin") req.admin = user;
            return next();
          }
        } catch (err) {
          if (process.env.NODE_ENV !== "production") {
            console.warn(`Invalid ${role} token:`, err.message);
          }
        }
      }

      return res.status(403).json({
        success: false,
        message: "Access denied: insufficient permissions or invalid token",
      });
    } catch (error) {
      console.error("Authorization error:", error.message);
      return res.status(401).json({
        success: false,
        message:
          error.name === "TokenExpiredError"
            ? "Session expired. Please log in again."
            : "Unauthorized request",
      });
    }
  };
};

export default authRole;
