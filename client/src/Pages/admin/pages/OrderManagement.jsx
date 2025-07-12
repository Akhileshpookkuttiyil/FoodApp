import { useEffect, useState } from "react";
import { useAppContext } from "../../../Context/AppContext";

const TABLE_HEADERS = [
  "#",
  "Customer",
  "Restaurant",
  "Amount",
  "Paid",
  "Status",
  "Date",
  "Actions",
];

const statusColorMap = {
  delivered: "bg-green-100 text-green-800",
  placed: "bg-blue-100 text-blue-800",
  preparing: "bg-yellow-100 text-yellow-800",
  accepted: "bg-indigo-100 text-indigo-800",
  "on the way": "bg-purple-100 text-purple-800",
  cancelled: "bg-red-100 text-red-800",
  pending: "bg-yellow-100 text-yellow-800",
  initiated: "bg-gray-100 text-gray-800",
};

const OrderManagement = () => {
  const { currency, axios } = useAppContext();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("/api/admin/orders/getAll");
        setOrders(response.data.data);
      } catch (error) {
        console.error("Error fetching orders:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div id="ordersContent" className="content-section">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <h2 className="text-xl font-semibold text-gray-900">
              Orders Management
            </h2>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
              {/* Search */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="ri-search-line text-sm text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search orders..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                />
              </div>

              {/* Filter Button */}
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm font-medium !rounded-button">
                <i className="ri-filter-line text-sm mr-2" /> Filter
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                {TABLE_HEADERS.map((header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {/* Loading */}
              {loading ? (
                <tr>
                  <td
                    colSpan="8"
                    className="text-center py-8 text-sm text-gray-500"
                  >
                    Loading orders...
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td
                    colSpan="8"
                    className="text-center py-8 text-sm text-gray-500"
                  >
                    No orders found.
                  </td>
                </tr>
              ) : (
                orders.map((order, index) => (
                  <tr key={order._id}>
                    {/* Index */}
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {index + 1}
                    </td>

                    {/* Customer Info */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          src={`https://ui-avatars.com/api/?name=${order.user?.name}&size=32`}
                          alt={order.user?.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">
                            {order.user?.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {order.user?.email}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Restaurant */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {order.restaurant?.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {order.restaurant?.cuisine}
                      </div>
                    </td>

                    {/* Amount */}
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {currency}
                      {order.totalAmount?.toFixed(2)}
                    </td>

                    {/* Paid */}
                    <td className="px-6 py-4 text-center">
                      {order.isPaid ? (
                        <span className="text-green-600 text-xl">✓</span>
                      ) : (
                        <span className="text-red-600 text-lg">✗</span>
                      )}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          statusColorMap[order.orderStatus] ||
                          "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {order.orderStatus?.charAt(0).toUpperCase() +
                          order.orderStatus?.slice(1)}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          className="text-primary hover:text-blue-700"
                          title="View"
                        >
                          <i className="ri-eye-line w-4 h-4" />
                        </button>
                        <button
                          className="text-gray-600 hover:text-gray-900"
                          title="Edit"
                        >
                          <i className="ri-edit-line w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing {orders.length > 0 ? `1 to ${orders.length}` : 0} of{" "}
              {orders.length} results
            </div>

            <div className="flex space-x-2">
              {["Previous", "1", "2", "3", "Next"].map((label, index) => (
                <button
                  key={index}
                  className={`px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 !rounded-button ${
                    label === "1" ? "bg-primary text-gray-200" : ""
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderManagement;
