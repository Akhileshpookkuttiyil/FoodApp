const Categories = ({ categories, selectedCategory, setSelectedCategory }) => {
    return (
      <div className="flex space-x-4 overflow-x-auto py-3 px-4 bg-gray-100 rounded-md mt-6 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              selectedCategory === cat ? "bg-orange-500 text-white" : "bg-white text-gray-700"
            }`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
    );
  };
  
  export default Categories;
  