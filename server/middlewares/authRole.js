// middleware/auth.js
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authRole = (...allowedRoles) => {
  return async (req, res, next) => {
    try {
      const token = req.cookies?.sellerToken;

      if (!token) {
        return res
          .status(401)
          .json({ success: false, message: "No token provided" });
      }

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Fetch user and attach to request
      const user = await User.findById(decoded.id).select("-password");

      if (!user) {
        return res
          .status(401)
          .json({ success: false, message: "User not found" });
      }

      // Check if user's role is in the allowed roles
      if (!allowedRoles.includes(user.role)) {
        return res
          .status(403)
          .json({ success: false, message: "Access denied" });
      }

      req.user = user;
      next();
    } catch (err) {
      console.error("Auth error:", err.message);
      res.status(401).json({ success: false, message: "Unauthorized" });
    }
  };
};

export default authRole;
