import { useEffect, useState } from "react";
import { useAppContext } from "../../../Context/AppContext";
import "remixicon/fonts/remixicon.css";

function RestaurantsContent() {
  const { axios } = useAppContext();
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRestaurants() {
      try {
        const res = await axios.get("/api/admin/restaurant/getRestaurants");
        setRestaurants(res.data);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to fetch restaurants"
        );
      } finally {
        setLoading(false);
      }
    }
    fetchRestaurants();
  }, [axios]);

  if (loading) return <p className="p-6">Loading restaurants...</p>;
  if (error) return <p className="p-6 text-red-600">Error: {error}</p>;

  // Shared styles for headers and cells
  const thClassCenter =
    "px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider";
  const thClassLeft =
    "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider";
  const tdClassCenter = "px-6 py-4 whitespace-nowrap text-center";
  const tdClassLeft = "px-6 py-4 whitespace-nowrap text-left";

  return (
    <div id="restaurantsContent" className="content-section">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <h2 className="text-xl font-semibold text-gray-900">
              Restaurants Management
            </h2>

            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
              {/* Search */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <div className="w-4 h-4 flex items-center justify-center text-gray-400">
                    <i className="ri-search-line text-sm" />
                  </div>
                </div>
                <input
                  type="text"
                  placeholder="Search restaurants..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                />
              </div>

              {/* Filter Button */}
              <button className="px-4 flex items-center justify-center bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm font-medium whitespace-nowrap rounded-button gap-1">
                <div className="w-5 h-7 flex items-center justify-center">
                  <i className="ri-filter-line text-sm" />
                </div>
                Filter
              </button>

              {/* Add Restaurant Button */}
              <button className="px-4 flex items-center justify-center bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm font-medium whitespace-nowrap rounded-button gap-1">
                <div className="w-5 h-7 flex items-center justify-center">
                  <i className="ri-add-line text-sm" />
                </div>
                Add Restaurant
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className={thClassLeft}>Restaurant</th>
                <th className={thClassLeft}>Location</th>
                <th className={thClassCenter}>Category</th>
                <th className={thClassCenter}>Rating</th>
                <th className={thClassCenter}>Status</th>
                <th className={thClassCenter}>Owner</th>
                <th className={thClassCenter}>Actions</th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {restaurants.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                    No restaurants found.
                  </td>
                </tr>
              ) : (
                restaurants.map((r) => (
                  <tr key={r.id}>
                    <td className={tdClassCenter}>
                      <div className="flex items-center justify-center">
                        <img
                          src={r.image || "https://via.placeholder.com/50"}
                          alt={r.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div className="ml-4 text-left">
                          <div className="text-sm font-medium text-gray-900">
                            {r.name}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className={tdClassLeft}>
                      <div className="text-sm text-gray-900">{r.location.city}</div>
                      <div className="text-sm text-gray-500">
                        {r.location.state}, {r.location.address}
                      </div>
                    </td>

                    <td className={tdClassCenter}>
                      <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                        {r.category}
                      </span>
                    </td>

                    <td className={tdClassCenter}>
                      <div className="flex items-center justify-center">
                        <div className="w-4 h-4 flex items-center justify-center text-yellow-400 mr-1">
                          <i className="ri-star-fill" />
                        </div>
                        <span className="text-sm text-gray-900">{r.rating}</span>
                        <span className="text-sm text-gray-500 ml-1">
                          ({r.totalReviews})
                        </span>
                      </div>
                    </td>

                    <td className={tdClassCenter}>
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          r.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {r.status}
                      </span>
                    </td>

                    <td className={tdClassCenter}>
                      <div className="text-sm text-gray-900">
                        {r.ownerName || "Unknown"}
                      </div>
                    </td>

                    <td className={`${tdClassCenter} text-sm font-medium`}>
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          className="text-primary hover:text-blue-700"
                          title="View"
                        >
                          <div className="w-4 h-4 flex items-center justify-center">
                            <i className="ri-eye-line" />
                          </div>
                        </button>
                        <button
                          className="text-gray-600 hover:text-gray-900"
                          title="Edit"
                        >
                          <div className="w-4 h-4 flex items-center justify-center">
                            <i className="ri-edit-line" />
                          </div>
                        </button>
                        <button
                          className="text-red-600 hover:text-red-900"
                          title="Delete"
                        >
                          <div className="w-4 h-4 flex items-center justify-center">
                            <i className="ri-close-line" />
                          </div>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing 1 to {restaurants.length} of {restaurants.length} results
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 rounded-button whitespace-nowrap">
                Previous
              </button>
              <button className="px-3 py-1 text-sm bg-primary text-gray-400 rounded-lg rounded-button whitespace-nowrap">
                1
              </button>
              <button className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 rounded-button whitespace-nowrap">
                2
              </button>
              <button className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 rounded-button whitespace-nowrap">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RestaurantsContent;
