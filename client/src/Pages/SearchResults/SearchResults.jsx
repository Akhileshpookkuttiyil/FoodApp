import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { FaHotel, FaShoppingCart } from "react-icons/fa";
import { menuItems } from "../Menus/Data/MenuData.js";
import restaurantsData from "../Locations/RestaurantList/restaurantsData.js";
import StarRating from "../StarRating.jsx";
import { useCart } from "../../Context/CartContext.jsx";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const { addToCart, updateItemQuantity, cartItems } = useCart();
  const [matchedDishes, setMatchedDishes] = useState([]);
  const [matchedHotels, setMatchedHotels] = useState([]);
  const query = searchParams.get("query")?.toLowerCase().trim() || "";
  const navigate = useNavigate();

  useEffect(() => {
    if (query) {
      const dishResults = menuItems.filter((dish) =>
        dish.name.toLowerCase().includes(query)
      );

      const hotelResults = restaurantsData.filter((hotel) =>
        hotel.name.toLowerCase().includes(query)
      );

      setMatchedDishes(dishResults);
      setMatchedHotels(hotelResults);
    } else {
      setMatchedDishes([]);
      setMatchedHotels([]);
    }
  }, [query]);

  const handleAddToCart = useCallback(
    (item) => {
      addToCart(item, 1);
    },
    [addToCart]
  );

  const handleIncrease = useCallback(
    (itemId) => {
      updateItemQuantity(itemId, 1);
    },
    [updateItemQuantity]
  );

  const handleDecrease = useCallback(
    (itemId) => {
      updateItemQuantity(itemId, -1);
    },
    [updateItemQuantity]
  );

  const getItemCount = (id) => {
    const item = cartItems.find((item) => item.id === id);
    return item ? item.qty : 0;
  };

  return (
    <div className="mt-[10ch] px-6 md:px-12 lg:px-24 mb-16">
      <h2 className="text-2xl font-bold mb-10 mt-5">
        Results for <span className="text-orange-500">{query}</span>
      </h2>

      {matchedDishes.length === 0 && matchedHotels.length === 0 ? (
        <p className="text-gray-400 text-lg">
          No matching dishes or hotels found.
        </p>
      ) : (
        <>
          {matchedDishes.length > 0 && (
            <section className="mb-14">
              <h3 className="text-2xl font-semibold mb-6 border-b-2 border-orange-400 inline-block pb-1">
                Dishes
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {matchedDishes.map((item) => {
                  const count = getItemCount(item.id);
                  return (
                    <div
                      key={item.id}
                      className="bg-white p-4 shadow-md rounded-xl transition hover:shadow-xl hover:scale-[1.02] duration-300 flex flex-col justify-between"
                    >
                      <div
                        onClick={() => navigate(`/menu/${item.id}`)}
                        className="cursor-pointer"
                        aria-label={`View details of ${item.name}`}
                      >
                        <div className="w-full h-40 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden mb-4">
                          <img
                            src={item.image}
                            alt={`Image of ${item.name}`}
                            onError={(e) =>
                              (e.target.src = "/assets/img/default-image.png")
                            }
                            className="w-full h-full object-contain"
                          />
                        </div>

                        <h3 className="text-lg font-semibold text-gray-800 mb-1">
                          {item.name}
                        </h3>

                        <p className="text-sm text-gray-500 flex items-center gap-1 mb-2">
                          <FaHotel className="text-orange-400 text-xs" />
                          <span>{item.hotel}</span>
                        </p>

                        <StarRating rating={item.rating} />

                        <p className="text-sm text-gray-500 mt-2">
                          Delivery:{" "}
                          <span className="text-orange-500 font-medium">
                            {item.deliveryTime} mins
                          </span>
                        </p>
                      </div>

                      <div className="mt-4 flex justify-between items-center">
                        <div className="text-lg font-bold text-gray-800">
                          ₹{item.price}
                        </div>

                        {count === 0 ? (
                          <button
                            className="flex items-center gap-2 text-white bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-md text-sm font-medium transition"
                            onClick={() => handleAddToCart(item)}
                            aria-label={`Add ${item.name} to cart`}
                          >
                            <FaShoppingCart size={16} />
                            Add
                          </button>
                        ) : (
                          <div className="flex items-center gap-4 bg-orange-100 border border-orange-300 rounded-md px-3 py-1.5 select-none">
                            <button
                              onClick={() => handleDecrease(item.id)}
                              className="text-orange-600 font-bold text-lg hover:text-orange-800"
                              aria-label={`Decrease quantity of ${item.name}`}
                            >
                              −
                            </button>
                            <span className="text-sm font-medium text-gray-800">
                              {count}
                            </span>
                            <button
                              onClick={() => handleIncrease(item.id)}
                              className="text-orange-600 font-bold text-lg hover:text-orange-800"
                              aria-label={`Increase quantity of ${item.name}`}
                            >
                              +
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {matchedHotels.length > 0 && (
            <section>
              <h3 className="text-2xl font-semibold mb-6 border-b-2 border-orange-400 inline-block pb-1">
                Hotels
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {matchedHotels.map((hotel) => (
                  <div
                    key={hotel.id}
                    className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer flex flex-col overflow-hidden border border-gray-100"
                    onClick={() => navigate(`/restaurant/${hotel.id}`)} // Optional: navigate on card click
                    role="button"
                    aria-label={`View details for ${hotel.name}`}
                  >
                    <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                      <img
                        src={hotel.image}
                        alt={`Image of ${hotel.name}`}
                        onError={(e) =>
                          (e.target.src = "/assets/img/default-image.png")
                        }
                        className="w-full h-full object-contain"
                        loading="lazy"
                      />
                    </div>

                    <div className="p-4 flex flex-col gap-1 flex-grow">
                      <h4 className="text-xl font-semibold text-gray-800">
                        {hotel.name}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {hotel.fullAddress}
                      </p>

                      <div className="mt-1">
                        <StarRating rating={hotel.rating} />
                      </div>

                      <p className="text-sm text-gray-500 mt-1 font-medium">
                        Delivery Time:{" "}
                        <span className="text-orange-500 font-semibold">
                          {hotel.deliveryTime} mins
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
};

export default SearchResults;
