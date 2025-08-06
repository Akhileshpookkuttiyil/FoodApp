import { useState, useCallback } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaShoppingCart,
  FaHotel,
} from "react-icons/fa";

import StarRating from "../../StarRating";
import { useAppContext } from "../../../Context/AppContext";
import { Offers } from "../Data/limitedOffersData";

const LimitedOffers = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  const { cartItems, addToCart, updateItemQuantity } = useAppContext();

  const displayedOffers = Offers.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const nextPage = () => {
    if ((currentPage + 1) * itemsPerPage < Offers.length) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleAddToCart = useCallback(
    (item) => addToCart(item, 1),
    [addToCart]
  );

  const handleIncrease = (itemId) => updateItemQuantity(itemId, 1);
  const handleDecrease = (itemId) => updateItemQuantity(itemId, -1);

  return (
    <div className="w-full py-10 mt-3 relative">
      <h2 className="text-3xl font-bold text-center mb-10 text-red-700">
        🍛 Limited-Time Indian Delights!
      </h2>

      {/* Pagination Controls */}
      <div className="absolute top-20 right-4 flex items-center gap-3 z-10">
        <button
          onClick={prevPage}
          disabled={currentPage === 0}
          className="p-2 rounded-full bg-orange-400 text-white hover:bg-orange-500 disabled:bg-gray-300"
          aria-label="Previous"
        >
          <FaChevronLeft />
        </button>
        <button
          onClick={nextPage}
          disabled={(currentPage + 1) * itemsPerPage >= Offers.length}
          className="p-2 rounded-full bg-orange-400 text-white hover:bg-orange-500 disabled:bg-gray-300"
          aria-label="Next"
        >
          <FaChevronRight />
        </button>
      </div>

      {/* Offers Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-6 px-4 mt-10">
        {displayedOffers.map((item) => {
          const count = cartItems.find((c) => c.id === item.id)?.qty || 0;

          return (
            <div
              key={item.id}
              className="bg-white p-4 shadow-md rounded-2xl border hover:shadow-xl transition-transform transform hover:scale-[1.03] text-center flex flex-col items-center space-y-3"
            >
              <img
                src={item.image}
                alt={item.name}
                loading="lazy"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/assets/img/default-image.png";
                }}
                className="w-full h-36 object-contain rounded-lg"
              />

              <h3 className="text-lg font-semibold text-gray-900 truncate">
                {item.name}
              </h3>

              <div className="text-sm text-gray-500 line-through">
                ₹{item.oldPrice}
              </div>

              <span className="inline-block text-xs font-medium text-white bg-orange-500 px-2 py-1 rounded-full">
                {item.discount}
              </span>

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
                  <span className="text-lg font-bold text-gray-800">
                    ₹{item.price}
                  </span>

                  {count === 0 ? (
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 rounded-md transition font-medium"
                    >
                      <FaShoppingCart size={16} />
                      Add
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
