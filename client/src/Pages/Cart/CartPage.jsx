import React, { useState, useMemo, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useAppContext } from "../../Context/AppContext";
import { Link, useNavigate } from "react-router-dom";
import emptyCart from "../../assets/img/empty-cart.svg";
import toast from "react-hot-toast";
import confetti from "canvas-confetti";
import removeIcon from "../../assets/img/remove_icon.svg";

// Loading Spinner Component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-40">
    <div
      className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-solid border-orange-500 border-t-transparent rounded-full"
      role="status"
    >
      <span className="sr-only">Loading...</span>
    </div>
  </div>
);

const CartPage = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    setCartItems,
    updateItemQuantity,
    removeItemFromCart,
    clearCart,
    axios,
  } = useAppContext();
  const [showAddress, setShowAddress] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };
    loadData();
  }, []);

  const updateQuantity = (id, changeBy) => {
    const item = cartItems.find((item) => item.id === id);
    if (!item) return;

    if (changeBy === 1 && item.qty < 5) {
      updateItemQuantity(id, 1);
    } else if (changeBy === -1 && item.qty > 1) {
      updateItemQuantity(id, -1);
    }
  };

  const clearMyCart = async () => {
    try {
      const { data } = await axios.post("/api/cart/clear");

      if (data.success) {
        setCartItems(data.cart);
        toast.success("Cart cleared successfully");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const { subtotal, tax, discount, total } = useMemo(() => {
    const sub = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
    const taxAmount = sub * 0.02;
    const discountAmount = isCouponApplied ? sub * 0.1 : 0;
    const finalTotal = sub + taxAmount - discountAmount;
    return {
      subtotal: sub,
      tax: taxAmount,
      discount: discountAmount,
      total: finalTotal,
    };
  }, [cartItems, isCouponApplied]);

  const applyCoupon = () => {
    const trimmedCode = couponCode.trim().toUpperCase();
    if (trimmedCode === "DISCOUNT10") {
      setIsCouponApplied(true);
      setCouponCode("");
      toast.success("🎉 Coupon applied! You received 10% off.");
      confetti({
        particleCount: 900,
        spread: 100,
        origin: { y: 0.6 },
        colors: ["#ff6347", "#ffeb3b", "#4caf50"],
      });
    } else {
      setIsCouponApplied(false);
      toast.error("Invalid coupon code.");
    }
  };

  const removeCoupon = () => {
    setIsCouponApplied(false);
    toast.info("🗑️ Coupon removed.");
  };

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) {
      toast.error("Cart is empty");
      return;
    }
    if (!selectedAddress) {
      toast.error("No address selected");
      return;
    }
    if (!paymentMethod) {
      toast.error("Please select payment method");
      return;
    }

    setPlacingOrder(true);

    if (paymentMethod === "COD") {
      try {
        const orderPayload = {
          items: cartItems.map(({ id, qty }) => ({
            productId: id,
            quantity: qty,
          })),
          addressId: selectedAddress._id,
        };

        const { data } = await axios.post("/api/order/cod", orderPayload);
        toast.success(data.message || "Order placed successfully!");
        clearCart();
        navigate("/orders");
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to place order. Try again."
        );
      }
    } else if (paymentMethod === "Online") {
      toast.error("Online payment");
    }

    setPlacingOrder(false);
  };

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axios.get("/api/address/getAddress");
        const data = response.data?.data || [];

        setAddresses(data);

        const defaultAddress = data.find((addr) => addr.isDefault);
        setSelectedAddress(defaultAddress || null);
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchAddresses();
  }, []);

  const renderCartItem = (item) => (
    <>
      <React.Fragment key={item.id}>
        {/* Mobile Layout (small screens) */}
        <div
          key={`${item.id}-mobile`}
          className="block lg:hidden w-full transition hover:shadow-md rounded-md bg-white border border-gray-200 py-4 px-4 sm:px-6 space-y-4"
        >
          <div
            onClick={() => navigate(`/menu/${item.id}`)}
            onKeyDown={(e) => e.key === "Enter" && navigate(`/menu/${item.id}`)}
            role="button"
            tabIndex={0}
            className="flex gap-4 sm:gap-6 items-center cursor-pointer"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 sm:w-24 sm:h-24 object-contain rounded-lg"
            />
            <div className="flex-1">
              <p className="text-base sm:text-lg text-gray-800 font-semibold">
                {item.name}
              </p>
              <p className="text-xs sm:text-sm text-gray-500">{item.hotel}</p>
            </div>
          </div>

          <div className="flex flex-wrap justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item.id, -1)}
                className="w-7 h-7 border rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 font-bold"
                disabled={item.qty === 1}
                aria-label={`Decrease quantity of ${item.name}`}
              >
                -
              </button>
              <span className="w-8 text-center text-sm text-gray-800">
                {item.qty}
              </span>
              <button
                onClick={() => updateQuantity(item.id, 1)}
                className="w-7 h-7 border rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 font-bold"
                disabled={item.qty === 5}
                aria-label={`Increase quantity of ${item.name}`}
              >
                +
              </button>
            </div>
            <p className="text-lg font-semibold text-gray-700">
              ₹{(item.price * item.qty).toFixed(2)}
            </p>
            <button
              onClick={() => removeItemFromCart(item.id)}
              aria-label={`Remove ${item.name} from cart`}
              className="text-gray-500 hover:text-red-600 transition"
            >
              <FaTrash className="text-xl" />
            </button>
          </div>
        </div>

        {/* Desktop Layout (large screens) */}
        <div
          key={`${item.id}-desktop`}
          className="hidden lg:grid transition hover:shadow-md rounded-md bg-white grid-cols-[2fr_1fr_1fr_80px] lg:gap-x-20 items-center border border-gray-200 py-6 px-6"
        >
          <div
            onClick={() => navigate(`/menu/${item.id}`)}
            onKeyDown={(e) => e.key === "Enter" && navigate(`/menu/${item.id}`)}
            role="button"
            tabIndex={0}
            className="flex gap-4 sm:gap-6 items-center cursor-pointer"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 object-contain rounded-lg"
            />
            <div>
              <p className="text-base sm:text-lg text-gray-800 font-semibold">
                {item.name}
              </p>
              <p className="text-xs sm:text-sm text-gray-500">{item.hotel}</p>
            </div>
          </div>

          <div className="flex items-center justify-center mt-4 lg:mt-0">
            <button
              onClick={() => updateQuantity(item.id, -1)}
              className="w-8 h-8 border rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 text-lg font-bold"
              disabled={item.qty === 1}
              aria-label={`Decrease quantity of ${item.name}`}
            >
              -
            </button>
            <span className="w-8 text-center text-sm text-gray-800">
              {item.qty}
            </span>
            <button
              onClick={() => updateQuantity(item.id, 1)}
              className="w-8 h-8 border rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 text-lg font-bold"
              disabled={item.qty === 5}
              aria-label={`Increase quantity of ${item.name}`}
            >
              +
            </button>
          </div>

          <div className="text-right mt-4 lg:mt-0">
            <p className="text-lg font-semibold text-gray-700">
              ₹{(item.price * item.qty).toFixed(2)}
            </p>
          </div>

          <div className="flex justify-center mt-4 lg:mt-0">
            <button
              onClick={() => removeItemFromCart(item.id)}
              aria-label={`Remove ${item.name} from cart`}
              className="text-gray-500 hover:text-red-600 transition"
            >
              <FaTrash className="text-2xl" />
            </button>
          </div>
        </div>
      </React.Fragment>
    </>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 mt-10">
      {loading ? (
        <LoadingSpinner /> // Show spinner while loading
      ) : cartItems.length === 0 ? (
        <section className="text-center p-10 flex flex-col items-center justify-center min-h-[50vh]">
          <img
            src={emptyCart}
            alt="Empty Cart"
            className="w-32 sm:w-40 h-32 sm:h-40 mb-6"
          />
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-500 mb-6 max-w-xs sm:max-w-md">
            Looks like you haven’t added anything yet.
          </p>
          <Link
            to="/menus"
            className="bg-gray-700 hover:bg-gray-900 text-white px-6 py-2 rounded-md font-medium"
          >
            Shop Now
          </Link>
        </section>
      ) : (
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Content */}
          <div className="w-full max-w-4xl space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl sm:text-3xl font-semibold text-black flex items-center gap-2">
                Food <span className="border-b-2 border-orange-500">Cart</span>
                <span className="text-sm sm:text-base text-orange-500 flex items-center gap-2">
                  ({cartItems.length} items)
                  <button
                    onClick={clearMyCart}
                    aria-label="Clear all items from the cart"
                    title="Clear Cart"
                  >
                    <img
                      src={removeIcon}
                      alt="Clear Cart"
                      className="w-5 h-5 ml-1"
                    />
                  </button>
                </span>
              </h2>
            </div>

            {/* Table Header - only on large screens */}
            <div className="hidden lg:grid grid-cols-[2fr_1fr_1fr_80px] lg:gap-x-20 items-center border-b py-6 px-6 text-base font-semibold text-gray-600">
              <span>Product</span>
              <span className="text-center">Quantity</span>
              <span className="text-center">Price</span>
              <span className="text-center">Action</span>
            </div>

            {/* Cart Items */}
            {cartItems.map((item) => (
              <React.Fragment key={item.id}>
                {renderCartItem(item)}
              </React.Fragment>
            ))}

            {/* Coupon Code Input */}
            <div className="mt-8 space-y-4">
              {/* Input + Apply Button */}
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:bg-gray-100"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  disabled={isCouponApplied}
                />
                <button
                  onClick={applyCoupon}
                  className={`text-white px-6 py-2 rounded-md font-medium transition ${
                    isCouponApplied
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-orange-500 hover:bg-orange-600"
                  }`}
                  disabled={isCouponApplied}
                >
                  Apply
                </button>
              </div>

              {/* Static Coupon Info */}
              {!isCouponApplied && (
                <div className="flex items-center justify-between px-4 py-3 border border-orange-200 rounded-md bg-orange-50 text-sm text-orange-700 shadow-sm">
                  <span>
                    Try coupon{" "}
                    <strong className="text-red-600">DISCOUNT10</strong> — Get
                    10% off on selected dishes
                  </span>
                  <span className="text-xs text-orange-400">*Limited time</span>
                </div>
              )}

              {/* Applied Coupon Box */}
              {isCouponApplied && (
                <div className="flex items-center justify-between px-4 py-3 border border-green-400 rounded-md bg-green-50 text-green-700 shadow-sm">
                  <span className="text-sm font-medium">
                    🎉 Coupon <strong>DISCOUNT10</strong> applied — 10% off!
                  </span>
                  <button
                    onClick={removeCoupon}
                    className="text-green-700 hover:text-red-500 text-xl font-bold focus:outline-none"
                    aria-label="Remove coupon"
                  >
                    &times;
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="w-full max-w-[380px] bg-gray-50 p-6 sm:p-7 border border-gray-300 shadow-md rounded-md space-y-6 lg:sticky lg:top-20 self-start">
            <h2 className="text-2xl font-semibold">Order Summary</h2>
            <hr className="border-gray-300 my-5" />

            <div>
              <p className="text-sm font-medium uppercase mb-2">
                Delivery Address
              </p>
              <div className="relative">
                <div className="flex justify-between">
                  <div className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="mt-0.2 text-orange-500">
                      <FaMapMarkerAlt className="text-orange-500 mt-1 text-lg w-[10px]" />
                    </span>
                    <div className="leading-relaxed">
                      {selectedAddress ? (
                        <>
                          <div className="font-medium text-base">
                            {selectedAddress.fullName}
                          </div>
                          <div>
                            {selectedAddress.street} {""}
                            {selectedAddress.houseNumber}
                          </div>
                          <div>
                            {selectedAddress.city}, {selectedAddress.state}{" "}
                            {selectedAddress.pincode}
                          </div>
                          {selectedAddress.addressType && (
                            <div className="text-xs text-gray-500 mt-1 italic capitalize">
                              {selectedAddress.addressType} Address
                            </div>
                          )}
                        </>
                      ) : (
                        <span>No address selected</span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => setShowAddress(!showAddress)}
                    className="text-orange-500 hover:underline text-sm"
                  >
                    Change
                  </button>
                </div>

                {showAddress && (
                  <div className="absolute z-20 mt-2 w-full bg-white border rounded shadow-lg animate-fade-in transition-all max-h-60 overflow-auto">
                    {addresses.length === 0 && (
                      <div className="p-3 text-sm text-gray-500">
                        No addresses found
                      </div>
                    )}

                    {addresses.map((address) => (
                      <button
                        key={address._id}
                        onClick={() => {
                          setSelectedAddress(address);
                          setShowAddress(false);
                        }}
                        className="block w-full text-left p-3 hover:bg-gray-100 text-sm"
                      >
                        {address.fullName}, {address.houseNumber},{" "}
                        {address.city}
                        {address.isDefault && (
                          <span className="ml-2 text-xs text-gray-600 font-medium">
                            (Default)
                          </span>
                        )}
                      </button>
                    ))}

                    <button
                      onClick={() => navigate("/add-address")}
                      className="block w-full text-left p-3 text-indigo-600 hover:bg-indigo-100 transition rounded text-sm"
                    >
                      ➕ Add Address
                    </button>
                  </div>
                )}
              </div>

              <select
                value={paymentMethod}
                onChange={handlePaymentChange}
                className="w-full px-4 py-2 mt-2 text-gray-500 border border-gray-300 rounded-md shadow-sm"
              >
                <option value="">Select Payment Method</option>
                <option value="COD">Cash On Delivery</option>
                <option value="Online">Online Payment</option>
              </select>
            </div>

            <hr className="border-gray-300" />

            <div className="text-gray-600 text-sm space-y-3">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (2%)</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600 font-medium">
                  <span>🎟️ Coupon Discount</span>
                  <span>-₹{discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between font-semibold text-base mt-4">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={cartItems.length === 0 || placingOrder}
              className={`w-full py-3 font-semibold rounded-md transition ${
                cartItems.length === 0 || placingOrder
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:shadow-lg"
              }`}
            >
              {placingOrder
                ? "Placing Order..."
                : paymentMethod === "Online"
                ? "Proceed to Checkout"
                : "Place Order"}
            </button>
          </aside>
        </div>
      )}
    </div>
  );
};

export default CartPage;
