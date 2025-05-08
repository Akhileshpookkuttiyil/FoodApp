import { menuItems } from "../Menus/Data/MenuData"; // Update path correctly
import { FaHotel } from "react-icons/fa6";

const ViewProducts = () => {
  return (
    <div className="flex flex-col justify-between">
      <div className="w-full p-3 md:p-8">
        <div className="flex flex-col items-center max-w-6xl w-full overflow-hidden rounded-md bg-white border border-gray-200 shadow-sm mx-auto">
          <table className="table-auto w-full text-sm text-left text-gray-600">
            <thead className="bg-gray-50 text-gray-900">
              <tr>
                <th className="px-4 py-3 font-medium">Product</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium hidden md:table-cell">
                  Price
                </th>
                <th className="px-4 py-3 font-medium hidden sm:table-cell">
                  Hotel
                </th>
                <th className="px-4 py-3 font-medium">In Stock</th>
              </tr>
            </thead>
            <tbody>
              {menuItems.map((item) => (
                <tr key={item.id} className="border-t border-gray-100">
                  <td className="px-4 py-3 flex items-center gap-3">
                    <div className="border border-gray-200 rounded p-1 bg-white">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 object-cover rounded"
                      />
                    </div>
                    <span className="font-medium text-gray-700 hidden sm:inline-block">
                      {item.name}
                    </span>
                  </td>
                  <td className="px-4 py-3">{item.category}</td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    ₹{item.price}
                  </td>
                  <td className="px-4 py-3 sm:table-cell text-gray-700">
                    <div className="flex items-center gap-0.5">
                      <FaHotel className="text-gray-500" />
                      <span>{item.hotel}</span>
                    </div>
                  </td>

                  <td className="px-4 py-3">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        defaultChecked={item.inStock}
                      />
                      <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-green-500 transition-colors"></div>
                      <span className="dot absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewProducts;
