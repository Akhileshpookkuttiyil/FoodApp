import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// ===================== Generate JWT Token =====================
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// ===================== Set HTTP-Only Cookie =====================
const setTokenCookie = (res, token) => {
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "Strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};

// ===================== Format User Response =====================
const formatUserResponse = (user) => ({
  id: user._id,
  firstName: user.firstName,
  lastName: user.lastName,
  profileImage: user.profileImage,
  phoneNumber: user.phoneNumber,
  fullName: `${user.firstName} ${user.lastName}`,
  email: user.email,
  role: user.role,
});

// ===================== REGISTER CONTROLLER =====================
const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, role, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "First name, last name, email, and password are required.",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists with this email.",
      });
    }

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      role: role || "user",
      password,
    });

    // Only issue token if it's a user
    if (newUser.role === "user") {
      const token = generateToken(newUser._id);
      setTokenCookie(res, token);
    }

    res.status(201).json({
      success: true,
      message: "User registered successfully.",
      user: formatUserResponse(newUser),
    });
  } catch (error) {
    console.error("Registration error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

// ===================== UPDATE CONTROLLER =====================

export const updateUser = async (req, res) => {
  try {
    console.log(req.body);
    const { firstName, lastName, email, phoneNumber, profileImage } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (email && email !== user.email) {
      const exists = await User.findOne({ email });
      if (exists) {
        return res
          .status(409)
          .json({ success: false, message: "Email already in use" });
      }
      user.email = email;
    }

    if (firstName?.trim()) user.firstName = firstName.trim();
    if (lastName?.trim()) user.lastName = lastName.trim();
    if (phoneNumber?.trim()) user.phoneNumber = phoneNumber.trim();

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "users",
      });
      fs.unlinkSync(req.file.path);
      user.profileImage = result.secure_url;
    } else if (profileImage?.startsWith("http")) {
      user.profileImage = profileImage;
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated",
      user: formatUserResponse(user),
    });
  } catch (error) {
    console.error("Update user error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error while updating user" });
  }
};

// ===================== LOGIN CONTROLLER =====================
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    const user = await User.findOne({ email, role: "user" }).select(
      "+password"
    );

    const isValid = user && (await user.comparePassword(password));
    if (!isValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials.",
      });
    }

    const token = generateToken(user._id);
    setTokenCookie(res, token);

    res.status(200).json({
      success: true,
      message: "Login successful.",
      user: formatUserResponse(user),
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};
// ===================== AUTH CHECK CONTROLLER =====================
const isAuthorized = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized: No user info" });
    }

    const user = await User.findById(req.user._id)
      .populate({
        path: "cartItems.item",
        populate: {
          path: "restaurant",
          select: "name",
        },
      })
      .select("-password");

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized: User not found" });
    }

    if (user.role !== "user") {
      return res
        .status(403)
        .json({ success: false, message: "Access denied: Not a user" });
    }

    res.status(200).json({
      success: true,
      user: { ...formatUserResponse(user), cartItems: user.cartItems || [] },
    });
  } catch (error) {
    console.error(
      `Auth check error for user ${req.user?._id || "unknown"}:`,
      error
    );
    res.status(500).json({
      success: false,
      message: "Authorization failed.",
    });
  }
};

// ===================== LOGOUT CONTROLLER =====================
const logoutUser = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "Strict",
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully.",
  });
};

// ===================== EXPORT CONTROLLERS =====================
export { registerUser, loginUser, logoutUser, isAuthorized };
