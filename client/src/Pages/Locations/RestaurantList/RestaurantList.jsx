import { useState, useEffect } from "react";
import axios from "axios";
import { FaStar, FaRegStarHalf } from "react-icons/fa";
import FilterModal from "../RestaurantList/FilterModal";

const filters = [
  { label: "Nearest", value: "nearest" },
  { label: "Fast Delivery", value: "fast" },
  { label: "Top Rated", value: "rating" },
  { label: "Pure Veg", value: "veg" },
  { label: "Offers", value: "offers" },
];

const RestaurantList = ({ selectedCategory }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [originalRestaurants, setOriginalRestaurants] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
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

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return parseFloat((R * c).toFixed(1));
  };

  useEffect(() => {
    console.log(originalRestaurants);
    const fetchRestaurants = async () => {
      try {
        const res = await axios.get("/api/restaurant/getAll");
        setOriginalRestaurants(res.data);
      } catch (err) {
        console.error("Failed to fetch restaurants:", err);
      }
    };

    fetchRestaurants();
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => console.error("Error getting location:", error)
      );
    }
  }, []);

  useEffect(() => {
    if (originalRestaurants.length > 0) {
      let updated = [...originalRestaurants];

      if (userLocation) {
        updated = updated.map((r) => ({
          ...r,
          latitude: r.latitude || 0,
          longitude: r.longitude || 0,
          distance:
            r.latitude && r.longitude
              ? calculateDistance(
                  userLocation.lat,
                  userLocation.lng,
                  r.latitude,
                  r.longitude
                )
              : null,
        }));
      }

      setRestaurants(updated);
    }
  }, [originalRestaurants, userLocation]);

  useEffect(() => {
    if (selectedCategory && selectedCategory !== "All") {
      const target = document.getElementById("restaurent");
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [selectedCategory]);

  const applyCustomFilters = () => {
    let filtered = [...originalRestaurants];

    if (userLocation) {
      filtered = filtered.map((r) => ({
        ...r,
        distance:
          r.latitude && r.longitude
            ? calculateDistance(
                userLocation.lat,
                userLocation.lng,
                r.latitude,
                r.longitude
              )
            : null,
      }));
    }

    if (customFilters.sortBy === "distance" && userLocation) {
      filtered.sort((a, b) => a.distance - b.distance);
    }

    if (customFilters.sortBy === "deliveryTime") {
      filtered = filtered
        .filter((r) => /\d+/.test(r.duration))
        .sort((a, b) => parseInt(a.duration) - parseInt(b.duration));
    }

    if (customFilters.sortBy === "rating") {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    if (customFilters.rating > 0) {
      filtered = filtered.filter((r) => r.rating >= customFilters.rating);
    }

    if (customFilters.distance > 0 && userLocation) {
      filtered = filtered.filter((r) => r.distance <= customFilters.distance);
    }

    if (customFilters.happyHours) {
      filtered = filtered.filter((r) => r.happyHours);
    }

    if (customFilters.drinksNight) {
      filtered = filtered.filter((r) => r.drinksNight);
    }

    setRestaurants(filtered);
    setCustomFilterActive(true);
    setActiveFilter(null);
  };

  const handleFilterClick = (value) => {
    setCustomFilterActive(false);
    setActiveFilter(value === activeFilter ? null : value);
  };

  let filteredRestaurants = [...restaurants];

  if (selectedCategory && selectedCategory.toLowerCase() !== "all") {
    filteredRestaurants = filteredRestaurants.filter(
      (r) =>
        r.category &&
        r.category.toLowerCase() === selectedCategory.toLowerCase()
    );
  }

  if (activeFilter && !customFilterActive) {
    switch (activeFilter) {
      case "nearest":
        filteredRestaurants = filteredRestaurants
          .filter((r) => typeof r.distance === "number")
          .sort((a, b) => a.distance - b.distance);
        break;
      case "fast":
        filteredRestaurants = filteredRestaurants
          .filter((r) => /\d+/.test(r.duration))
          .sort((a, b) => parseInt(a.duration) - parseInt(b.duration));
        break;
      case "rating":
        filteredRestaurants = filteredRestaurants.sort(
          (a, b) => b.rating - a.rating
        );
        break;
      case "veg":
        filteredRestaurants = filteredRestaurants.filter(
          (r) =>
            r.category &&
            (r.category.toLowerCase().includes("veg") ||
              r.category.toLowerCase() === "vegetarian")
        );
        break;
      case "offers":
        filteredRestaurants = filteredRestaurants.filter((r) => r.hasOffer);
        break;
      default:
        break;
    }
  }

  return (
    <div id="restaurent" className="px-4 py-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-8">
        Restaurants Near You
      </h2>

      <div className="flex overflow-x-auto gap-3 mb-6 scrollbar-hide">
        <button
          className="whitespace-nowrap px-4 py-2 text-sm font-semibold rounded-full bg-orange-500 text-white"
          onClick={() => setIsModalOpen(true)}
        >
          Filter
        </button>

        {filters.map((filter) => (
          <button
            key={filter.value}
            className={`whitespace-nowrap px-4 py-2 text-sm font-semibold rounded-full transition ${
              activeFilter === filter.value
                ? "bg-orange-500 text-white"
                : "bg-white border border-orange-300 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => handleFilterClick(filter.value)}
          >
            {filter.label}
          </button>
        ))}
      </div>

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

      <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-1 gap-6">
        {filteredRestaurants.length > 0 ? (
          filteredRestaurants.map((restaurant) => (
            <div
              key={restaurant._id}
              className="bg-white shadow-md rounded-xl overflow-hidden transition transform hover:scale-105 hover:shadow-2xl duration-300"
            >
              <div className="relative">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-44 object-cover rounded-t-xl"
                />
                <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                  {restaurant.category || "Restaurant"}
                </span>
                {restaurant.hasOffer && (
                  <span className="absolute top-2 right-2 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                    Offer Available
                  </span>
                )}
              </div>

              <div className="p-4 text-center space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">
                  {restaurant.name}
                </h3>
                <p className="text-gray-500 text-sm">
                  {restaurant.location?.address}, {restaurant.location?.city}
                </p>

                {userLocation && restaurant.distance && (
                  <p className="text-gray-600 text-sm">
                    📍 {restaurant.distance} km
                  </p>
                )}

                <div className="flex items-center justify-between mt-3 text-gray-700 text-sm">
                  <span className="flex items-center">
                    ⏳ {restaurant.duration || "N/A"}
                  </span>

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
