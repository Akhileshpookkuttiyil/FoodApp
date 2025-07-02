import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Restaurant from "../models/Restaurant.js";

const authRole = (...allowedRoles) => {
  return async (req, res, next) => {
    try {
      const { sellerToken, adminToken } = req.cookies;

      let decoded;
      let user;

      // First try adminToken
      if (adminToken) {
        try {
          decoded = jwt.verify(adminToken, process.env.JWT_SECRET);
          user = await User.findById(decoded.id).select("-password");

          if (user && allowedRoles.includes(user.role)) {
            req.user = user;
            req.admin = user;
            return next();
          }
        } catch (err) {
          console.warn("Invalid admin token:", err.message);
        }
      }

      // Then try sellerToken
      if (sellerToken) {
        try {
          decoded = jwt.verify(sellerToken, process.env.JWT_SECRET);
          user = await User.findById(decoded.id).select("-password");

          if (user && allowedRoles.includes(user.role)) {
            const restaurants = await Restaurant.find({ owner: user._id });
            if (!restaurants.length) {
              return res.status(403).json({
                success: false,
                message: "Access denied: no associated restaurants found",
              });
            }
            req.user = user;
            req.seller = user;
            req.restaurants = restaurants;
            return next();
          }
        } catch (err) {
          console.warn("Invalid seller token:", err.message);
        }
      }

      return res.status(403).json({
        success: false,
        message: "Access denied: insufficient permissions or invalid tokens",
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
