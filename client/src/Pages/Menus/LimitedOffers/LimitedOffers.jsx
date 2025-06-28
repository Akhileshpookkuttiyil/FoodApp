import { useState, useCallback } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaShoppingCart,
  FaHotel,
} from "react-icons/fa";

// Import the StarRating component
import StarRating from "../../StarRating"; // Adjust the path if necessary

// If you use CartContext:
import { useAppContext } from "../../../context/AppContext";
import { Offers } from "../Data/limitedOffersData";

const LimitedOffers = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const { cartItems, addToCart, updateItemQuantity } = useAppContext(); // from your CartContext

  const displayedOffers = Offers.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const nextPage = () => {
    if ((currentPage + 1) * itemsPerPage < Offers.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleAddToCart = useCallback(
    (item) => {
      addToCart(item, 1);
    },
    [addToCart]
  );

  const handleIncrease = (itemId) => {
    updateItemQuantity(itemId, 1); // Increase the quantity by 1
  };

  const handleDecrease = (itemId) => {
    updateItemQuantity(itemId, -1); // Decrease the quantity by 1
  };

  return (
    <div className="w-full py-10 mt-3 relative">
      <h2 className="text-3xl font-bold text-center mb-10 text-red-700">
        🍛 Limited-Time Indian Delights!
      </h2>

      <div className="absolute top-20 right-4 flex items-center space-x-3">
        <button
          onClick={prevPage}
          disabled={currentPage === 0}
          className="flex items-center justify-center px-1 py-1 bg-orange-400 text-white rounded-full shadow-md hover:bg-orange-500 disabled:bg-gray-300"
        >
          <FaChevronLeft />
        </button>
        <button
          onClick={nextPage}
          disabled={(currentPage + 1) * itemsPerPage >= Offers.length}
          className="flex items-center justify-center px-1 py-1 bg-orange-400 text-white rounded-full shadow-md hover:bg-orange-500 disabled:bg-gray-300"
        >
          <FaChevronRight />
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-6 px-4 mt-10">
        {displayedOffers.map((item) => {
          const existingItem = cartItems.find(
            (cartItem) => cartItem.id === item.id
          );
          const count = existingItem ? existingItem.qty : 0;

          return (
            <div
              key={item.id}
              className="bg-white p-4 shadow-md rounded-2xl border hover:shadow-xl transition-transform transform hover:scale-[1.03] relative text-center flex flex-col items-center space-y-3"
            >
              <img
                src={item.image}
                alt={item.name}
                onError={(e) =>
                  (e.target.src = "/assets/img/default-image.png")
                }
                className="w-full h-36 object-contain rounded-lg"
                loading="lazy"
              />

              <h3 className="text-lg font-semibold text-gray-900 truncate">
                {item.name}
              </h3>
              <div className="text-sm text-gray-500 line-through">
                ₹{item.oldPrice}
              </div>
              <div className="inline-block text-xs font-medium text-white bg-orange-500 px-2 py-1 rounded-full">
                {item.discount}
              </div>

              <div className="flex flex-col items-center mt-2 space-y-1">
                <p className="flex items-center text-sm text-gray-600 gap-1">
                  <FaHotel className="text-orange-400 text-xs" />
                  <span className="truncate">{item.hotel}</span>
                </p>
                <StarRating rating={item.rating} />
              </div>

              {/* Cart Controls */}
              <div className="mt-4 w-full">
                <div className="flex justify-between items-center w-full">
                  <div className="text-lg font-bold text-gray-800">
                    ₹{item.price}
                  </div>

                  {count === 0 ? (
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="flex items-center gap-2 text-white bg-orange-500 hover:bg-orange-600 rounded-md px-3 py-2 transition-all font-medium"
                    >
                      <FaShoppingCart size={16} />
                      <span>Add</span>
                    </button>
                  ) : (
                    <div className="flex items-center gap-4 bg-orange-100 border border-orange-300 rounded-md px-4 py-2">
                      <button
                        onClick={() => handleDecrease(item.id)}
                        className="text-orange-600 font-bold hover:text-orange-800 text-lg"
                      >
                        −
                      </button>
                      <span className="text-sm font-semibold text-gray-800">
                        {count}
                      </span>
                      <button
                        onClick={() => handleIncrease(item.id)}
                        className="text-orange-600 font-bold hover:text-orange-800 text-lg"
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LimitedOffers;
