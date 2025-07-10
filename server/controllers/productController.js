import Product from "../models/Product.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import Restaurant from "../models/Restaurant.js";
import mongoose from "mongoose";

export const addProduct = async (req, res) => {
  try {
    const {
      name,
      category,
      price,
      offerPrice,
      description,
      rating,
      deliveryTime,
      stock,
    } = req.body;

    // Find the restaurant for this seller
    const restaurant = await Restaurant.findOne({ owner: req.seller });
    if (!restaurant) {
      return res
        .status(404)
        .json({ success: false, message: "Restaurant not found" });
    }

    // Basic validation
    if (
      !name ||
      !category ||
      price === undefined ||
      !description ||
      deliveryTime === undefined ||
      stock === undefined
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all required fields" });
    }

    if (offerPrice && Number(offerPrice) > Number(price)) {
      return res
        .status(400)
        .json({ success: false, message: "Offer price must not exceed price" });
    }

    if (deliveryTime < 1 || deliveryTime > 180) {
      return res.status(400).json({
        success: false,
        message: "Delivery time must be 1-180 minutes",
      });
    }

    if (stock < 0) {
      return res
        .status(400)
        .json({ success: false, message: "Stock cannot be negative" });
    }

    if (!req.files || req.files.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "At least one image is required" });
    }

    // Upload images
    const uploadedImages = await Promise.all(
      req.files.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "products",
        });
        fs.unlinkSync(file.path);
        return result.secure_url;
      })
    );

    const product = new Product({
      name: name.trim(),
      category: category.trim(),
      price: Number(price),
      offerPrice: offerPrice ? Number(offerPrice) : undefined,
      description: description.trim(),
      rating: rating ? Number(rating) : 0,
      restaurant: restaurant._id,
      images: uploadedImages,
      deliveryTime: Number(deliveryTime),
      stock: Number(stock),
    });

    const savedProduct = await product.save();

    return res.status(201).json({
      success: true,
      message: "Product added",
      data: savedProduct,
    });
  } catch (error) {
    console.error("Add product error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const productList = async (req, res) => {
  try {
    const products = await Product.find().populate("restaurant", "name");

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
      error: error.message,
    });
  }
};

export const productById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const product = await Product.findById(id).populate("restaurant", "name");

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch product",
      error: error.message,
    });
  }
};

export const productByRestaurant = async (req, res) => {
  try {
    const restaurantIds = req.restaurants?.map((r) => r._id);

    if (!restaurantIds || !restaurantIds.length) {
      return res.status(400).json({
        success: false,
        message: "No valid restaurants associated with this seller",
      });
    }

    const data = await Product.find({
      restaurant: { $in: restaurantIds },
    }).populate("restaurant", "name");

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("Failed to get products by restaurant:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error while fetching products",
    });
  }
};

export const productBySeller = async (req, res) => {
  try {
    const sellerId = req.seller?._id;
    console.log("Seller ID:", sellerId);

    if (!sellerId) {
      return res.status(400).json({
        success: false,
        message: "Seller not authenticated",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(sellerId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid seller ID",
      });
    }

    // Fetch all restaurant IDs owned by the seller
    const restaurants = await Restaurant.find({ owner: sellerId }).select(
      "_id"
    );

    if (!restaurants.length) {
      return res.status(404).json({
        success: false,
        message: "No restaurants found for this seller",
      });
    }

    const restaurantIds = restaurants.map((r) => r._id);
    console.log("Restaurant IDs:", restaurantIds);

    // Fetch products linked to those restaurants
    const products = await Product.find({
      restaurant: { $in: restaurantIds },
    }).populate("restaurant", "name");

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    console.error("Error fetching seller's products:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching products",
      error: error.message,
    });
  }
};

export const toggleStock = async (req, res) => {
  try {
    const { id, inStock } = req.body;

    if (!id || typeof inStock !== "boolean") {
      return res.status(400).json({
        success: false,
        message: "Invalid or missing product ID or stock value",
      });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { inStock },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Stock status updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating stock status:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const {
      id,
      name,
      price,
      category,
      description,
      offerPrice,
      stock,
      images,
    } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Update fields if provided
    if (name !== undefined) product.name = name;
    if (price !== undefined) product.price = price;
    if (category !== undefined) product.category = category;
    if (description !== undefined) product.description = description;
    if (offerPrice !== undefined) product.offerPrice = offerPrice;
    if (stock !== undefined) product.stock = stock;
    if (Array.isArray(images)) {
      const cleanedImages = images.map((img) => img.trim()).filter(Boolean);
      if (cleanedImages.length > 0) product.images = cleanedImages;
    }

    await product.save();

    return res.json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.error("Update product error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
