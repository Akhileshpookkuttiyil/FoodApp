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
      enum: [
        "North Indian",
        "South Indian",
        "Chinese",
        "Snacks",
        "Street Food",
        "Biryani",
        "Tandoori",
        "Momos",
        "Chaat",
        "Thali",
        "Fast Food",
        "Desserts",
        "Ice Cream",
        "Juices",
        "Tea & Coffee",
        "Burgers",
        "Pizza",
        "Wraps & Rolls",
        "Sandwiches",
        "Salads",
        "Seafood",
        "BBQ & Grill",
        "Vegetarian",
        "Non-Veg",
        "Breakfast",
        "Lunch",
        "Dinner",
        "Cakes & Bakery",
        "Drinks",
        "Sweets",
        "Fried rice",
        "Other",
      ],
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
      default: undefined,
      validate: {
        validator(v) {
          return v === undefined || v <= this.price;
        },
        message: "Offer price must be less than or equal to the original price",
      },
    },
    description: {
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
      set: (arr) => arr.map((s) => s.trim()), // Trims URLs safely
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
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Ensure `inStock` stays in sync during save and update operations
function updateInStock(doc) {
  if (doc && typeof doc.stock === "number") {
    doc.inStock = doc.stock > 0;
  }
}

productSchema.pre("save", function (next) {
  updateInStock(this);
  next();
});

productSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();
  if (update && Object.prototype.hasOwnProperty.call(update, "stock")) {
    update.inStock = update.stock > 0;
  }
  next();
});

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
