import Order from "../models/Order.js";
import Restaurant from "../models/Restaurant.js";
import Product from "../models/Product.js";
import Address from "../models/Address.js";
import stripe from "../utils/stripe.js";
import User from "../models/User.js";
import { response } from "express";

// Utility function to validate order items and compute totals
const prepareOrderDetails = async (items, userId) => {
  if (!items || !Array.isArray(items) || items.length === 0) {
    throw new Error("No items provided.");
  }

  const productIds = items.map((item) => item.productId);
  const products = await Product.find({ _id: { $in: productIds } });

  if (products.length !== productIds.length) {
    throw new Error("One or more products not found.");
  }

  const restaurantIds = new Set(products.map((p) => p.restaurant.toString()));
  if (restaurantIds.size > 1) {
    throw new Error("Order must contain items from one restaurant only.");
  }

  const restaurantId = products[0].restaurant;
  let subtotal = 0;
  const orderItems = [];

  for (const item of items) {
    const product = products.find((p) => p._id.toString() === item.productId);
    const quantity = Math.max(item.quantity, 1);
    const price = product.price;
    const offerPrice = product.offerPrice || price;

    subtotal += offerPrice * quantity;

    orderItems.push({
      product: product._id,
      productName: product.name,
      quantity,
      price,
      offerPrice,
    });
  }

  const tax = +(subtotal * 0.02).toFixed(2);
  const totalAmount = +(subtotal + tax).toFixed(2);

  return { orderItems, totalAmount, restaurantId };
};

// ===================== PLACE ORDER - COD =====================
export const placeOrderCOD = async (req, res) => {
  try {
    const userId = req.user._id;
    const { items, addressId } = req.body;

    const address = await Address.findOne({ _id: addressId, user: userId });
    if (!address) {
      return res
        .status(404)
        .json({ success: false, message: "Address not found." });
    }

    const { orderItems, totalAmount, restaurantId } = await prepareOrderDetails(
      items,
      userId
    );

    const newOrder = new Order({
      user: userId,
      restaurant: restaurantId,
      items: orderItems,
      shippingAddress: addressId,
      totalAmount,
      paymentMethod: "COD",
      paymentStatus: "pending",
      isPaid: false,
      orderStatus: "placed",
    });

    await newOrder.save();

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order: newOrder,
    });
  } catch (error) {
    console.error("Order placement error (COD):", error.message);
    res.status(500).json({
      success: false,
      message: error.message || "Server error placing order.",
    });
  }
};

// ===================== PLACE ORDER - STRIPE =====================
export const placeOrderStripe = async (req, res) => {
  try {
    const { origin } = req.headers;
    const userId = req.user._id;
    const { items, addressId } = req.body;

    const address = await Address.findOne({ _id: addressId, user: userId });
    if (!address) {
      return res
        .status(404)
        .json({ success: false, message: "Address not found." });
    }

    // Get computed order details (including tax and total)
    const { orderItems, totalAmount, restaurantId } = await prepareOrderDetails(
      items,
      userId
    );

    // Save the order first
    const newOrder = new Order({
      user: userId,
      restaurant: restaurantId,
      items: orderItems,
      shippingAddress: addressId,
      totalAmount,
      paymentMethod: "Online",
      paymentStatus: "pending",
      isPaid: false,
      orderStatus: "initiated",
    });

    await newOrder.save();

    // Calculate subtotal and tax again for Stripe line items
    const subtotal = orderItems.reduce(
      (sum, item) => sum + item.offerPrice * item.quantity,
      0
    );
    const tax = +(subtotal * 0.02).toFixed(2); // 2% tax

    // Stripe line items with tax
    const line_items = [
      ...orderItems.map((item) => ({
        price_data: {
          currency: "inr",
          product_data: {
            name: item.productName || "Food Item",
          },
          unit_amount: Math.round(item.offerPrice * 100), // in paise
        },
        quantity: item.quantity,
      })),
      {
        price_data: {
          currency: "inr",
          product_data: {
            name: "Tax (2%)",
          },
          unit_amount: Math.round(tax * 100),
        },
        quantity: 1,
      },
    ];

    //Create Stripe checkout session
    // 1. Create Stripe customer with full address
    const customer = await stripe.customers.create({
      name: address.fullName,
      email: req.user.email,
      address: {
        line1: `${address.houseNumber}, ${address.street}${
          address.landmark ? ", " + address.landmark : ""
        }`,
        city: address.city,
        state: address.state,
        postal_code: address.pincode,
        country: "IN",
      },
    });

    // 2. Pass customer.id in session
    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      line_items,
      mode: "payment",
      success_url: `${origin}/loader?next=orders`,
      cancel_url: `${origin}/cart`,
      metadata: {
        orderId: newOrder._id.toString(),
        userId: userId.toString(),
        restaurantId: restaurantId.toString(),
      },
    });

    res.status(201).json({
      success: true,
      url: session.url,
      orderId: newOrder._id,
    });
  } catch (error) {
    console.error("Stripe order error:", error.message);
    res.status(500).json({
      success: false,
      message: error.message || "Server error placing order.",
    });
  }
};

export const stripeWebhooks = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    console.error("Stripe webhook signature verification failed:", error.message);
    return res.status(400).send(`Webhook Error: ${error.message}`);
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        const { orderId, userId } = session.metadata || {};

        if (!orderId || !userId) {
          console.warn("Missing orderId or userId in metadata.");
          return res.status(400).send("Invalid metadata in session.");
        }

        await Order.findByIdAndUpdate(orderId, {
          isPaid: true,
          paymentStatus: "paid",
          orderStatus: "placed",
        });

        await User.findByIdAndUpdate(userId, {
          cartItems: [],
        });

        console.log(`Order ${orderId} marked as paid and user's cart cleared.`);
        break;
      }

      case "checkout.session.expired":
      case "payment_intent.payment_failed": {
        const session = event.data.object;
        const { orderId } = session.metadata || {};

        if (!orderId) {
          console.warn("No orderId found in metadata for failed or expired session.");
          return res.status(400).send("Missing orderId in failed session.");
        }

        await Order.findByIdAndUpdate(orderId, {
          orderStatus: "cancelled",
          paymentStatus: "failed",
        });

        console.log(`Order ${orderId} marked as cancelled due to payment failure or session expiration.`);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
        break;
    }

    res.status(200).json({ received: true });
  } catch (error) {
    console.error("Error handling Stripe webhook event:", error.message);
    res.status(500).send("Internal Server Error");
  }
};

// ===================== GET USER ORDERS =====================
export const getUserOrders = async (req, res) => {
  try {
    const userId = req.user._id;

    const orders = await Order.find({
      user: userId,
      $or: [{ paymentMethod: "COD" }, { isPaid: true }],
    })
      .populate("restaurant", "name")
      .populate("items.product", "name price offerPrice images")
      .populate("shippingAddress")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Get user orders error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch user orders.",
    });
  }
};

// ===================== GET ALL ORDERS (SELLER/ADMIN) =====================
export const getAllOrders = async (req, res) => {
  try {
    const sellerId = req.seller._id;
    const restaurants = await Restaurant.find({ owner: sellerId }).select(
      "_id"
    );
    const restaurantIds = restaurants.map((r) => r._id);

    const orders = await Order.find({
      restaurant: { $in: restaurantIds },
      $or: [{ paymentMethod: "COD" }, { isPaid: true }],
    })
      .populate("user", "firstName lastName email")
      .populate("items.product", "name price images offerPrice")
      .populate("shippingAddress")
      .populate("restaurant", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Get all orders error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch all orders.",
    });
  }
};
