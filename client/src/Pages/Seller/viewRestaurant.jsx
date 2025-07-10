import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAppContext } from "../../Context/AppContext";
import { FaMapMarkerAlt, FaStar } from "react-icons/fa";

const ViewRestaurants = () => {
  const { axios } = useAppContext();
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadRestaurants = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/restaurant/getByUser");
      setRestaurants(res.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load restaurants.");
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
            <table className="table-auto w-full min-w-[700px] text-sm text-gray-600">
              <thead className="bg-gray-50 text-gray-900">
                <tr>
                  <th className="px-4 py-3 font-medium text-center">Image</th>
                  <th className="px-4 py-3 font-medium text-center">Name</th>
                  <th className="px-4 py-3 font-medium text-center">
                    Location
                  </th>
                  <th className="px-4 py-3 font-medium text-center">Rating</th>
                  <th className="px-4 py-3 font-medium text-center">Reviews</th>
                </tr>
              </thead>
              <tbody>
                {restaurants.map((restaurant) => (
                  <tr key={restaurant._id} className="border-t border-gray-100">
                    <td className="px-4 py-3 text-center">
                      <img
                        src={restaurant.image}
                        alt={restaurant.name}
                        className="w-12 h-12 object-cover rounded mx-auto"
                      />
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-700 text-center">
                      {restaurant.name}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="flex justify-center items-center gap-1">
                        <FaMapMarkerAlt className="text-orange-500" />
                        {restaurant.location?.city},{" "}
                        {restaurant.location?.state}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="flex justify-center items-center gap-1">
                        <FaStar className="text-yellow-500" />
                        {restaurant.rating ?? 0}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
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
