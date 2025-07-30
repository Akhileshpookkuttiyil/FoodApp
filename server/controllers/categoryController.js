// controllers/categoryController.js

import fs from "fs";
import Category from "../models/Category.js";
import { cloudinary } from "../configs/cloudinary.js";

export const getAvailableCategories = async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true }).sort({
      name: 1,
    });

    res.status(200).json({
      success: true,
      count: categories.length,
      categories,
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching categories",
    });
  }
};

export const addCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const file = req.file;

    if (!name || !file) {
      return res.status(400).json({
        success: false,
        message: "Both category name and image file are required",
      });
    }

    const existing = await Category.findOne({
      name: name.toLowerCase().trim(),
    });

    if (existing) {
      return res.status(409).json({
        success: false,
        message: "Category already exists",
      });
    }

    const uploadResult = await cloudinary.uploader.upload(file.path, {
      folder: "categories",
    });

    fs.unlinkSync(file.path); // remove local file

    const newCategory = await Category.create({
      name: name.toLowerCase().trim(),
      image: uploadResult.secure_url,
    });

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: newCategory,
    });
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({
      success: false,
      message: "Server error while creating category",
    });
  }
};
