import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        price: {
          type: Number,
          required: true,
          min: 0,
        },
      },
    ],
    shippingAddress: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    paymentMethod: {
      type: String,
      enum: {
        values: ["COD", "Online"],
        message: "{VALUE} is not a supported payment method",
      },
      required: [true, "Payment method is required"],
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    orderStatus: {
      type: String,
      enum: [
        "initiated",
        "placed",
        "accepted",
        "preparing",
        "on the way",
        "delivered",
        "cancelled",
      ],
      default: "initiated",
    },
    deliveredAt: Date,
    cancelledAt: Date,
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

orderSchema.pre("save", function (next) {
  if (this.paymentMethod === "Online" && this.paymentStatus === "paid") {
    this.isPaid = true;
  } else {
    this.isPaid = false;
  }
  next();
});

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
export default Order;
