// controllers/adminController.js

import Restaurant from "../models/Restaurant.js";

export const addRestaurant = async (req, res) => {
  try {
    const { name, description, image, categories, location, contactNumber } =
      req.body;

    //Validate required fields
    if (
      !name ||
      !image ||
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

    //check for duplicate restaurant name in same location
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

    const newRestaurant = new Restaurant({
      name: name.trim(),
      description: description?.trim() || "",
      image: image.trim(),
      categories: categories.map((cat) => cat.trim()),
      location: {
        address: location.address.trim(),
        city: location.city.trim(),
        state: location.state.trim(),
        pincode: location.pincode.trim(),
      },
      contactNumber: contactNumber.trim(),
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
