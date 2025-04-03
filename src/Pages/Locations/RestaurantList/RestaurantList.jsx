import { useState, useEffect } from "react";
import { FaStar, FaRegStarHalf } from "react-icons/fa";
import restaurantsData from "./restaurantsData";

// Swiggy-like Filter Options
const filters = [
  { label: "Nearest", value: "nearest" },
  { label: "Fast Delivery", value: "fast" },
  { label: "Top Rated", value: "rating" },
  { label: "Pure Veg", value: "veg" },
  { label: "Offers", value: "offers" },
];

const RestaurantList = ({ selectedCategory }) => {
  const [activeFilter, setActiveFilter] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [restaurants, setRestaurants] = useState(restaurantsData);

  // Get User Location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) =>
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }),
        (error) => console.error("Error getting location:", error)
      );
    }
  }, []);

  // Function to calculate distance using Haversine Formula
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371; // Earth radius in km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (R * c).toFixed(1); // Returns distance in km
  };

  // Update restaurant distances when userLocation changes
  useEffect(() => {
    if (userLocation) {
      setRestaurants(
        restaurantsData.map((restaurant) => ({
          ...restaurant,
          distance: calculateDistance(
            userLocation.lat,
            userLocation.lng,
            restaurant.latitude,
            restaurant.longitude
          ),
        }))
      );
    }
  }, [userLocation]);

  // Filter restaurants based on category
  let filteredRestaurants =
    !selectedCategory || selectedCategory.toLowerCase() === "all"
      ? restaurants
      : restaurants.filter(
          (restaurant) =>
            restaurant.category.toLowerCase() === selectedCategory.toLowerCase()
        );

  // Apply Filters
  if (activeFilter) {
    switch (activeFilter) {
      case "nearest":
        filteredRestaurants = [...filteredRestaurants].sort(
          (a, b) => a.distance - b.distance
        );
        break;
      case "fast":
        filteredRestaurants = [...filteredRestaurants]
          .filter((r) => r.duration.includes("min"))
          .sort((a, b) => parseInt(a.duration) - parseInt(b.duration));
        break;
      case "rating":
        filteredRestaurants = [...filteredRestaurants].sort(
          (a, b) => b.rating - a.rating
        );
        break;
      case "veg":
        filteredRestaurants = filteredRestaurants.filter((r) => r.isVeg);
        break;
      case "offers":
        filteredRestaurants = filteredRestaurants.filter((r) => r.hasOffer);
        break;
      default:
        break;
    }
  }

  return (
    <div className="px-4 py-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-8">
        Restaurants Near You
      </h2>

      {/* Filters */}
      <div className="flex overflow-x-auto gap-3 mb-6 scrollbar-hide">
        {/* "Filter" Button (Clears All Filters) */}
        <button
          className={`whitespace-nowrap px-4 py-2 text-sm font-semibold rounded-full transition ${
            activeFilter
              ? "bg-orange-500 text-white"
              : "bg-white border border-orange-300 text-gray-700 hover:bg-gray-200"
          }`}
          onClick={() => setActiveFilter(null)}
        >
          Filter
        </button>

        {/* Other Filter Options */}
        {filters.map((filter) => (
          <button
            key={filter.value}
            className={`whitespace-nowrap px-4 py-2 text-sm font-semibold rounded-full transition ${
              activeFilter === filter.value
                ? "bg-orange-500 text-white"
                : "bg-white border border-orange-300 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() =>
              setActiveFilter(
                activeFilter === filter.value ? null : filter.value
              )
            }
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Restaurants Grid */}
      <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-1 gap-6">
        {filteredRestaurants.length > 0 ? (
          filteredRestaurants.map((restaurant) => (
            <div
              key={restaurant.id}
              className="bg-white shadow-md rounded-xl overflow-hidden transition transform hover:scale-105 hover:shadow-2xl duration-300"
            >
              {/* Image */}
              <div className="relative">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-44 object-cover rounded-t-xl"
                />
                {/* Category Badge */}
                <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                  {restaurant.category}
                </span>
                {/* Offer Badge */}
                {restaurant.hasOffer && (
                  <span className="absolute top-2 right-2 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                    Offer Available
                  </span>
                )}
              </div>

              {/* Details */}
              <div className="p-4 text-center space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">
                  {restaurant.name}
                </h3>
                <p className="text-gray-500 text-sm">
                  {restaurant.fullAddress}
                </p>

                {/* Distance */}
                {userLocation && (
                  <p className="text-gray-600 text-sm">
                    📍 {restaurant.distance} km
                  </p>
                )}

                {/* Duration & Ratings */}
                <div className="flex items-center justify-between mt-3 text-gray-700 text-sm">
                  <span className="flex items-center">
                    ⏳ {restaurant.duration}
                  </span>

                  {/* Star Ratings */}
                  <div className="flex items-center text-yellow-500">
                    {Array.from({ length: 5 }).map((_, index) => {
                      if (index + 1 <= Math.floor(restaurant.rating)) {
                        return <FaStar key={index} />;
                      } else if (restaurant.rating - index > 0) {
                        return <FaRegStarHalf key={index} />;
                      }
                      return <FaStar key={index} className="text-gray-300" />;
                    })}
                    <span className="ml-1 font-semibold text-gray-700">
                      {restaurant.rating}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">
            No restaurants found for this category.
          </p>
        )}
      </div>
    </div>
  );
};

export default RestaurantList;
