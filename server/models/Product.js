import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
      index: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      enum: ["Burgers", "Pizza", "Desserts", "Drinks", "Salads", "Other"],
      index: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    offerPrice: {
      type: Number,
      min: 0,
      validate: {
        validator(v) {
          return v === undefined || v <= this.price;
        },
        message: "Offer price must be less than or equal to the original price",
      },
    },
    shortDescription: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },
    longDescription: {
      type: String,
      trim: true,
      maxlength: 2000,
      default: "",
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
      set: (v) => Math.round(v * 10) / 10,
    },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
      index: true,
    },
    images: {
      type: [String],
      required: true,
      validate: {
        validator: (arr) => Array.isArray(arr) && arr.length > 0,
        message: "At least one image is required",
      },
    },
    deliveryTime: {
      type: Number,
      required: true,
      min: 1,
      max: 180,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    inStock: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Auto update inStock before save
productSchema.pre("save", function (next) {
  this.inStock = this.stock > 0;
  next();
});

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
