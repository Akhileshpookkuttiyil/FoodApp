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
        dish: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Dish",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
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
      enum: ["COD", "Card", "UPI", "NetBanking"],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    orderStatus: {
      type: String,
      enum: [
        "placed",
        "accepted",
        "preparing",
        "on the way",
        "delivered",
        "cancelled",
      ],
      default: "placed",
    },
    deliveredAt: {
      type: Date,
    },
    cancelledAt: {
      type: Date,
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt
  }
);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
export default Order;
