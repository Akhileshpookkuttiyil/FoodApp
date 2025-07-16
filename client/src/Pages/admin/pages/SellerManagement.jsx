import { useEffect, useState } from "react";
import { useAppContext } from "../../../Context/AppContext";

const statusStyles = {
  green: "bg-green-100 text-green-800",
  yellow: "bg-yellow-100 text-yellow-800",
};

const Sellers = () => {
  const { axios } = useAppContext();
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const res = await axios.get("/api/admin/sellers/getAllSellers");
        if (res.data.success) {
          setSellers(res.data.sellers); // Assuming the data is in `res.data.sellers`
        } else {
          setError("Failed to load sellers.");
        }
      } catch (error) {
        console.error(
          "Error fetching sellers:",
          error.response?.data?.message || error.message
        );
        setError("Failed to load sellers.");
      } finally {
        setLoading(false);
      }
    };

    fetchSellers();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <h2 className="text-xl font-semibold text-gray-900">
            Sellers Management
          </h2>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
            {/* Search */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <i className="ri-search-line text-sm"></i>
              </div>
              <input
                type="text"
                placeholder="Search sellers..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Filter Button */}
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm font-medium whitespace-nowrap !rounded-button flex items-center space-x-2">
              <i className="ri-filter-line text-sm"></i>
              <span>Filter</span>
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {loading ? (
          <div className="p-6 text-center text-gray-500">
            Loading sellers...
          </div>
        ) : error ? (
          <div className="p-6 text-center text-red-500">{error}</div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Seller
                </th>
                <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Joined
                </th>
                <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {sellers.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        src={user.imgSrc}
                        alt={user.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {user.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          ID: #{user.id}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 text-center">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        statusStyles[user.statusColor] ??
                        "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 text-center">
                    {user.joined}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-center">
                    <div className="flex justify-center flex-wrap gap-2">
                      <button className="flex items-center gap-1 text-primary hover:text-blue-700 px-2 py-1 border border-primary rounded-md text-xs font-semibold">
                        <i className="ri-eye-line"></i>
                        <span>View</span>
                      </button>
                      <button className="flex items-center gap-1 text-gray-700 hover:text-gray-900 px-2 py-1 border border-gray-400 rounded-md text-xs font-semibold">
                        <i className="ri-edit-line"></i>
                        <span>Edit</span>
                      </button>
                      <button className="flex items-center gap-1 text-yellow-700 hover:text-yellow-900 px-2 py-1 border border-yellow-600 rounded-md text-xs font-semibold">
                        <i className="ri-user-unfollow-line"></i>
                        <span>Block</span>
                      </button>
                      <button className="flex items-center gap-1 text-red-700 hover:text-red-900 px-2 py-1 border border-red-600 rounded-md text-xs font-semibold">
                        <i className="ri-delete-bin-line"></i>
                        <span>Delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      <div className="px-6 py-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing {sellers.length > 0 ? `1 to ${sellers.length}` : 0} of{" "}
            {sellers.length} results
          </div>
          <div className="flex space-x-2">
            {["Previous", "1", "2", "3", "Next"].map((label, idx) => (
              <button
                key={label}
                className={`px-3 py-1 text-sm rounded-lg whitespace-nowrap !rounded-button ${
                  idx === 1
                    ? "bg-primary text-gray-400"
                    : "border border-gray-300 hover:bg-gray-50"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sellers;
