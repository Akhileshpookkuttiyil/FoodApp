import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { menuItems as dishesData } from "../Menus/Data/MenuData";
import { FaStar } from "react-icons/fa";

const DishDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dish = dishesData.find(
    (item) => item.id === id || item.id === Number(id)
  );

  // If the dish is not found, show a not found message.
  if (!dish) {
    return (
      <div className="text-center py-10 text-xl text-gray-600">
        Dish not found
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 py-12 mt-16">
      {/* Back to Menu Button */}
      <button
        onClick={() => navigate("/menus")}
        className="bg-gray-600 text-white px-6 py-2 rounded-xl mb-8 transition-colors duration-300 hover:bg-gray-700"
      >
        Back to Menu
      </button>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
        {/* Dish Image */}
        <div className="flex-1">
          <img
            src={dish.img}
            alt={dish.name}
            className="w-full h-[500px] object-cover rounded-3xl shadow-lg transform transition-transform duration-300 ease-in-out hover:scale-105"
            loading="lazy"
          />
        </div>

        {/* Dish Info */}
        <div className="flex-1 space-y-8">
          <h1 className="text-4xl font-semibold text-gray-900 hover:text-green-600 transition duration-300 ease-in-out">
            {dish.name}
          </h1>

          <p className="text-gray-700 text-lg leading-relaxed">
            {dish.description}
          </p>

          <div className="flex items-center gap-2 text-yellow-500 text-lg">
            <FaStar /> {dish.rating} / 5
          </div>

          <p className="text-3xl font-semibold text-green-600">
            ₹ {dish.price}
          </p>

          {/* Ingredients Section */}
          {dish.ingredients && dish.ingredients.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Ingredients:
              </h3>
              <ul className="list-disc list-inside text-gray-700">
                {dish.ingredients.map((item, index) => (
                  <li key={index} className="text-lg">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Add to Cart Button */}
          <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl transition duration-300 ease-in-out shadow-md hover:shadow-lg">
            Add to Cart
          </button>
        </div>
      </div>

      {/* Related Products Section (Optional) */}
      <div className="mt-16">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          You might also like
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Display related products here (optional) */}
        </div>
      </div>
    </div>
  );
};

export default DishDetail;
