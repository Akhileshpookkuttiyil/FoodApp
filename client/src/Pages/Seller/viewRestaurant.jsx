import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAppContext } from "../../Context/AppContext";
import { FaMapMarkerAlt, FaStar } from "react-icons/fa";

const ViewRestaurants = () => {
  const { axios } = useAppContext();
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadRestaurants = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/restaurant/getByUser");
      if (!res.data.success) throw new Error(res.data.message);
      setRestaurants(res.data.data || []);
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to load restaurants.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRestaurants();
  }, []);

  return (
    <div className="w-full px-3 py-4 md:p-8">
      <div className="max-w-6xl mx-auto w-full rounded-md bg-white border border-gray-200 shadow-sm">
        <h2 className="text-lg font-semibold text-center py-4">
          My Restaurants
        </h2>

        {loading ? (
          <p className="text-center text-gray-500 py-6">Loading...</p>
        ) : restaurants.length === 0 ? (
          <p className="text-center text-gray-500 py-6">
            No restaurants found.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table-auto w-full min-w-[700px] text-sm text-gray-600 text-center">
              <thead className="bg-gray-50 text-gray-900">
                <tr>
                  <th className="px-4 py-3 font-medium">Image</th>
                  <th className="px-4 py-3 font-medium">Name</th>
                  <th className="px-4 py-3 font-medium">Location</th>
                  <th className="px-4 py-3 font-medium">Rating</th>
                  <th className="px-4 py-3 font-medium">Reviews</th>
                </tr>
              </thead>
              <tbody>
                {restaurants.map((restaurant) => (
                  <tr key={restaurant._id} className="border-t border-gray-100">
                    <td className="px-4 py-3">
                      <img
                        src={restaurant.image}
                        alt={restaurant.name}
                        className="w-14 h-14 object-cover rounded mx-auto"
                      />
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-700">
                      {restaurant.name}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-center items-center gap-1">
                        <FaMapMarkerAlt className="text-orange-500" />
                        {restaurant.location?.city},{" "}
                        {restaurant.location?.state}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-center items-center gap-1">
                        <FaStar className="text-yellow-500" />
                        {restaurant.rating ?? 0}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {restaurant.totalReviews ?? 0}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewRestaurants;
