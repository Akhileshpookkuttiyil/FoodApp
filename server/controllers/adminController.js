import fs from "fs";
import axios from "axios";
import { cloudinary } from "../configs/cloudinary.js";
import Restaurant from "../models/Restaurant.js";

// Helper to get coordinates from address or Plus Code
const getCoordinatesFromAddress = async (address) => {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  const res = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${apiKey}`
  );

  const location = res.data?.results?.[0]?.geometry?.location;
  return location ? { latitude: location.lat, longitude: location.lng } : null;
};

export const addRestaurant = async (req, res) => {
  try {
    const { name, description, categories, location, contactNumber, owner } =
      req.body;
    const imageFile = req.file;

    // Validate required fields
    if (
      !name ||
      !imageFile ||
      !Array.isArray(categories) ||
      categories.length === 0 ||
      !location?.address ||
      !location?.city ||
      !location?.state ||
      !location?.pincode ||
      !contactNumber
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields correctly.",
      });
    }

    // Check for duplicate restaurant in same city
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

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(imageFile.path, {
      folder: "restaurant",
    });

    fs.unlinkSync(imageFile.path); // remove temp image

    // Get coordinates from address (can be Plus Code or full address)
    const coords = await getCoordinatesFromAddress(location.address);

    if (!coords) {
      return res.status(400).json({
        success: false,
        message: "Could not fetch coordinates from the given address.",
      });
    }

    // Create new restaurant
    const newRestaurant = new Restaurant({
      name: name.trim(),
      description: description?.trim() || "",
      image: result.secure_url,
      categories: categories.map((cat) => cat.trim()),
      location: {
        address: location.address.trim(),
        city: location.city.trim(),
        state: location.state.trim(),
        pincode: location.pincode.trim(),
        latitude: coords.latitude,
        longitude: coords.longitude,
      },
      contactNumber: contactNumber.trim(),
      owner: owner.trim(),
    });

    await newRestaurant.save();

    res.status(201).json({
      success: true,
      message: "Restaurant added successfully.",
      restaurant: newRestaurant,
    });
  } catch (error) {
    console.error("Add Restaurant Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error while adding restaurant.",
    });
  }
};
