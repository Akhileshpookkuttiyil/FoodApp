import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../../Context/AppContext";

const BottomLinks = () => {
  const { axios } = useAppContext();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

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
  }, [axios]);

  const handleClick = (categoryName) => {
    navigate("/location", { state: { cat: categoryName } });
  };

  return (
    <section className="py-10 min-h-screen w-full bg-gray-50">
      <h2 className="text-3xl sm:text-4xl font-bold text-center text-black mb-10">
        Restaurants Near Me
      </h2>

      <div className="w-full px-4 sm:px-6 lg:px-10">
        {loading ? (
          <div className="text-center text-gray-500 text-lg">
            Loading categories...
          </div>
        ) : categories.length === 0 ? (
          <div className="text-center text-gray-500 text-lg">
            No categories available.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 lg:gap-12">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => handleClick(category.name)}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:scale-105 transform transition-all duration-300 h-full text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label={`Browse ${category.name} restaurants`}
              >
                <img
                  src={category.image}
                  alt={category.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://via.placeholder.com/300x200?text=No+Image";
                  }}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 flex flex-col justify-between h-full">
                  <h4 className="text-xl font-semibold text-gray-800">
                    {category.name}
                  </h4>
                  <p className="text-gray-600 mt-2 text-sm">
                    Find the best {category.name} restaurants near you.
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BottomLinks;
