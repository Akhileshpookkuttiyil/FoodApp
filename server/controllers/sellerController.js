
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// ===================== FORMAT USER RESPONSE =====================
const formatUserResponse = (user) => ({
  id: user._id,
  fullName: user.fullName,
  email: user.email,
  role: user.role,
  profileImage: user.profileImage,
});

// ===================== SELLER LOGIN =====================
const sellerLogin = async (req, res) => {
  try {
    let { email, password } = req.body;

    // Input validation
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    // If email normalization is NOT done in schema, keep this
    email = email.toLowerCase().trim();

    // Find seller with role
    const seller = await User.findOne({ email, role: "seller" }).select("+password");
    if (!seller) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // Check password
    const isMatch = await seller.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: seller._id, role: seller.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Send token in cookie
    res
      .cookie("sellerToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .status(200)
      .json({
        message: "Seller login successful",
        seller: formatUserResponse(seller),
      });
  } catch (error) {
    console.error("Seller login error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// ===================== SELLER-AUTH CHECK =====================
const isAuthorized = async (req, res) => {
  try {
    const user = req.user; // Populated from auth middleware

    if (!user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    if (user.role !== "seller") {
      return res.status(403).json({ success: false, message: "Access denied: Not a seller" });
    }

    res.status(200).json({
      success: true,
      user: formatUserResponse(user),
    });
  } catch (error) {
    console.error("Authorization check error:", error.message);
    res.status(500).json({
      success: false,
      message: "Authorization failed.",
    });
  }
};


// ===================== SELLER LOGOUT =====================
const sellerLogout = (req, res) => {
  try {
    res
      .clearCookie("sellerToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      })
      .status(200)
      .json({ message: "Seller logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error.message);
    res.status(500).json({ message: "Server error during logout" });
  }
};

// ===================== EXPORT CONTROLLERS =====================
export default {
  sellerLogin,
  isAuthorized,
  sellerLogout,
};
