import Order from "../models/Order.js";
import Restaurant from "../models/Restaurant.js";
import Product from "../models/Product.js";
import Address from "../models/Address.js";

// ===================== PLACE ORDER - COD =====================
export const placeOrderCOD = async (req, res) => {
  try {
    const userId = req.user._id;
    const { items, addressId, notes } = req.body;

    // Validate items
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No items provided." });
    }

    // Validate address
    const address = await Address.findOne({ _id: addressId, user: userId });
    if (!address) {
      return res
        .status(404)
        .json({ success: false, message: "Address not found." });
    }

    // Fetch all products at once (reduce repeated DB calls)
    const productIds = items.map((item) => item.productId);
    const products = await Product.find({ _id: { $in: productIds } });

    if (products.length !== productIds.length) {
      return res
        .status(404)
        .json({ success: false, message: "One or more products not found." });
    }

    // Ensure all products are from the same restaurant
    const restaurantIds = new Set(products.map((p) => p.restaurant.toString()));
    if (restaurantIds.size > 1) {
      return res.status(400).json({
        success: false,
        message: "Order must contain items from one restaurant only.",
      });
    }

    const restaurantId = products[0].restaurant;

    let subtotal = 0;
    const orderItems = [];

    for (const item of items) {
      const product = products.find((p) => p._id.toString() === item.productId);
      const quantity = item.quantity > 0 ? item.quantity : 1;
      const price = product.price;
      const offerPrice = product.offerPrice || price;

      subtotal += offerPrice * quantity;

      orderItems.push({
        product: product._id,
        quantity,
        price,
        offerPrice,
      });
    }

    const tax = +(subtotal * 0.02).toFixed(2);
    const totalAmount = +(subtotal + tax).toFixed(2);

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
      notes,
    });

    await newOrder.save();

    return res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order: newOrder,
    });
  } catch (error) {
    console.error("Order placement error:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Server error placing order." });
  }
};

// export const placeOrderStripe = async (req, res) => {
//   try {
//     const userId = req.user._id;
//     const { items, addressId, notes } = req.body;

//     // Validate items
//     if (!items || !Array.isArray(items) || items.length === 0) {
//       return res
//         .status(400)
//         .json({ success: false, message: "No items provided." });
//     }

//     // Validate address
//     const address = await Address.findOne({ _id: addressId, user: userId });
//     if (!address) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Address not found." });
//     }

//     // Fetch all products at once (reduce repeated DB calls)
//     const productIds = items.map((item) => item.productId);
//     const products = await Product.find({ _id: { $in: productIds } });

//     if (products.length !== productIds.length) {
//       return res
//         .status(404)
//         .json({ success: false, message: "One or more products not found." });
//     }

//     // Ensure all products are from the same restaurant
//     const restaurantIds = new Set(products.map((p) => p.restaurant.toString()));
//     if (restaurantIds.size > 1) {
//       return res.status(400).json({
//         success: false,
//         message: "Order must contain items from one restaurant only.",
//       });
//     }

//     const restaurantId = products[0].restaurant;

//     let subtotal = 0;
//     const orderItems = [];

//     for (const item of items) {
//       const product = products.find((p) => p._id.toString() === item.productId);
//       const quantity = item.quantity > 0 ? item.quantity : 1;
//       const price = product.price;
//       const offerPrice = product.offerPrice || price;

//       subtotal += offerPrice * quantity;

//       orderItems.push({
//         product: product._id,
//         quantity,
//         price,
//         offerPrice,
//       });
//     }

//     const tax = +(subtotal * 0.02).toFixed(2);
//     const totalAmount = +(subtotal + tax).toFixed(2);

//     const newOrder = new Order({
//       user: userId,
//       restaurant: restaurantId,
//       items: orderItems,
//       shippingAddress: addressId,
//       totalAmount,
//       paymentMethod: "COD",
//       paymentStatus: "pending",
//       isPaid: false,
//       orderStatus: "placed",
//       notes,
//     });

//     await newOrder.save();

//     return res.status(201).json({
//       success: true,
//       message: "Order placed successfully",
//       order: newOrder,
//     });
//   } catch (error) {
//     console.error("Order placement error:", error.message);
//     res
//       .status(500)
//       .json({ success: false, message: "Server error placing order." });
//   }
// };

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

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Get user orders error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch user orders.",
    });
  }
};

// ===================== GET ALL ORDERS (ADMIN) =====================
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

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Get all orders error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch all orders.",
    });
  }
};
