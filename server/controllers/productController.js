import Product from "../models/Product.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

export const addProduct = async (req, res) => {
  try {
    const {
      name,
      category,
      price,
      offerPrice,
      shortDescription,
      longDescription,
      rating,
      deliveryTime,
      stock,
    } = req.body;

    const restaurant = req.seller;

    if (
      !name ||
      !category ||
      price === undefined ||
      !shortDescription ||
      deliveryTime === undefined ||
      stock === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing required product fields",
      });
    }

    // Removed category validation here

    if (
      offerPrice !== undefined &&
      offerPrice !== "" &&
      Number(offerPrice) > Number(price)
    ) {
      return res.status(400).json({
        success: false,
        message: "Offer price must be less than or equal to the product price",
      });
    }

    if (deliveryTime < 1 || deliveryTime > 180) {
      return res.status(400).json({
        success: false,
        message: "Delivery time must be between 1 and 180 minutes",
      });
    }

    if (stock < 0) {
      return res.status(400).json({
        success: false,
        message: "Stock cannot be negative",
      });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one image is required",
      });
    }

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
      category,
      price: Number(price),
      offerPrice: offerPrice === "" ? undefined : Number(offerPrice),
      shortDescription: shortDescription.trim(),
      longDescription: longDescription ? longDescription.trim() : "",
      rating: rating !== undefined ? Number(rating) : 0,
      restaurant,
      images: uploadedImages,
      deliveryTime: Number(deliveryTime),
      stock: Number(stock),
    });

    const savedProduct = await product.save();

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: savedProduct,
    });
  } catch (error) {
    console.error("Error in addProduct:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export const productList = async (req, res) => {
  try {
    const products = await Product.find();

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

    // Validate MongoDB ObjectId
    if (!id || id.length !== 24 || !/^[a-fA-F0-9]{24}$/.test(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid or missing product ID",
      });
    }

    const product = await Product.findById(id);

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
    console.error("productById error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
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

    res.status(200).json({
      success: true,
      message: "Stock status updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
