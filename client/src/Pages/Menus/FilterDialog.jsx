import { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";

const FilterDialog = ({
  isFilterOpen,
  setIsFilterOpen,
  priceRange,
  setPriceRange,
  minRating,
  setMinRating,
}) => {
  useEffect(() => {
    if (isFilterOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";

    return () => (document.body.style.overflow = "auto");
  }, [isFilterOpen]);

  const resetHandler = () => {
    setPriceRange(1000); // Default max price
    setMinRating(0); // Default min rating
    setIsFilterOpen(false); // Close modal
  };

  if (!isFilterOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Background Overlay */}
      <div
        className="absolute inset-0 bg-black/30"
        onClick={() => setIsFilterOpen(false)}
      />

      {/* Modal Panel with Animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative bg-white p-4 rounded-lg shadow-lg w-full max-w-sm"
      >
        {/* Modal Title */}
        <h2 className="text-lg font-semibold mb-4">Filters</h2>

        {/* Max Price Filter */}
        <label className="block text-sm font-medium mb-1">
          Max Price: ₹{priceRange}
        </label>
        <input
          type="range"
          min="100"
          max="1000"
          step="50"
          value={priceRange}
          onChange={(e) => setPriceRange(Number(e.target.value))}
          className="w-full mb-4"
        />

        {/* Minimum Rating Filter */}
        <label className="block text-sm font-medium mb-1">
          Minimum Rating: {minRating}⭐
        </label>
        <input
          type="range"
          min="1"
          max="5"
          step="0.5"
          value={minRating}
          onChange={(e) => setMinRating(Number(e.target.value))}
          className="w-full mb-4"
        />

        {/* Action Buttons */}
        <div className="space-y-2">
          <button
            onClick={() => setIsFilterOpen(false)}
            className="w-full p-2 bg-orange-500 text-white rounded-md text-sm"
          >
            Apply Filter
          </button>

          <button
            onClick={resetHandler}
            className="w-full p-2 bg-gray-200 text-gray-800 rounded-md text-sm"
          >
            Reset Filter
          </button>
        </div>
      </motion.div>
    </div>,
    document.body // Portal to body
  );
};

export default FilterDialog;
