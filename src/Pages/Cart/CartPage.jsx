import { useState, useMemo } from "react";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom"; // Import Link for navigation

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Apple Watch Series 7 – 44mm",
      variant: "Golden",
      price: 259,
      image: "/watch.png",
      quantity: 1,
    },
    {
      id: 2,
      name: "Beylob 90 Speaker",
      variant: "Space Gray",
      price: 99,
      image: "/speaker1.png",
      quantity: 1,
    },
    {
      id: 3,
      name: "Beoplay M5 Bluetooth Speaker",
      variant: "Silver Collection",
      price: 129,
      image: "/speaker2.png",
      quantity: 1,
    },
  ]);

  const [showAddress, setShowAddress] = useState(false);
  const [couponCode, setCouponCode] = useState("");

  const updateQuantity = (id, newQty) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: parseInt(newQty) } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Use useMemo to memoize calculations
  const { subtotal, tax, shipping, total } = useMemo(() => {
    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const tax = subtotal * 0.02; // 2% tax
    const shipping = 0; // Free shipping
    const total = subtotal + tax + shipping;
    return { subtotal, tax, shipping, total };
  }, [cartItems]);

  const handleCouponChange = (e) => {
    setCouponCode(e.target.value);
  };

  const applyCoupon = () => {
    // Basic coupon logic (could be expanded)
    if (couponCode === "DISCOUNT10") {
      alert("Coupon Applied! 10% off.");
    } else {
      alert("Invalid Coupon Code.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-8 py-12 mt-10 flex flex-col lg:flex-row gap-12">
      {/* Left - Cart Items */}
      <div className="w-full max-w-4xl mx-auto">
        <h2 className="text-2xl font-medium text-black">
          Food{" "}
          <span className="relative inline-block">
            Cart
            <div className="w-full h-0.5 bg-orange-500 rounded-full absolute bottom-0 left-0"></div>
          </span>{" "}
          <span className="text-sm text-orange-500">
            ({cartItems.length} items)
          </span>
        </h2>

        {/* Table Header */}
        <div className="hidden lg:grid grid-cols-[2fr_1fr_1fr_80px] gap-x-8 text-gray-600 font-semibold border-b pb-3 mb-6 mt-8 text-lg">
          <span>Product</span>
          <span className="text-center">Quantity</span>
          <span className="text-right">Price</span>
          <span className="text-center">Action</span>
        </div>

        {/* Cart Items */}
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-1 lg:grid-cols-[2fr_1fr_1fr_80px] lg:gap-x-8 items-center border-b py-4 gap-5"
          >
            {/* Product */}
            <div className="flex gap-5 items-center">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-lg shadow"
              />
              <div>
                <p className="text-lg font-semibold">{item.name}</p>
                <p className="text-sm text-gray-500">{item.variant}</p>
              </div>
            </div>

            {/* Quantity */}
            <div className="flex justify-start lg:justify-center">
              <select
                value={item.quantity}
                onChange={(e) => updateQuantity(item.id, e.target.value)}
                className="border rounded-md px-3 py-2 bg-gray-100 focus:ring-2 focus:ring-blue-500 w-24 text-center"
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>

            {/* Price */}
            <div className="flex justify-start lg:justify-end">
              <p className="text-lg font-semibold text-gray-800">
                ₹{(item.price * item.quantity).toFixed(2)}
              </p>
            </div>

            {/* Action */}
            <div className="flex justify-center">
              <button
                onClick={() => removeItem(item.id)}
                className="text-gray-500 hover:text-red-600"
              >
                <FaTrash className="text-xl" />
              </button>
            </div>
          </div>
        ))}

        {/* Coupon Code */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
          <input
            type="text"
            placeholder="Enter coupon code"
            className="border px-4 py-2 w-full sm:w-64 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-base"
            value={couponCode}
            onChange={handleCouponChange}
          />
          <button
            onClick={applyCoupon}
            className="bg-orange-600 text-white px-6 py-2 rounded-md hover:bg-orange-700 transition-all w-full sm:w-auto text-base"
          >
            Apply Coupon
          </button>
        </div>
      </div>

      {/* Right - Order Summary */}
      <div className="max-w-[360px] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">
        <h2 className="text-xl md:text-xl font-medium">Order Summary</h2>
        <hr className="border-gray-300 my-5" />

        <div className="mb-6">
          <p className="text-sm font-medium uppercase">Delivery Address</p>
          <div className="relative flex justify-between items-start mt-2">
            <p className="text-gray-500">No address found</p>
            <button
              onClick={() => setShowAddress(!showAddress)}
              className="text-orange-500 hover:underline cursor-pointer"
            >
              Change
            </button>
            {showAddress && (
              <div className="absolute top-12 py-1 bg-white border border-gray-300 text-sm w-full">
                <p
                  onClick={() => setShowAddress(false)}
                  className="text-gray-500 p-2 hover:bg-gray-100"
                >
                  New York, USA
                </p>
                <p
                  onClick={() => setShowAddress(false)}
                  className="text-indigo-500 text-center cursor-pointer p-2 hover:bg-indigo-500/10"
                >
                  Add address
                </p>
              </div>
            )}
          </div>

          <p className="text-sm font-medium uppercase mt-6">Payment Method</p>

          <select className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none">
            <option value="COD">Cash On Delivery</option>
            <option value="Online">Online Payment</option>
          </select>
        </div>

        <hr className="border-gray-300" />

        <div className="text-gray-500 mt-4 space-y-2">
          <p className="flex justify-between">
            <span>Price</span>
            <span>${subtotal}</span>
          </p>
          <p className="flex justify-between">
            <span>Shipping Fee</span>
            <span className="text-green-600">Free</span>
          </p>
          <p className="flex justify-between">
            <span>Tax (2%)</span>
            <span>${tax.toFixed(2)}</span>
          </p>
          <p className="flex justify-between text-lg font-medium mt-3">
            <span>Total Amount:</span>
            <span>${total.toFixed(2)}</span>
          </p>
        </div>

        <button className="w-full py-3 mt-6 cursor-pointer bg-orange-500 text-white font-medium hover:bg-orange-500 transition">
          Place Order
        </button>
      </div>
    </div>
  );
};

export default CartPage;
