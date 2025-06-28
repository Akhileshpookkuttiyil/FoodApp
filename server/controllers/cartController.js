import User from "../models/User.js"; 

export const updateCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { cartItems } = req.body;
    console.log({ cartItems });

    if (!Array.isArray(cartItems)) {
      return res.status(400).json({
        success: false,
        message: "Cart items should be an array.",
      });
    }

    for (const item of cartItems) {
      if (
        !item.item ||
        typeof item.quantity !== "number" ||
        item.quantity < 1
      ) {
        return res.status(400).json({
          success: false,
          message: "Each cart item must have a valid item ID and quantity ≥ 1.",
        });
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { cartItems },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    await updatedUser.populate("cartItems.item");

    res.status(200).json({
      success: true,
      message: "Cart updated successfully.",
      cart: updatedUser.cartItems,
    });
  } catch (error) {
    console.error("Update Cart Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to update cart. Please try again.",
    });
  }
};
