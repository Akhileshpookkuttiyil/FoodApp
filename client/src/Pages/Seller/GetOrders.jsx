import { useEffect, useState } from "react";
import { useAppContext } from "../../Context/AppContext";

const GetOrders = () => {
  const { axios } = useAppContext();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get("/api/order/seller", {});

        if (data.success) {
          setOrders(data.orders);
        } else {
          setError("Failed to fetch orders");
        }
      } catch (err) {
        setError(err.response?.data?.message || "Server error");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  if (orders.length === 0) return <p>No orders found.</p>;

  return (
    <div className="md:p-10 p-4 space-y-4">
      <h2 className="text-lg font-medium">Orders List</h2>
      {orders.map((order, index) => {
        const firstItem = order.items[0];
        const productImage =
          firstItem.product.images?.[0] || "/placeholder.png"; // fallback image
        const address = order.shippingAddress || {};

        return (
          <div
            key={order._id || index}
            className="flex flex-col md:grid md:grid-cols-[2fr_1fr_1fr_1fr] md:items-center gap-5 p-5 max-w-4xl rounded-md border border-gray-300 text-gray-800"
          >
            {/* Product Image and Name */}
            <div className="flex gap-5">
              <img
                className="w-12 h-12 object-cover rounded"
                src={productImage}
                alt={firstItem.product.name}
              />
              <div className="flex flex-col justify-center">
                <p className="font-medium">
                  {firstItem.product.name}
                  <span
                    className={`text-orange-500 px-4 ${
                      firstItem.quantity < 2 ? "hidden" : ""
                    }`}
                  >
                    x {firstItem.quantity}
                  </span>
                </p>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="text-sm">
              <p className="font-medium mb-1">
                {address.firstName} {address.lastName}
              </p>
              <p>
                {address.address || address.street}, {address.city},{" "}
                {address.state}, {address.pincode || address.zipcode},{" "}
                {address.country}
              </p>
            </div>

            {/* Total Amount */}
            <p className="font-medium text-base my-auto text-black/70">
              ₹{order.totalAmount.toFixed(2)}
            </p>

            {/* Payment Method, Date, Status */}
            <div className="flex flex-col text-sm">
              <p>Method: {order.paymentMethod}</p>
              <p>
                Date:{" "}
                {new Date(order.createdAt).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
              <p>Payment: {order.isPaid ? "Paid" : "Pending"}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default GetOrders;
