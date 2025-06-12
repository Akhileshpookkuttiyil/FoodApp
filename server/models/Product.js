import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      maxlength: [100, "Product name cannot exceed 100 characters"],
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

    offerPrice: {
      type: Number,
      min: [0, "Offer price cannot be negative"],
      validate: {
        validator: function (v) {
          // Offer price should not exceed the original price
          return v === undefined || v <= this.price;
        },
        message: "Offer price must be less than or equal to the original price",
      },
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

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
      set: (v) => Math.round(v * 10) / 10, // Round to 1 decimal place
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
        message: "Product must have at least one image",
      },
    },

    deliveryTime: {
      type: Number,
      required: [true, "Delivery time is required"],
      min: [1, "Delivery time must be at least 1 minute"],
      max: [180, "Delivery time seems too long"],
    },

    stock: {
      type: Number,
      required: true,
      min: [0, "Stock cannot be negative"],
      default: 0,
    },

    inStock: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  {
    timestamps: true, // Automatically manage createdAt & updatedAt
  }
);

// Pre-save hook to set inStock based on stock value
productSchema.pre("save", function (next) {
  this.inStock = this.stock > 0;
  next();
});

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
