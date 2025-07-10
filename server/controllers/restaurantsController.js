import Restaurant from "../models/Restaurant.js";

//Get all active restaurants
export const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find({ isActive: true }).select(
      "name location image rating totalReviews"
    );

    res.status(200).json(restaurants);
  } catch (err) {
    console.error("Error fetching restaurants:", err);
    res.status(500).json({ message: "Failed to fetch restaurants" });
  }
};

//Get restaurants owned by the logged-in seller
export const getRestaurantByUser = async (req, res) => {
  try {
    const sellerId = req?.seller?._id;

    if (!sellerId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized: Seller authentication required",
      });
    }

    const restaurants = await Restaurant.find({
      owner: sellerId,
      isActive: true,
    }).select("name location image rating totalReviews");

    res.status(200).json({
      success: true,
      count: restaurants.length,
      data: restaurants,
    });
  } catch (err) {
    console.error("Error fetching seller's restaurants:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch seller's restaurants",
    });
  }
};
