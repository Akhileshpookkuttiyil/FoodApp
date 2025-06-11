import mongoose from "mongoose";

const dishSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Dish name is required"],
      trim: true,
      maxlength: [100, "Dish name cannot exceed 100 characters"],
      index: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
      enum: ["Burgers", "Pizza", "Desserts", "Drinks", "Salads", "Other"],
      index: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
      set: (v) => Math.round(v * 10) / 10, // rounded to 1 decimal place
    },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: [true, "Associated restaurant is required"],
      index: true,
    },
    images: {
      type: [String],
      required: [true, "At least one image is required"],
      validate: {
        validator: (arr) => arr.length > 0,
        message: "Dish must have at least one image",
      },
    },
    deliveryTime: {
      type: Number,
      required: [true, "Delivery time is required"],
      min: [1, "Delivery time must be at least 1 minute"],
      max: [180, "Delivery time seems too long"],
    },
    shortDescription: {
      type: String,
      required: [true, "Short description is required"],
      trim: true,
      maxlength: [150, "Short description can't exceed 150 characters"],
    },
    longDescription: {
      type: String,
      trim: true,
      maxlength: [2000, "Long description can't exceed 2000 characters"],
      default: "",
    },
    inStock: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, // createdAt & updatedAt auto-managed
  }
);

const Dish = mongoose.models.Dish || mongoose.model("Dish", dishSchema);

export default Dish;
// This schema defines a Dish model with various fields such as name, category, price, rating, restaurant association, images, delivery time, descriptions, and stock status. It includes validation for required fields and constraints on values (like price and delivery time). The timestamps option automatically manages createdAt and updatedAt fields.
