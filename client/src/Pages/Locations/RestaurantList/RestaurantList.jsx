import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { FaStar, FaRegStarHalf } from "react-icons/fa";
import FilterModal from "../RestaurantList/FilterModal";

const filters = [
  { label: "Nearest", value: "nearest" },
  { label: "Fast Delivery", value: "fast" },
  { label: "Top Rated", value: "rating" },
  { label: "Pure Veg", value: "veg" },
  { label: "Offers", value: "offers" },
];

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const toRad = (v) => (v * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return parseFloat(
    (R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))).toFixed(1)
  );
};

const RestaurantList = ({ selectedCategory }) => {
  const [originalRestaurants, setOriginalRestaurants] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [activeFilter, setActiveFilter] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customFilterActive, setCustomFilterActive] = useState(false);
  const [customFilters, setCustomFilters] = useState({
    sortBy: "none",
    rating: 0,
    distance: 0,
    happyHours: false,
    drinksNight: false,
  });

  // Fetch restaurants
  useEffect(() => {
    axios
      .get("/api/restaurant/getAll")
      .then((res) => setOriginalRestaurants(res.data))
      .catch((err) => console.error("Failed to fetch restaurants:", err));
  }, []);

  // Get user location
  useEffect(() => {
    navigator.geolocation?.getCurrentPosition(
      (pos) =>
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        }),
      () => setLocationError("Location access denied or unavailable.")
    );
  }, []);

  // Add distance to restaurants
  const restaurantsWithDistance = useMemo(() => {
    if (!userLocation) return originalRestaurants;
    return originalRestaurants.map((r) => ({
      ...r,
      distance: r.location?.latitude
        ? calculateDistance(
            userLocation.lat,
            userLocation.lng,
            r.location.latitude,
            r.location.longitude
          )
        : null,
    }));
  }, [originalRestaurants, userLocation]);

  // Scroll to view if category is selected
  useEffect(() => {
    if (selectedCategory && selectedCategory !== "All") {
      document
        .getElementById("restaurent")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedCategory]);

  // Apply custom filters
  const applyCustomFilters = () => {
    let filtered = [...restaurantsWithDistance];
    const { sortBy, rating, distance, happyHours, drinksNight } = customFilters;

    if (sortBy === "distance" && userLocation) {
      filtered.sort((a, b) => a.distance - b.distance);
    } else if (sortBy === "deliveryTime") {
      filtered = filtered
        .filter((r) => /\d+/.test(r.duration))
        .sort((a, b) => parseInt(a.duration) - parseInt(b.duration));
    } else if (sortBy === "rating") {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    if (rating > 0) filtered = filtered.filter((r) => r.rating >= rating);
    if (distance > 0) filtered = filtered.filter((r) => r.distance <= distance);
    if (happyHours) filtered = filtered.filter((r) => r.happyHours);
    if (drinksNight) filtered = filtered.filter((r) => r.drinksNight);

    setCustomFilterActive(true);
    setActiveFilter(null);
    return filtered;
  };

  // Filter based on default chips
  const filteredRestaurants = useMemo(() => {
    let list = [...restaurantsWithDistance];

    if (selectedCategory && selectedCategory !== "All") {
      list = list.filter((r) =>
        r.categories?.some(
          (cat) => cat?.name?.toLowerCase() === selectedCategory.toLowerCase()
        )
      );
    }

    if (customFilterActive) return applyCustomFilters();

    if (activeFilter) {
      switch (activeFilter) {
        case "nearest":
          list = list
            .filter((r) => typeof r.distance === "number")
            .sort((a, b) => a.distance - b.distance);
          break;
        case "fast":
          list = list
            .filter((r) => /\d+/.test(r.duration))
            .sort((a, b) => parseInt(a.duration) - parseInt(b.duration));
          break;
        case "rating":
          list.sort((a, b) => b.rating - a.rating);
          break;
        case "veg":
          list = list.filter((r) =>
            r.categories?.some((cat) =>
              cat?.name?.toLowerCase().includes("veg")
            )
          );
          break;
        case "offers":
          list = list.filter((r) => r.hasOffer);
          break;
      }
    }

    return list;
  }, [
    restaurantsWithDistance,
    selectedCategory,
    activeFilter,
    customFilterActive,
    customFilters,
  ]);

  return (
    <div id="restaurent" className="px-4 py-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Restaurants Near You
      </h2>

      {locationError && (
        <p className="text-red-600 text-sm mb-4">⚠️ {locationError}</p>
      )}

      {/* Filter buttons */}
      <div className="flex overflow-x-auto gap-3 mb-6 scrollbar-hide">
        <button
          className="whitespace-nowrap px-4 py-2 text-sm font-semibold rounded-full bg-orange-500 text-white"
          onClick={() => setIsModalOpen(true)}
        >
          Filter
        </button>

        {filters.map(({ label, value }) => (
          <button
            key={value}
            className={`whitespace-nowrap px-4 py-2 text-sm font-semibold rounded-full transition ${
              activeFilter === value
                ? "bg-orange-500 text-white"
                : "bg-white border border-orange-300 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => {
              setCustomFilterActive(false);
              setActiveFilter(activeFilter === value ? null : value);
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Modal */}
      <FilterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onApply={() => {
          setIsModalOpen(false);
          applyCustomFilters();
        }}
        filters={customFilters}
        setFilters={setCustomFilters}
      />

      {/* Grid */}
      <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-1 gap-6">
        {filteredRestaurants.length ? (
          filteredRestaurants.map((r) => (
            <div
              key={r._id}
              className="bg-white shadow-md rounded-xl overflow-hidden hover:scale-105 hover:shadow-2xl transition duration-300"
            >
              <div className="relative">
                <img
                  src={r.image}
                  alt={r.name}
                  className="w-full h-44 object-cover rounded-t-xl"
                />
                <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                  {r.categories?.map((cat) => (
                    <span
                      key={cat._id}
                      className="bg-orange-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full shadow"
                    >
                      {cat.name}
                    </span>
                  ))}
                </div>
                {r.hasOffer && (
                  <span className="absolute top-2 right-2 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                    Offer Available
                  </span>
                )}
              </div>

              <div className="p-4 text-center space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">
                  {r.name}
                </h3>
                <p className="text-gray-500 text-sm">
                  {r.location?.address}, {r.location?.city}
                </p>
                {r.distance && (
                  <p className="text-gray-600 text-sm">📍 {r.distance} km</p>
                )}
                <div className="flex items-center justify-between mt-3 text-gray-700 text-sm">
                  <span className="flex items-center">
                    ⏳ {r.duration || "N/A"}
                  </span>
                  <div className="flex items-center text-yellow-500">
                    {Array.from({ length: 5 }).map((_, i) => {
                      const filled = i + 1 <= Math.floor(r.rating);
                      const half = r.rating - i > 0 && r.rating - i < 1;
                      return filled ? (
                        <FaStar key={i} />
                      ) : half ? (
                        <FaRegStarHalf key={i} />
                      ) : (
                        <FaStar key={i} className="text-gray-300" />
                      );
                    })}
                    <span className="ml-1 font-semibold text-gray-700">
                      {r.rating}
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

RestaurantList.propTypes = {
  selectedCategory: PropTypes.string,
};

export default RestaurantList;
