import { useEffect, useRef, useState, useCallback } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import React from "react";

const Category = React.memo(({ selectedCategory, setSelectedCategory }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);

  const fetchCategories = useCallback(async () => {
    try {
      const { data } = await axios.get(
        "/api/category/categories/getcategories"
      );
      if (data.success) setCategories(data.categories);
      else console.error("Category fetch failed:", data.message);
    } catch (err) {
      console.error("Error loading categories:", err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const scroll = useCallback((offset) => {
    scrollRef.current?.scrollBy({ left: offset, behavior: "smooth" });
  }, []);

  if (loading)
    return <p className="text-gray-500 p-4">Loading categories...</p>;
  if (!categories.length)
    return <p className="text-red-500 p-4">No categories found.</p>;

  return (
    <div className="relative w-full">
      {/* Scroll Buttons */}
      <div className="absolute -top-7 right-4 flex gap-5">
        <button
          onClick={() => scroll(-200)}
          className="bg-gray-200 shadow rounded-full p-2 hover:bg-gray-300 active:scale-90 transition"
        >
          <FaArrowLeft size={14} className="text-gray-600" />
        </button>
        <button
          onClick={() => scroll(200)}
          className="bg-gray-200 shadow rounded-full p-2 hover:bg-gray-300 active:scale-90 transition"
        >
          <FaArrowRight size={14} className="text-gray-600" />
        </button>
      </div>

      {/* Categories */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto px-4 py-6 scrollbar-hide scroll-smooth snap-x"
      >
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.name;
          return (
            <button
              key={cat._id || cat.id}
              onClick={() => setSelectedCategory(isSelected ? "All" : cat.name)}
              className="flex flex-col items-center space-y-2 snap-start transition"
            >
              <div
                className={`w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full shadow-lg flex items-center justify-center border-2 ${
                  isSelected
                    ? "border-red-500"
                    : "border-gray-100 hover:border-gray-400"
                } transition`}
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <span className="text-sm sm:text-base lg:text-lg font-medium text-gray-700">
                {cat.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
});

Category.displayName = "Category"; // For memo debug clarity

Category.propTypes = {
  selectedCategory: PropTypes.string.isRequired,
  setSelectedCategory: PropTypes.func.isRequired,
};

export default Category;
