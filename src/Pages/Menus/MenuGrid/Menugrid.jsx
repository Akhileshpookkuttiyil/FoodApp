import { useState, useEffect, useMemo } from "react";
import SearchBar from "../SearchBar/SearchBar";
import SortDropdown from "../SortDropdown/SortDropdown";
import FilterButton from "../FilterButton/FilterButton";
import FilterDialog from "../FilterDialog";
import { FaStar, FaRegStarHalf, FaShoppingCart } from "react-icons/fa";
import noResultsImg from "../../../assets/img/Noimg.gif";

const MenuGrid = ({ items }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [priceRange, setPriceRange] = useState(1000);
  const [minRating, setMinRating] = useState(3);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [cart, setCart] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const filteredItems = useMemo(() => {
    return items
      .filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter((item) => item.price <= priceRange)
      .filter((item) => item.rating >= minRating)
      .sort((a, b) => {
        if (sortBy === "lowToHigh") return a.price - b.price;
        if (sortBy === "highToLow") return b.price - a.price;
        return a.name.localeCompare(b.name);
      });
  }, [items, searchTerm, priceRange, minRating, sortBy]);

  useEffect(() => {
    setIsLoading(true);
    const timeout = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timeout);
  }, [filteredItems]);

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    return (
      <div className="flex items-center text-yellow-500">
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={`star-${i}`} />
        ))}
        {halfStar && <FaRegStarHalf />}
        <span className="ml-2 text-sm text-gray-500">({rating})</span>
      </div>
    );
  };

  const handleAddToCart = (itemId) => {
    setCart((prev) => ({ ...prev, [itemId]: 1 }));
  };

  const handleIncrease = (itemId) => {
    setCart((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
  };

  const handleDecrease = (itemId) => {
    setCart((prev) => {
      const updatedCount = (prev[itemId] || 0) - 1;
      if (updatedCount <= 0) {
        const newCart = { ...prev };
        delete newCart[itemId];
        return newCart;
      }
      return { ...prev, [itemId]: updatedCount };
    });
  };

  return (
    <div className="min-h-screen p-6 bg-white">
      {/* Controls */}
      <div className="flex flex-col md:flex-row items-center gap-4 bg-white p-4 shadow-md rounded-md mb-6">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <div className="flex items-center space-x-2">
          <SortDropdown sortBy={sortBy} setSortBy={setSortBy} />
          <FilterButton setIsFilterOpen={setIsFilterOpen} />
        </div>
      </div>

      {/* Filter Dialog */}
      <FilterDialog
        isFilterOpen={isFilterOpen}
        setIsFilterOpen={setIsFilterOpen}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        minRating={minRating}
        setMinRating={setMinRating}
      />

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4 px-4 mt-10">
        {isLoading ? (
          <div className="col-span-full flex justify-center items-center text-gray-500 text-lg py-12">
            Loading...
          </div>
        ) : filteredItems.length > 0 ? (
          filteredItems.map((item) => {
            const count = cart[item.id] || 0;
            return (
              <div
                key={item.id}
                className="bg-white p-4 shadow-lg rounded-lg w-full text-center border transform transition-transform duration-300 hover:scale-105 hover:shadow-xl flex flex-col items-center justify-between"
              >
                <img
                  src={item.img}
                  alt={item.name}
                  onError={(e) =>
                    (e.target.src = "/assets/img/default-image.png")
                  }
                  className="w-full h-36 object-contain rounded-md mb-3"
                  loading="lazy"
                />

                <h2 className="text-lg font-semibold text-gray-800">
                  {item.name}
                </h2>
                <p className="text-sm text-gray-500">{item.hotel}</p>
                <div className="mt-2">{renderStars(item.rating)}</div>
                <p className="text-sm text-gray-500 mt-1">
                  Delivery: {item.deliveryTime} mins
                </p>

                {/* Cart Controls */}
                <div className="mt-4 w-full">
                  <div className="flex justify-between items-center w-full">
                    <div className="text-lg font-bold text-gray-800">
                      ₹{item.price}
                    </div>

                    {count === 0 ? (
                      <button
                        className="flex items-center gap-2 text-white bg-orange-400 hover:bg-orange-500 rounded-md px-3 py-2 transition font-medium"
                        onClick={() => handleAddToCart(item.id)}
                      >
                        <FaShoppingCart size={18} />
                        <span>Add</span>
                      </button>
                    ) : (
                      <div className="flex items-center gap-4 bg-orange-100 border border-orange-300 rounded-md py-2 px-4 w-fit select-none">
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
          })
        ) : (
          <div className="text-center col-span-full flex justify-center items-center">
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
