import { useState, useMemo } from "react";
import { FaTrash } from "react-icons/fa";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";
import emptyCart from "../../assets/img/empty-cart.svg";
import toast from "react-hot-toast";
import confetti from "canvas-confetti";
import removeIcon from "../../assets/img/remove_icon.svg";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const navigate = useNavigate();
  const { cartItems, updateItemQuantity, removeItemFromCart, clearCart } =
    useCart();
  const [showAddress, setShowAddress] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [isCouponApplied, setIsCouponApplied] = useState(false);

  const updateQuantity = (id, changeBy) => {
    const item = cartItems.find((item) => item.id === id);
    if (!item) return;

    if (changeBy === 1 && item.qty < 5) {
      updateItemQuantity(id, 1);
    } else if (changeBy === -1 && item.qty > 1) {
      updateItemQuantity(id, -1);
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
      toast.success("🎉 Coupon applied! You received 10% off.");

      // Trigger confetti without sound
      confetti({
        particleCount: 300, // More particles for a bigger effect
        spread: 100, // Wider spread
        origin: { y: 0.6 }, // Origin point
        colors: ["#ff6347", "#ffeb3b", "#4caf50"], // Festive colors
      });
    } else {
      setIsCouponApplied(false);
      toast.error("🚫 Invalid coupon code.");
    }
  };

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) return;
    toast.success("Order placed successfully!");
    // clear cart
  };

  const renderCartItem = (item) => (
    <div
      key={item.id}
      className="transition hover:shadow-md rounded-md bg-white grid grid-cols-1 lg:grid-cols-[2fr_1fr_1fr_80px] lg:gap-x-20 items-center border border-gray-200 py-6 px-6"
    >
      <div
        onClick={() => navigate(`/menu/${item.id}`)}
        onKeyDown={(e) => e.key === "Enter" && navigate(`/menu/${item.id}`)}
        role="button"
        tabIndex={0}
        className="flex gap-6 items-center cursor-pointer"
      >
        <img
          src={item.image}
          alt={item.name}
          className="w-24 h-24 object-contain rounded-lg"
        />
        <div>
          <p className="text-base text-gray-800 font-semibold">{item.name}</p>
          <p className="text-sm text-gray-500">{item.hotel}</p>
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
          onClick={() => {
            removeItemFromCart(item.id);
          }}
          aria-label={`Remove ${item.name} from cart`}
          className="text-gray-500 hover:text-red-600 transition"
        >
          <FaTrash className="text-2xl" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 mt-10">
      {cartItems.length === 0 ? (
        <section className="text-center p-10 flex flex-col items-center justify-center min-h-[50vh]">
          <img src={emptyCart} alt="Empty Cart" className="w-40 h-40 mb-6" />
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-500 mb-6">
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
          <div className="w-full max-w-4xl space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-semibold text-black flex items-center gap-2">
                Food <span className="border-b-2 border-orange-500">Cart</span>{" "}
                <span className="text-sm text-orange-500 flex items-center gap-2">
                  ({cartItems.length} items)
                  <button
                    onClick={clearCart}
                    aria-label="Clear all items from the cart"
                    title="Clear Cart"
                  >
                    <img src={removeIcon} alt="Clear Cart" />
                  </button>
                </span>
              </h2>
            </div>

            <div className="hidden lg:grid grid-cols-[2fr_1fr_1fr_80px] lg:gap-x-20 items-center border-b py-6 px-6 text-base font-semibold text-gray-600">
              <span>Product</span>
              <span className="text-center">Quantity</span>
              <span className="text-right">Price</span>
              <span className="text-center">Action</span>
            </div>

            {cartItems.map(renderCartItem)}

            <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
              <input
                type="text"
                placeholder="Enter coupon code"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
              <button
                onClick={applyCoupon}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md font-medium transition"
              >
                Apply
              </button>
            </div>
          </div>

          <aside className="max-w-[380px] w-full bg-gray-50 p-8 border border-gray-300 shadow-md rounded-md space-y-6 sticky top-20 self-start">
            <h2 className="text-2xl font-semibold">Order Summary</h2>
            <hr className="border-gray-300 my-5" />

            <div>
              <p className="text-sm font-medium uppercase mb-2">
                Delivery Address
              </p>
              <div className="relative">
                <div className="flex justify-between">
                  <span className="text-gray-500">No address selected</span>
                  <button
                    onClick={() => setShowAddress(!showAddress)}
                    className="text-orange-500 hover:underline text-sm"
                  >
                    Change
                  </button>
                </div>
                {showAddress && (
                  <div className="absolute z-20 mt-2 w-full bg-white border rounded shadow-lg animate-fade-in transition-all">
                    <button
                      onClick={() => setShowAddress(false)}
                      className="block w-full text-left p-3 hover:bg-gray-100"
                    >
                      New York, USA
                    </button>
                    <button
                      onClick={() => navigate("/add-address")}
                      className="block w-full text-left p-3 text-indigo-600 hover:bg-indigo-100 transition rounded"
                    >
                      ➕ Add Address
                    </button>
                  </div>
                )}
              </div>

              <label className="block text-sm font-medium uppercase mt-6 mb-2">
                Payment Method
              </label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm">
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
              disabled={cartItems.length === 0}
              className={`w-full py-3 font-semibold rounded-md transition ${
                cartItems.length === 0
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:shadow-lg"
              }`}
            >
              {cartItems.length === 0 ? "Cart is Empty" : "Place Order"}
            </button>
          </aside>
        </div>
      )}
    </div>
  );
};

export default CartPage;
