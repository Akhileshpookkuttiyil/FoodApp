import fs from "fs";
import axios from "axios";
import { cloudinary } from "../configs/cloudinary.js";
import Restaurant from "../models/Restaurant.js";
import User from "../models/User.js";
import Order from "../models/Order.js";
import Category from "../models/Category.js";

// Geocoder using OpenStreetMap Nominatim
const getCoordinatesFromAddress = async (address) => {
  try {
    const res = await axios.get("https://nominatim.openstreetmap.org/search", {
      params: {
        q: address,
        format: "json",
        addressdetails: 1,
        limit: 1,
      },
      headers: {
        "User-Agent": "FoodieMania/1.0 (akhileshpookkuttiyil@gmail.com)",
      },
    });

    if (res.data?.length > 0) {
      const loc = res.data[0];
      return {
        latitude: parseFloat(loc.lat),
        longitude: parseFloat(loc.lon),
      };
    }

    return null;
  } catch (error) {
    console.error("Geocoding Error:", error.message);
    return null;
  }
};

export const addRestaurant = async (req, res) => {
  try {
    const { name, description, contactNumber, owner } = req.body;
    const imageFile = req.file;

    // === Parse location JSON ===
    let location = {};
    try {
      location = JSON.parse(req.body.location || "{}");
    } catch {
      return res.status(400).json({
        success: false,
        message: "Invalid location format.",
      });
    }

    // === Parse categories (CSV or JSON string) ===
    let categoryNames = [];
    try {
      categoryNames = JSON.parse(req.body.categories || "[]");
      if (!Array.isArray(categoryNames)) throw new Error();
    } catch {
      categoryNames = req.body.categories
        .split(",")
        .map((c) => c.trim().toLowerCase())
        .filter(Boolean);
    }

    // === Basic field validation ===
    const missing =
      !name ||
      !imageFile ||
      !contactNumber ||
      !owner ||
      categoryNames.length === 0 ||
      !location.address ||
      !location.city ||
      !location.state ||
      !location.pincode;

    if (missing) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields correctly.",
      });
    }

    // === Find matching categories by name ===
    const categoryDocs = await Category.find({
      name: { $in: categoryNames.map((c) => c.toLowerCase()) },
    });

    if (categoryDocs.length !== categoryNames.length) {
      return res.status(400).json({
        success: false,
        message: "One or more selected categories are invalid.",
      });
    }

    const categoryIds = categoryDocs.map((cat) => cat._id);

    // === Prevent duplicate name + city
    const existing = await Restaurant.findOne({
      name: name.trim(),
      "location.city": location.city.trim(),
    });

    if (existing) {
      return res.status(409).json({
        success: false,
        message: "Restaurant with this name already exists in the city.",
      });
    }

    // === Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(imageFile.path, {
      folder: "restaurant",
    });

    if (!result?.secure_url) {
      return res.status(500).json({
        success: false,
        message: "Image upload failed.",
      });
    }

    // === Delete local image temp file
    try {
      fs.unlinkSync(imageFile.path);
    } catch (err) {
      console.warn("Temp file deletion failed:", err.message);
    }

    // === Geocode address → coords
    const fullAddress = `${location.address}, ${location.city}, ${location.state}, ${location.pincode}`;
    const fallbackAddress = `${location.city}, ${location.state}, ${location.pincode}, India`;

    let coords = await getCoordinatesFromAddress(fullAddress);
    if (!coords) coords = await getCoordinatesFromAddress(fallbackAddress);

    if (!coords) {
      return res.status(400).json({
        success: false,
        message: "Could not determine coordinates from address.",
      });
    }

    // === Save to MongoDB
    const newRestaurant = new Restaurant({
      name: name.trim(),
      description: description?.trim() || "",
      image: result.secure_url,
      categories: categoryIds,
      location: {
        address: location.address.trim(),
        city: location.city.trim(),
        state: location.state.trim(),
        pincode: location.pincode.trim(),
        latitude: coords.latitude,
        longitude: coords.longitude,
      },
      contactNumber: contactNumber.replace(/\s+/g, "").trim(),
      owner: owner.trim(),
    });

    await newRestaurant.save();

    res.status(201).json({
      success: true,
      message: "Restaurant added successfully.",
      restaurant: newRestaurant,
    });
  } catch (error) {
    console.error("Add Restaurant Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while adding restaurant.",
    });
  }
};
export const getUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "user" })
      .select("firstName lastName email isVerified profileImage createdAt")
      .lean();

    const formattedUsers = users.map((user) => ({
      id: user._id,
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      status: user.isVerified ? "Active" : "Pending",
      statusColor: user.isVerified ? "green" : "yellow",
      joined: new Date(user.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      imgSrc: user.profileImage || "https://www.gravatar.com/avatar/?d=mp",
    }));

    res.status(200).json(formattedUsers);
  } catch (error) {
    console.error("Failed to fetch users:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching users.",
    });
  }
};

export const getSellers = async (req, res) => {
  try {
    const users = await User.find({ role: "seller" })
      .select("firstName lastName email isVerified profileImage createdAt")
      .lean();

    const sellers = users.map((user) => ({
      id: String(user._id),
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      status: user.isVerified ? "Active" : "Pending",
      statusColor: user.isVerified ? "green" : "yellow",
      joined: new Date(user.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      imgSrc: user.profileImage || "https://www.gravatar.com/avatar/?d=mp",
    }));

    res.status(200).json({
      success: true,
      sellers,
    });
  } catch (error) {
    console.error("Failed to fetch sellers:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching sellers.",
    });
  }
};

export const getRestaurantsForAdmin = async (req, res) => {
  try {
    const restaurants = await Restaurant.find({})
      .select(
        "name image rating totalReviews categories location isActive owner"
      )
      .populate("owner", "firstName")
      .populate("categories", "name");

    const formatted = restaurants.map((r) => ({
      id: r._id,
      name: r.name,
      image: r.image,
      rating: r.rating,
      totalReviews: r.totalReviews,
      categories: r.categories?.length
        ? r.categories.map((cat) => cat.name)
        : ["General"],
      location: {
        city: r.location.city,
        state: r.location.state,
        address: r.location.address,
      },
      status: r.isActive ? "Active" : "Inactive",
      ownerName: r.owner ? r.owner.firstName : "Unknown",
    }));

    res.status(200).json(formatted);
  } catch (err) {
    console.error("Admin restaurant fetch error:", err);
    res.status(500).json({ message: "Admin fetch failed" });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate("user", "name email")
      .populate("restaurant", "name cuisine")
      .populate("items.product", "name price")
      .populate("shippingAddress")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    console.error("Error fetching orders:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error while fetching orders",
    });
  }
};
