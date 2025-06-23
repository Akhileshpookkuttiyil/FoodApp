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

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required." });
    }

    email = email.toLowerCase().trim();

    const seller = await User.findOne({ email, role: "seller" }).select(
      "+password"
    );
    if (!seller) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials." });
    }

    const isMatch = await seller.comparePassword(password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials." });
    }

    const token = jwt.sign(
      { id: seller._id, role: seller.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res
      .cookie("sellerToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .status(200)
      .json({
        success: true,
        message: "Seller login successful",
        seller: formatUserResponse(seller),
      });
  } catch (error) {
    console.error("Seller login error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ===================== SELLER AUTH CHECK =====================
const isAuthorized = async (req, res) => {
  try {
    const user = req.user; // Populated from auth middleware

    if (!user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    if (user.role !== "seller") {
      return res
        .status(403)
        .json({ success: false, message: "Access denied: Not a seller" });
    }

    res.status(200).json({
      success: true,
      seller: formatUserResponse(user),
    });
  } catch (error) {
    console.error("Authorization check error:", error.message);
    res.status(500).json({ success: false, message: "Authorization failed." });
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
      .json({ success: true, message: "Seller logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Server error during logout" });
  }
};

// ===================== EXPORT CONTROLLERS =====================
export default {
  sellerLogin,
  isAuthorized,
  sellerLogout,
};
