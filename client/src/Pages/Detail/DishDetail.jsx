import {
  FaArrowLeft,
  FaCartPlus,
  FaShoppingCart,
  FaHotel,
} from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import StarRating from "../StarRating";
import { useAppContext } from "../../Context/AppContext";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const DishDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, updateItemQuantity, cartItems, axios } = useAppContext();

  const [dish, setDish] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingRelated, setLoadingRelated] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const [dishRes, menuRes] = await Promise.all([
          axios.get(`/api/product/${id}`),
          axios.get("/api/product/list"),
        ]);

        const fetchedDish = dishRes.data?.data;
        const allItems = menuRes.data?.data;

        if (isMounted) {
          if (fetchedDish) {
            setDish(fetchedDish);
            setSelectedImage(
              Array.isArray(fetchedDish.images) && fetchedDish.images.length > 0
                ? fetchedDish.images[0]
                : "/assets/img/default-image.png"
            );
          } else {
            toast.error("Dish not found.");
          }
          setMenuItems(allItems || []);
        }
      } catch (error) {
        if (isMounted) {
          toast.error("Error loading dish details.");
          console.error("Fetch error:", error);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
          setLoadingRelated(false);
          window.scrollTo(0, 0);
        }
      }
    };

    fetchData();
    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleAddToCart = useCallback(
    (item = null, qty = null) => {
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
        updateItemQuantity(
          selectedItem.id,
          existingItem.qty + selectedQuantity
        );
      } else {
        addToCart(selectedItem, selectedQuantity);
      }
    },
    [dish, quantity, cartItems, addToCart, updateItemQuantity]
  );

  const handleIncrease = (itemId) => updateItemQuantity(itemId, 1);
  const handleDecrease = (itemId) => updateItemQuantity(itemId, -1);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <DotLottieReact
          src="https://lottie.host/4af2faac-0722-4717-8098-b7f94ef00f9b/p7nyoKCZk4.lottie"
          loop
          autoplay
          style={{ width: "230px", height: "250px" }}
        />
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

  const discountPercentage = dish.oldPrice
    ? Math.round(((dish.oldPrice - dish.price) / dish.oldPrice) * 100)
    : 30;

  const relatedDishes = menuItems.filter(
    (item) =>
      item.id !== dish.id &&
      item.category?.toLowerCase() === dish.category?.toLowerCase()
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 mt-5">
      <button
        onClick={() => navigate("/menus")}
        className="mb-8 text-orange-600 hover:text-orange-700 transition flex items-center gap-2 font-medium mt-4"
      >
        <FaArrowLeft /> <span>Back</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Image Gallery */}
        <div>
          <div className="w-full h-[420px] rounded-xl overflow-hidden border">
            <img
              src={selectedImage}
              alt={dish.name || "Dish image"}
              onError={(e) => (e.target.src = "/assets/img/default-image.png")}
              className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
            />
          </div>

          {dish.images && dish.images.length > 1 && (
            <div className="flex gap-1 mt-5 overflow-x-auto pb-2">
              {dish.images.map((image, idx) => (
                <img
                  key={idx}
                  src={image}
                  alt={`thumb-${idx}`}
                  onClick={() => setSelectedImage(image)}
                  onError={(e) =>
                    (e.target.src = "/assets/img/default-image.png")
                  }
                  className={`w-14 h-14 object-contain cursor-pointer rounded-md border-2 m-3 transition transform ${
                    selectedImage === image
                      ? "border-orange-500 scale-105"
                      : "border-transparent"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Dish Info */}
        <div className="space-y-3 max-w-lg">
          <p className="text-orange-500 uppercase font-semibold tracking-wide text-sm">
            {dish.category}
          </p>

          <h1 className="text-2xl font-semibold text-gray-900">{dish.name}</h1>

          <div className="flex items-center gap-2 mt-2">
            <StarRating rating={dish.rating || 0} />
            <span className="text-sm text-gray-600">
              ({dish.rating || "0"} reviews)
            </span>
          </div>

          <p className="text-gray-600 text-sm leading-relaxed mt-4">
            {dish.description ||
              "Deliciously crafted dish with the finest ingredients to delight your taste buds."}
          </p>

          {/* Price */}
          <div className="flex items-center gap-4 mt-6">
            <span className="text-2xl font-semibold text-gray-900">
              ₹{dish.price}
            </span>
            <span className="text-xs px-2 py-1 bg-orange-100 text-orange-600 font-medium rounded-md">
              {discountPercentage}% OFF
            </span>
            <span className="line-through text-gray-400 text-sm">
              ₹{dish.oldPrice || Math.round(dish.price * 1.3)}
            </span>
          </div>

          {/* Quantity & Cart Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:gap-6 space-y-4 sm:space-y-0">
            <div className="flex items-center gap-3 border border-gray-300 rounded-md px-3 py-1.5 max-w-fit">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="text-lg text-orange-500 font-semibold px-2 hover:text-orange-600 transition"
                disabled={quantity === 1}
              >
                –
              </button>
              <span className="text-base font-medium text-gray-900 text-center min-w-[24px]">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="text-lg text-orange-500 font-semibold px-2 hover:text-orange-600 transition"
              >
                +
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => handleAddToCart()}
                className="flex items-center gap-2 border border-orange-400 text-orange-500 font-semibold rounded-md px-5 py-2 hover:bg-orange-50 transition"
              >
                <FaCartPlus size={18} /> Add to Cart
              </button>
              <button
                onClick={() => navigate("/checkout")}
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-md px-5 py-2 transition"
              >
                Order Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Related Dishes */}
      <div className="mt-20">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          You Might Also Like
        </h2>

        {loadingRelated ? (
          <Skeleton height={200} count={1} />
        ) : relatedDishes.length > 0 ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedDishes.map((item) => {
              const existingItem = cartItems.find(
                (cartItem) => cartItem.id === item.id
              );
              const count = existingItem ? existingItem.qty : 0;

              return (
                <div
                  key={item.id}
                  className="bg-white p-4 shadow-lg rounded-lg text-center border hover:shadow-orange-200 hover:border-orange-300 transform transition hover:scale-105"
                >
                  <div
                    onClick={() => navigate(`/menu/${item.id}`)}
                    className="cursor-pointer space-y-1"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      onError={(e) =>
                        (e.target.src = "/assets/img/default-image.png")
                      }
                      className="w-full aspect-[4/3] object-cover rounded-md mb-3"
                    />
                    <h2 className="text-lg font-semibold">{item.name}</h2>
                    <p className="text-xs text-gray-500 flex items-center justify-center">
                      <FaHotel className="mr-1 text-orange-400" /> {item.hotel}
                    </p>
                    <StarRating rating={item.rating} />
                    <p className="text-sm text-gray-500 mt-1">
                      Delivery: {item.deliveryTime} mins
                    </p>
                  </div>

                  <div className="mt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-800">
                        ₹{item.price}
                      </span>

                      {count === 0 ? (
                        <button
                          className="flex items-center gap-2 text-white bg-orange-400 hover:bg-orange-500 rounded-md px-3 py-2 transition"
                          onClick={() => handleAddToCart(item, 1)}
                        >
                          <FaShoppingCart size={18} />
                          Add
                        </button>
                      ) : (
                        <div className="flex items-center gap-4 bg-orange-100 border border-orange-300 rounded-md py-2 px-4">
                          <button
                            onClick={() => handleDecrease(item.id)}
                            className="text-orange-600 font-bold text-xl hover:text-orange-800"
                          >
                            −
                          </button>
                          <span className="text-orange-600 font-semibold text-lg">
                            {count}
                          </span>
                          <button
                            onClick={() => handleIncrease(item.id)}
                            className="text-orange-600 font-bold text-xl hover:text-orange-800"
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
        ) : (
          <p className="text-gray-600 text-center">No related dishes found.</p>
        )}
      </div>
    </div>
  );
};

export default DishDetail;
