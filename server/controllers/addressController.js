import Address from "../models/Address.js";

// ===================== ADD ADDRESS =====================
export const addAddress = async (req, res) => {
  try {
    const userId = req.user._id;
    const addressData = req.body;

    // Basic validation
    if (!addressData || Object.keys(addressData).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Address data is required.",
      });
    }

    // Create and associate address with the user
    const newAddress = await Address.create({ ...addressData, user: userId });

    res.status(201).json({
      success: true,
      message: "Address added successfully.",
      data: newAddress,
    });
  } catch (error) {
    console.error("➤ Add Address Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to add address. Please try again later.",
    });
  }
};

// ===================== GET USER'S ADDRESSES =====================
export const getAddresses = async (req, res) => {
  try {
    const userId = req.user._id;

    const addresses = await Address.find({ user: userId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: addresses,
    });
  } catch (error) {
    console.error("➤ Get Addresses Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch addresses. Please try again later.",
    });
  }
};
