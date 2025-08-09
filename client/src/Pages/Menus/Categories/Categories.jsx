import PropTypes from "prop-types";

const Categories = ({ categories, selectedCategory, setSelectedCategory }) => {
  return (
    <div className="flex space-x-4 overflow-x-auto py-3 px-4 bg-gray-100 rounded-md mt-6 scrollbar-hide">
      {categories.map((category) => {
        const isSelected = selectedCategory === category;
        return (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`rounded-md text-sm font-medium px-4 py-1 w-auto max-w-full 
    ${isSelected ? "bg-orange-500 text-white" : "bg-white text-gray-700"}`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
};

Categories.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedCategory: PropTypes.string.isRequired,
  setSelectedCategory: PropTypes.func.isRequired,
};

export default Categories;
