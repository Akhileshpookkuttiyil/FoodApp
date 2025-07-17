import { useEffect, useRef, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Category = ({ selectedCategory, setSelectedCategory }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 200, behavior: "smooth" });
  };

  // Fetch categories from backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("/api/category/categories/getcategories");
        if (res.data.success) {
          setCategories(res.data.categories);
        } else {
          console.error("Category fetch failed:", res.data.message);
        }
      } catch (error) {
        console.error("Error loading categories:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="relative w-full">
      {/* Scroll buttons */}
      <div className="absolute -top-7 right-4 flex gap-5">
        <button
          type="button"
          onClick={scrollLeft}
          className="bg-gray-200 shadow-md rounded-full p-2 hover:bg-gray-300 transition active:scale-90"
        >
          <FaArrowLeft className="text-gray-600" size={14} />
        </button>
        <button
          type="button"
          onClick={scrollRight}
          className="bg-gray-200 shadow-md rounded-full p-2 hover:bg-gray-300 transition active:scale-90"
        >
          <FaArrowRight className="text-gray-600" size={14} />
        </button>
      </div>

      {/* Categories */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto px-4 py-6 scrollbar-hide scroll-smooth snap-x"
      >
        {loading ? (
          <div className="text-gray-500">Loading categories...</div>
        ) : categories.length === 0 ? (
          <div className="text-red-500">No categories found.</div>
        ) : (
          categories.map((category) => (
            <button
              key={category.id || category._id}
              type="button"
              onClick={() =>
                setSelectedCategory(
                  selectedCategory === category.name ? "All" : category.name
                )
              }
              className="flex flex-col items-center space-y-2 transition snap-start"
            >
              <div
                className={`w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full shadow-lg flex items-center justify-center border-2 ${
                  selectedCategory === category.name
                    ? "border-red-500"
                    : "border-gray-100 hover:border-gray-400"
                } transition`}
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <span className="text-sm sm:text-base lg:text-lg font-medium text-gray-700">
                {category.name}
              </span>
            </button>
          ))
        )}
      </div>
    </div>
  );
};

// ✅ PropTypes for ESLint compliance
Category.propTypes = {
  selectedCategory: PropTypes.string.isRequired,
  setSelectedCategory: PropTypes.func.isRequired,
};

export default Category;
