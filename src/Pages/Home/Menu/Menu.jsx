import { Link } from "react-router-dom";
import {menuItems as menuData} from "../../Menus/Data/MenuData"; // Import menu data

const Menu = () => {
  // Filter the best-rated menu items (rating >= 4.0)
  const bestMenus = menuData.filter((item) => item.rating >= 4.0);

  return (
    <div className="w-full lg:px-11 md:px-8 sm:px-4 px-4 space-y-6">
      {/* Top Section */}
      <div className="w-full flex items-center justify-between">
        <h5 className="text-2xl text-neutral-800 font-semibold">
          Our Best Menus
        </h5>
        <Link
          to={"/menu"}
          className="text-sm text-neutral-500 font-medium hover:text-orange-500 ease-in-out duration-300"
        >
          View All
        </Link>
      </div>

      {/* Menu Items */}
      <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-5">
        {bestMenus.map((data) => (
          <Link
            to={`/menu/${data.id}`}
            key={data.id}
            className="bg-white hover:bg-neutral-50 border border-neutral-200 px-4 py-5 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 ease-in-out"
          >
            <div className="relative">
              <img
                src={data.image}
                alt={data.name}
                className="w-full h-48 object-contain rounded-lg"
                loading="lazy"
              />
              {/* Unavailable Overlay */}
              {!data.inStock && (
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 text-white text-lg font-semibold rounded-lg">
                  Unavailable
                </div>
              )}
            </div>
            <div className="mt-4">
              <h6 className="text-lg text-neutral-800 font-semibold truncate">
                {data.name}
              </h6>
              <p className="text-sm text-neutral-500 line-clamp-2 h-10 overflow-hidden">
                {data.desc}
              </p>
            </div>
            <div className="flex justify-between items-center mt-4">
              <h6 className="text-xl text-neutral-800 font-bold">
                {data.price}
              </h6>
              <button
                className={`px-4 py-2 rounded-lg font-medium text-white ${
                  data.inStock
                    ? "bg-orange-500 hover:bg-orange-600"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                disabled={!data.inStock}
                aria-disabled={!data.inStock}
              >
                {data.inStock ? "Order Now" : "Not available"}
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Menu;
