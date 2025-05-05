import { FaArrowLeft, FaCartPlus, FaShoppingCart } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { menuItems } from "../Menus/Data/MenuData";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import StarRating from "../StarRating";
import { FaHotel } from "react-icons/fa";
import { useCart } from "../../Context/CartContext";

const DishDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, updateItemQuantity, cartItems } = useCart();
  const [dish, setDish] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foundDish = menuItems.find(
      (item) => item.id === id || item.id === Number(id)
    );
    if (foundDish) {
      setDish(foundDish);
      setSelectedImage(foundDish?.img);
    } else {
      toast.error("Dish not found.");
    }
    setLoading(false);
    window.scrollTo(0, 0);
  }, [id]);

  const handleAddToCart = (item = null, qty = null) => {
    // Fallback to default dish and quantity from current page state
    const selectedItem = item || dish;
    const selectedQuantity = qty ?? quantity;

    if (!selectedItem || selectedQuantity < 1) {
      toast.error("Invalid dish or quantity.");
      return;
    }

    const existingItem = cartItems.find(
      (cartItem) => cartItem.id === selectedItem.id
    );

    if (existingItem) {
      updateItemQuantity(selectedItem.id, selectedQuantity); // Update quantity
    } else {
      addToCart(selectedItem, selectedQuantity); // Add new item
    }
  };

  const handleIncrease = (itemId) => {
    updateItemQuantity(itemId, 1); // Increase the quantity by 1
  };

  const handleDecrease = (itemId) => {
    updateItemQuantity(itemId, -1); // Decrease the quantity by 1
  };

  useEffect(() => {
    console.log("Cart updated:", cartItems);
  }, [cartItems]);
  

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20">
        <Skeleton height={400} />
      </div>
    );
  }

  if (!dish) {
    return (
      <div className="text-center py-20 text-xl text-gray-600">
        Dish not found
      </div>
    );
  }

  const relatedDishes = menuItems.filter(
    (item) => item.category === dish.category && item.id !== dish.id
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 mt-8">
      {/* Back Button */}
      <button
        onClick={() => navigate("/menus")}
        className="mb-8 text-orange-600 hover:text-orange-700 transition flex items-center gap-2 font-medium"
      >
        <FaArrowLeft /> <span className="underline">Back to Menus</span>
      </button>

      {/* Dish Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Main Image & Gallery */}
        <div>
          <div className="w-full h-[420px] rounded-xl overflow-hidden shadow-md">
            <img
              src={selectedImage}
              alt={dish.name}
              onError={(e) => (e.target.src = "/assets/img/default-image.png")}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>

          {dish.gallery?.length > 0 && (
            <div className="flex gap-3 mt-5 overflow-x-auto pb-2">
              {[dish.img, ...dish.gallery].map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`thumb-${idx}`}
                  onClick={() => setSelectedImage(img)}
                  onError={(e) =>
                    (e.target.src = "/assets/img/default-image.png")
                  }
                  className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 transition transform ${
                    selectedImage === img
                      ? "border-orange-500 scale-105"
                      : "border-transparent"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Info Section */}
        <div className="space-y-4">
          <p className="text-orange-500 uppercase font-semibold tracking-wider">
            {dish.category}
          </p>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            {dish.name}
          </h1>

          <div className="flex items-center gap-2 mt-2">
            <StarRating rating={dish.rating || 0} />
            <span className="text-sm text-gray-600">
              ({dish.rating || "0"} reviews)
            </span>
          </div>

          <p className="text-gray-600 text-[17px] max-w-lg leading-relaxed mt-4">
            {dish.longDesc ||
              "Deliciously crafted dish with the finest ingredients to delight your taste buds."}
          </p>

          {/* Pricing */}
          <div className="flex items-center gap-5 mt-6">
            <span className="text-3xl font-bold text-gray-900">
              ₹{dish.price}
            </span>
            <span className="text-sm px-2 py-1 bg-orange-100 text-orange-600 font-medium rounded-md">
              {dish.discount || "30% OFF"}
            </span>
            <span className="line-through text-gray-400 text-lg">
              ₹{dish.oldPrice || Math.round(dish.price * 1.3)}
            </span>
          </div>

          {/* Quantity & Buttons */}
          <div className="mt-8 space-y-4 sm:space-y-0 sm:flex sm:items-center sm:gap-6">
            {/* Quantity Selector */}
            <div className="flex items-center gap-2 border border-gray-300 rounded-md px-3 py-1.5">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="text-xl text-orange-500 font-bold px-2"
                aria-label="Decrease quantity"
                disabled={quantity === 1} // Disable if quantity is 1
              >
                –
              </button>
              <span className="text-lg font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="text-xl text-orange-500 font-bold px-2"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAddToCart}
                className="border font-bold text-orange-400 hover:bg-gray-300 hover:text-orange-600 flex items-center justify-center gap-3 px-4 py-2 rounded-md transition ease-in-out transform hover:scale-105"
              >
                <FaCartPlus /> Add to Cart
              </button>

              <button
                onClick={() => navigate("/checkout")}
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded-md transition ease-in-out transform hover:scale-105"
              >
                Order Now
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Related Dishes */}
      {relatedDishes.length > 0 && (
        <div className="mt-20">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            You Might Also Like
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedDishes.map((item) => {
              const existingItem = cartItems.find(
                (cartItem) => cartItem.id === item.id
              );
              const count = existingItem ? existingItem.qty : 0;

              return (
                <div
                  key={item.id}
                  className="bg-white p-4 shadow-lg rounded-lg w-full text-center border transform transition-all duration-300 hover:scale-105 hover:shadow-orange-200 hover:border-orange-300 flex flex-col items-center justify-between"
                >
                  {/* Clickable Dish Detail */}
                  <div
                    onClick={() => navigate(`/menu/${item.id}`)}
                    aria-label={`View details for ${item.name}`}
                    className="flex flex-col items-center justify-center text-center cursor-pointer space-y-1 w-full"
                  >
                    <img
                      src={item.img}
                      alt={item.name}
                      onError={(e) =>
                        (e.target.src = "/assets/img/default-image.png")
                      }
                      className="w-full aspect-[4/3] object-cover rounded-md mb-3"
                      loading="lazy"
                    />
                    <h2
                      className="text-lg font-semibold text-gray-800"
                      title={item.name}
                    >
                      {item.name}
                    </h2>
                    <p
                      className="text-xs text-gray-500 flex items-center"
                      title={item.hotel}
                    >
                      <FaHotel className="mr-1 text-orange-400" /> {item.hotel}
                    </p>
                    <div className="mt-2 flex text-sm items-center justify-center">
                      <StarRating rating={item.rating} />
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      Delivery: {item.deliveryTime} mins
                    </p>
                  </div>

                  {/* Cart Controls */}
                  <div className="mt-4 w-full">
                    <div className="flex justify-between items-center w-full">
                      <div className="text-lg font-bold text-gray-800">
                        ₹{item.price}
                      </div>

                      {count === 0 ? (
                        <button
                          className="flex items-center gap-2 text-white bg-orange-400 hover:bg-orange-500 rounded-md px-3 py-2 transition font-medium"
                          onClick={() => handleAddToCart(item, 1)}
                        >
                          <FaShoppingCart size={18} />
                          <span>Add</span>
                        </button>
                      ) : (
                        <div className="flex items-center gap-4 bg-orange-100 border border-orange-300 rounded-md py-2 px-4 w-fit select-none">
                          <button
                            onClick={() => handleDecrease(item.id)}
                            className="text-orange-600 font-bold hover:text-orange-800 text-xl"
                          >
                            −
                          </button>
                          <span className="text-sm font-medium text-gray-800">
                            {count}
                          </span>
                          <button
                            onClick={() => handleIncrease(item.id)}
                            className="text-orange-600 font-bold hover:text-orange-800 text-xl"
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
      )}
    </div>
  );
};

export default DishDetail;
