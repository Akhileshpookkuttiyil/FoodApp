import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import categoriesData from "./categoriesData";
import { useRef } from "react";

const Category = ({ selectedCategory, setSelectedCategory }) => {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full">
      {/* Navigation Buttons */}
      <div className="absolute -top-7 right-4 flex gap-5">
        <button
          className="bg-gray-200 shadow-md rounded-full p-2 hover:bg-gray-300 transition active:scale-90"
          onClick={scrollLeft}
        >
          <FaArrowLeft className="text-gray-600" size={14} />
        </button>
        <button
          className="bg-gray-200 shadow-md rounded-full p-2 hover:bg-gray-300 transition active:scale-90"
          onClick={scrollRight}
        >
          <FaArrowRight className="text-gray-600" size={14} />
        </button>
      </div>

      {/* Categories List */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto px-4 py-6 scrollbar-hide scroll-smooth snap-x"
      >
        {categoriesData.map((category, index) => (
          <button
            key={index}
            onClick={() => setSelectedCategory(category.name)}
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
        ))}
      </div>
    </div>
  );
};

export default Category;
