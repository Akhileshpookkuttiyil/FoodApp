import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../../Context/AppContext";

const fallbackImage = "https://via.placeholder.com/300x200?text=No+Image";

const BottomLinks = () => {
  const { axios } = useAppContext();
  const navigate = useNavigate();
  const [categories, setCategories] = useState(null);

  // Fetch categories
  useEffect(() => {
    axios
      .get("/api/category/categories/getcategories")
      .then((res) => {
        setCategories(res.data.success ? res.data.categories : []);
        if (!res.data.success) {
          console.error("Category fetch failed:", res.data.message);
        }
      })
      .catch((err) => {
        console.error("Error loading categories:", err.message);
        setCategories([]);
      });
  }, [axios]);

  // Navigate to category
  const handleClick = useCallback(
    (categoryName) => navigate("/location", { state: { cat: categoryName } }),
    [navigate]
  );

  // Image fallback
  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = fallbackImage;
  };

  // Render loading, empty, or category grid
  const renderContent = () => {
    if (!categories) {
      return <p className="text-center text-gray-500 text-lg">Loading categories...</p>;
    }

    if (categories.length === 0) {
      return <p className="text-center text-gray-500 text-lg">No categories available.</p>;
    }

    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 lg:gap-10">
        {categories.map((cat) => (
          <button
            key={cat._id || cat.name}
            onClick={() => handleClick(cat.name)}
            className="bg-white rounded-xl shadow hover:shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary overflow-hidden text-left"
            aria-label={`Browse ${cat.name}`}
          >
            <div className="relative w-full h-48 bg-gray-100 overflow-hidden">
              <img
                src={cat.image}
                alt={cat.name}
                loading="lazy"
                onError={handleImageError}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 flex flex-col gap-1">
              <h4 className="text-lg font-semibold text-gray-800">{cat.name}</h4>
              <p className="text-gray-600 text-sm leading-tight">
                Find the best {cat.name} restaurants near you.
              </p>
            </div>
          </button>
        ))}
      </div>
    );
  };

  return (
    <section className="py-10 min-h-screen bg-gray-50">
      <h2 className="text-3xl sm:text-4xl font-bold text-center text-black mb-10">
        Restaurants Near Me
      </h2>
      <div className="w-full px-4 sm:px-6 lg:px-10">{renderContent()}</div>
    </section>
  );
};

export default BottomLinks;
