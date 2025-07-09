import { useEffect, useState } from "react";
import { useAppContext } from "../../Context/AppContext";
import { useNavigate } from "react-router-dom";
import emptyOrdersImg from "../../assets/img/no-order.png";

const MIN_LOADER_TIME = 800;

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [showLoader, setShowLoader] = useState(true);
  const [error, setError] = useState(null);
  const { axios, user, currency } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    const loadOrders = async () => {
      try {
        const start = Date.now();
        const { data } = await axios.get("/api/order/user");
        if (data.success) setOrders(data.orders);
        else throw new Error("Failed to load orders.");

        const elapsed = Date.now() - start;
        const delay = Math.max(MIN_LOADER_TIME - elapsed, 0);
        setTimeout(() => setShowLoader(false), delay);
      } catch (err) {
        setError(err.message || "Failed to load orders.");
        setShowLoader(false);
      }
    };

    loadOrders();
  }, [user]);

  const getStatusColor = (status) => {
    const map = {
      placed: "text-blue-600",
      accepted: "text-indigo-600",
      preparing: "text-yellow-600",
      "on the way": "text-orange-600",
      delivered: "text-green-600",
      cancelled: "text-red-600",
    };
    return `font-semibold ${map[status?.toLowerCase()] || "text-gray-500"}`;
  };

  if (showLoader)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <dotlottie-player
          src="https://lottie.host/b6062add-37e0-465f-a1e3-6ae48065cd76/KVkNjiNVxl.lottie"
          background="transparent"
          speed="1"
          style={{ width: "200px", height: "200px" }}
          loop
          autoplay
        ></dotlottie-player>
      </div>
    );

  if (error)
    return (
      <p className="text-center mt-20 text-red-500 font-medium text-lg">
        {error}
      </p>
    );

  if (!orders.length)
    return (
      <div className="text-center mt-60">
        <img
          src={emptyOrdersImg}
          alt="No orders"
          className="mx-auto mb-4 w-32 h-32 object-contain"
        />
        <p className="text-2xl text-gray-500">No orders found</p>
      </div>
    );

  return (
    <div className="pt-24 pb-16 px-6 md:px-20">
      <div className="relative inline-block ml-2 mb-8">
        <h1 className="text-2xl font-bold text-gray-600">My Orders</h1>
        <span className="absolute -bottom-1 left-0 w-20 h-[3px] bg-orange-400 rounded"></span>
      </div>

      {orders.map((order) => (
        <div
          key={order._id}
          className="w-full bg-white border rounded-lg shadow-sm mb-10 p-6"
        >
          <div className="mb-4 flex flex-wrap justify-between text-sm text-gray-700">
            <p>
              <span className="font-medium">Order ID:</span> {order._id}
            </p>
            <p>
              Placed: {new Date(order.createdAt).toLocaleDateString("en-IN")}
            </p>
          </div>

          {order.shippingAddress && (
            <div className="text-sm text-gray-600 mb-4">
              <p className="font-medium text-gray-800 mb-1">
                Shipping Address:
              </p>
              <p>{order.shippingAddress.fullName}</p>
              <p>
                {order.shippingAddress.houseNumber},{" "}
                {order.shippingAddress.street}
              </p>
              <p>
                {order.shippingAddress.city}, {order.shippingAddress.state} -{" "}
                {order.shippingAddress.pincode}
              </p>
            </div>
          )}

          <div className="hidden md:grid grid-cols-[3fr_2fr_1fr_1fr_1fr] text-xs font-semibold text-gray-500 uppercase px-1 pb-2">
            <div>Product</div>
            <div className="flex justify-center">Restaurant</div>
            <div className="flex justify-center">Payment</div>
            <div className="flex justify-center">Status</div>
            <div className="flex justify-center">Price</div>
          </div>

          <div className="overflow-x-auto">
            {order.items.map(({ product, quantity }, i) => {
              if (!product) return null;
              const price =
                product.offerPrice > 0 ? product.offerPrice : product.price;

              return (
                <div
                  key={i}
                  className="py-4 grid grid-cols-[3fr_2fr_1fr_1fr_1fr] items-center border-t min-w-[900px]"
                >
                  <div
                    className="flex items-center gap-4 cursor-pointer"
                    onClick={() => navigate(`/menu/${product.id}`)}
                  >
                    <img
                      src={product.images?.[0] || "/placeholder.jpg"}
                      alt={product.name}
                      className="w-14 h-14 rounded object-cover"
                      onError={(e) =>
                        (e.target.src = "/assets/img/default-image.png")
                      }
                    />
                    <div>
                      <p className="font-medium text-gray-900">
                        {product.name}
                      </p>
                      <p className="text-sm text-gray-500">Qty: {quantity}</p>
                    </div>
                  </div>

                  <div className="text-sm text-gray-700 flex justify-center truncate">
                    {order.restaurant?.name}
                  </div>

                  <div className="text-sm flex justify-center">
                    {order.paymentMethod}{" "}
                    <span
                      className={`ml-1 ${
                        order.isPaid ? "text-green-600" : "text-yellow-600"
                      }`}
                    >
                      ({order.isPaid ? "Paid" : "Pending"})
                    </span>
                  </div>

                  <div
                    className={`text-sm flex justify-center ${getStatusColor(
                      order.orderStatus
                    )}`}
                  >
                    {order.orderStatus}
                  </div>

                  <div className="text-sm flex justify-center font-semibold text-gray-800">
                    {currency}
                    {(price * quantity).toFixed(2)}
                  </div>
                </div>
              );
            })}

            <div className="py-4 grid grid-cols-[3fr_2fr_1fr_1fr_1fr_1.3fr] items-center font-semibold text-sm gap-6 border-t text-orange-600 min-w-[900px]">
              <div className="col-span-5 text-right pr-4">Total:</div>
              <div className="flex justify-center">
                {currency}
                {order.totalAmount.toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyOrders;
