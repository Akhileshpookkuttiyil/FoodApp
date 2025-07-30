import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import crypto from "crypto";
import sendEmail from "../../server/utils/sendEmail.js";

const pendingVerifications = new Map(); // key: email, value: { userData, otp, expiresAt }

// ===================== Generate JWT Token =====================
const generateToken = (userId, sessionId) => {
  return jwt.sign({ id: userId, sessionId }, process.env.JWT_SECRET, {
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

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 5 * 60 * 1000; // expires in 5 minutes

    // Store data temporarily
    pendingVerifications.set(email, {
      userData: { firstName, lastName, email, role, password },
      otp,
      expiresAt,
    });

    // Send OTP email
    await sendEmail(
      email,
      "Verify your FoodieMania Account",
      `Hello ${firstName},\n\nYour OTP is: ${otp}\nIt will expire in 5 minutes.\n\n- FoodieMania Team`
    );

    return res.status(200).json({
      success: true,
      message:
        "OTP sent to your email. Please verify to complete registration.",
    });
  } catch (error) {
    console.error("Registration error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

// ===================== VERIFY OTP CONTROLLER =====================

const verifyOtp = async (req, res) => {
  try {
    const email = req.body.email?.toLowerCase().trim();
    const { otp } = req.body;

    const entry = pendingVerifications.get(email);
    if (!entry) {
      return res
        .status(400)
        .json({
          success: false,
          message: "No OTP request found for this email.",
        });
    }

    const { userData, otp: validOtp, expiresAt } = entry;

    if (Date.now() > expiresAt) {
      pendingVerifications.delete(email);
      return res.status(400).json({ success: false, message: "OTP expired." });
    }

    if (otp !== validOtp) {
      return res.status(400).json({ success: false, message: "Invalid OTP." });
    }

    const newUser = new User(userData);
    if (newUser.role === "user") {
      const sessionId = crypto.randomBytes(16).toString("hex");
      newUser.sessionId = sessionId;

      await newUser.save();
      const token = generateToken(newUser._id, sessionId);
      setTokenCookie(res, token);
    } else {
      await newUser.save()
    }

    pendingVerifications.delete(email);

    return res.status(201).json({
      success: true,
      message: "Account verified successfully.",
      user: formatUserResponse(newUser),
    });
  } catch (err) {
    console.error("OTP verification error:", err.message);
    return res
      .status(500)
      .json({ success: false, message: "OTP verification failed." });
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

    let user = await User.findOne({ email, role: "user" }).select(
      "+password +sessionId"
    );

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials.",
      });
    }

    const isValid = await user.comparePassword(password);
    if (!isValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials.",
      });
    }

    // Generate a new sessionId (which will invalidate any previous session)
    const sessionId = crypto.randomBytes(16).toString("hex");
    user.sessionId = sessionId;
    await user.save();

    user = await User.findById(user._id)
      .populate({
        path: "cartItems.item",
        populate: {
          path: "restaurant",
          select: "name",
        },
      })
      .select("-password");

    // Issue token with sessionId
    const token = generateToken(user._id, sessionId);
    setTokenCookie(res, token);

    // Filter cartItems with valid products
    const validCartItems = user.cartItems.filter((ci) => ci.item !== null);

    res.status(200).json({
      success: true,
      message: "Login successful.",
      user: { ...formatUserResponse(user), cartItems: validCartItems || [] },
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
const logoutUser = async (req, res) => {
  try {
    const userId = req.user?._id;

    if (userId) {
      await User.findByIdAndUpdate(userId, { sessionId: null });
    }

    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "Strict",
    });

    return res
      .status(200)
      .json({ success: true, message: "Logged out successfully." });
  } catch (err) {
    console.error("Logout error:", err.message);
    return res
      .status(500)
      .json({ success: false, message: "Logout failed. Please try again." });
  }
};

// ===================== EXPORT CONTROLLERS =====================
export { registerUser, loginUser, logoutUser, isAuthorized, verifyOtp };
