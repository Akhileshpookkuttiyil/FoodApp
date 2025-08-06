import { useState, useEffect, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart, FaHotel } from "react-icons/fa";

import SearchBar from "../SearchBar/SearchBar";
import SortDropdown from "../SortDropdown/SortDropdown";
import FilterButton from "../FilterButton/FilterButton";
import FilterDialog from "../FilterDialog";
import StarRating from "../../StarRating";

import { useAppContext } from "../../../Context/AppContext";
import noResultsImg from "../../../assets/img/Noimg.gif";

const MenuGrid = ({ items }) => {
  const navigate = useNavigate();
  const { user, addToCart, updateItemQuantity, cartItems } = useAppContext();

  const [inputTerm, setInputTerm] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [priceRange, setPriceRange] = useState(1000);
  const [minRating, setMinRating] = useState(0);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Debounce search input
  useEffect(() => {
    const timeout = setTimeout(() => setSearchTerm(inputTerm), 300);
    return () => clearTimeout(timeout);
  }, [inputTerm]);

  // Filter and sort items
  const filteredItems = useMemo(() => {
    return items
      .filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter((item) => item.price <= priceRange && item.rating >= minRating)
      .sort((a, b) => {
        if (sortBy === "lowToHigh") return a.price - b.price;
        if (sortBy === "highToLow") return b.price - a.price;
        return a.name.localeCompare(b.name);
      });
  }, [items, searchTerm, priceRange, minRating, sortBy]);

  const handleAddToCart = useCallback(
    (item) => {
      addToCart(item, 1);
    },
    [addToCart]
  );

  const handleIncrease = useCallback(
    (itemId) => {
      updateItemQuantity(itemId, 1);
    },
    [updateItemQuantity]
  );

  const handleDecrease = useCallback(
    (itemId) => {
      updateItemQuantity(itemId, -1);
    },
    [updateItemQuantity]
  );

  const renderCard = (item) => {
    const cartItem = user && cartItems.find((ci) => ci.id === item.id);
    const count = cartItem?.qty || 0;

    return (
      <div
        key={item.id}
        className="bg-white p-4 shadow-lg rounded-lg w-full text-center border transform transition-transform duration-300 hover:scale-105 hover:shadow-xl flex flex-col items-center justify-between"
      >
        {/* Clickable Product */}
        <div
          onClick={() => navigate(`/menu/${item.id}`)}
          className="flex flex-col items-center cursor-pointer p-3"
        >
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            onError={(e) => (e.target.src = "/assets/img/default-image.png")}
            className="w-full h-36 object-contain rounded-md mb-3"
          />
          <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
          <p className="text-sm text-gray-500 flex items-center justify-center gap-1">
            <FaHotel className="text-orange-400 text-xs" />
            <span>{item.hotel}</span>
          </p>
          <div className="mt-2">
            <StarRating rating={item.rating} />
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Delivery: {item.deliveryTime} mins
          </p>
        </div>

        {/* Cart Action */}
        <div className="mt-4 w-full">
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-gray-800">
              ₹{item.offerPrice}
            </span>
            {count === 0 ? (
              <button
                className="flex items-center gap-2 text-white bg-orange-400 hover:bg-orange-500 rounded-md px-3 py-2 transition font-medium"
                onClick={() => handleAddToCart(item)}
              >
                <FaShoppingCart size={18} />
                Add
              </button>
            ) : (
              <div className="flex items-center gap-4 bg-orange-100 border border-orange-300 rounded-md py-2 px-4">
                <button
                  onClick={() => handleDecrease(item.id)}
                  className="text-orange-600 font-bold hover:text-orange-800 text-xl"
                >
                  −
                </button>
                <span className="text-sm font-medium text-gray-800">
                  {count}
                </span>
                <button
                  onClick={() => handleIncrease(item.id)}
                  className="text-orange-600 font-bold hover:text-orange-800 text-xl"
                >
                  +
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen p-6 bg-white">
      {/* Top Filters */}
      <div className="flex flex-col md:flex-row items-center gap-4 bg-white p-4 shadow-md rounded-md mb-6">
        <SearchBar searchTerm={inputTerm} setSearchTerm={setInputTerm} />
        <div className="flex items-center space-x-2">
          <SortDropdown sortBy={sortBy} setSortBy={setSortBy} />
          <FilterButton setIsFilterOpen={setIsFilterOpen} />
        </div>
      </div>

      {/* Filter Modal */}
      <FilterDialog
        isFilterOpen={isFilterOpen}
        setIsFilterOpen={setIsFilterOpen}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        minRating={minRating}
        setMinRating={setMinRating}
      />

      {/* Menu Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 px-4 mt-10">
        {filteredItems.length > 0 ? (
          filteredItems.map(renderCard)
        ) : (
          <div className="col-span-full flex justify-center items-center">
            <img
              src={noResultsImg}
              alt="No results"
              className="w-full max-w-[500px] h-auto"
              loading="lazy"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuGrid;

MenuGrid.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      hotel: PropTypes.string.isRequired,
      image: PropTypes.string,
      price: PropTypes.number.isRequired,
      offerPrice: PropTypes.number.isRequired,
      rating: PropTypes.number.isRequired,
      deliveryTime: PropTypes.number.isRequired,
      category: PropTypes.string,
    })
  ).isRequired,
};
