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
    if (!req.seller || !req.seller._id) {
      return res.status(403).json({ message: "Unauthorized: seller required" });
    }

    const restaurants = await Restaurant.find({
      owner: req.seller._id,
      isActive: true,
    }).select("name location image rating totalReviews");

    res.status(200).json(restaurants);
  } catch (err) {
    console.error("Error fetching seller's restaurants:", err);
    res.status(500).json({ message: "Failed to fetch seller's restaurants" });
  }
};
