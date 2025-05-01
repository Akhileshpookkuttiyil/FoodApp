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
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={`star-${i}`} className="text-yellow-500" />
        ))}
        {halfStar && <FaRegStarHalf className="text-yellow-500" />}
        <span className="ml-2 text-gray-600 text-sm">({rating})</span>
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
    <div className="min-h-screen px-4 py-6 md:px-10 bg-gray-50">
      {/* Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 shadow-md rounded-xl mb-8">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <div className="flex items-center gap-4">
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
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {isLoading ? (
          <div className="col-span-full flex justify-center items-center text-gray-500 text-lg py-20">
            Loading...
          </div>
        ) : filteredItems.length ? (
          filteredItems.map((item) => {
            const count = cart[item.id] || 0;
            return (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-sm border hover:shadow-lg transition-transform duration-300 hover:scale-[1.02] flex flex-col justify-between"
              >
                <div className="p-4 flex flex-col justify-between h-full">
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Text */}
                    <div className="flex flex-col justify-between flex-1">
                      <div>
                        <h2 className="text-lg font-semibold text-gray-800">
                          {item.name}
                        </h2>
                        <p className="text-sm text-gray-500 mt-0.5">
                          {item.hotel}
                        </p>
                      </div>
                      <div className="mt-3">{renderStars(item.rating)}</div>
                      <p className="text-xs text-gray-400 mt-2">
                        Delivery: {item.deliveryTime} mins
                      </p>
                    </div>

                    {/* Image */}
                    <div className="w-28 h-28 sm:w-32 sm:h-32 flex-shrink-0">
                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-full h-full object-cover rounded-md"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  {/* Cart Controls */}
                  <div className="mt-5">
                    {count === 0 ? (
                      <div className="flex items-center justify-between">
                        <div className="font-bold text-lg text-gray-900">
                          ₹{item.price}
                        </div>
                        <button
                          className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md text-sm transition duration-200"
                          onClick={() => handleAddToCart(item.id)}
                        >
                          <FaShoppingCart size={16} />
                          Add to Cart
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between gap-4 bg-orange-100 border border-orange-300 rounded-md py-2 px-4 w-[80%] mx-auto mt-2">
                        <button
                          onClick={() => handleDecrease(item.id)}
                          className="text-orange-600 font-bold hover:text-orange-800 text-lg"
                        >
                          −
                        </button>
                        <span className="text-sm font-semibold text-gray-800">
                          {count}
                        </span>
                        <button
                          onClick={() => handleIncrease(item.id)}
                          className="text-orange-600 font-bold hover:text-orange-800 text-lg"
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
          <div className="col-span-full flex flex-col justify-center items-center py-20">
            <img
              src={noResultsImg}
              alt="No results"
              className="w-full max-w-md h-auto mb-6"
              loading="lazy"
            />
            <p className="text-gray-500 text-lg font-medium">
              No items match your filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuGrid;
