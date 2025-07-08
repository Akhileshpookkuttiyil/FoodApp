import { useState } from "react";
import { Outlet, useLocation, Link } from "react-router-dom";
import { useAppContext } from "../../Context/AppContext";
import {
  FaTachometerAlt,
  FaPlusCircle,
  FaBoxOpen,
  FaUtensils,
  FaStar,
  FaShoppingCart,
} from "react-icons/fa";

// ================== Seller Layout ==================
const SellerLayout = () => {
  const { seller, logoutSeller } = useAppContext();
  const location = useLocation();

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [loadingLogout, setLoadingLogout] = useState(false);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  const handleLogout = async () => {
    setLoadingLogout(true);
    await logoutSeller();
    setLoadingLogout(false);
  };

  const sidebarLinks = [
    {
      name: "Dashboard",
      path: "/seller/dashboard",
      icon: <FaTachometerAlt className="w-5 h-5" />,
    },
    {
      name: "Add Product",
      path: "/seller/add-product",
      icon: <FaPlusCircle className="w-5 h-5" />,
    },
    {
      name: "View Products",
      path: "/seller/view-products",
      icon: <FaBoxOpen className="w-5 h-5" />,
    },
    {
      name: "Restaurant",
      path: "/seller/get-restaurants",
      icon: <FaUtensils className="w-5 h-5" />,
    },
    {
      name: "Reviews",
      path: "/seller/view-reviews",
      icon: <FaStar className="w-5 h-5" />,
    },
    {
      name: "Orders",
      path: "/seller/get-orders",
      icon: <FaShoppingCart className="w-5 h-5" />,
    },
  ];

  const SidebarContent = () => (
    <div className="w-64 bg-white border-r border-gray-300 h-full">
      <div className="md:hidden flex justify-between items-center px-4 py-3 border-b">
        <span className="font-semibold text-lg">Menu</span>
        <button onClick={toggleSidebar} aria-label="Close sidebar">
          ✕
        </button>
      </div>
      {sidebarLinks.map(({ name, path, icon }) => {
        const isActive =
          location.pathname === path ||
          location.pathname.startsWith(path + "/");
        return (
          <Link
            to={path}
            key={name}
            className={`flex items-center py-3 px-4 gap-3 transition-all ${
              isActive
                ? "border-r-4 md:border-r-[6px] bg-orange-100 border-orange-500 text-orange-600 font-semibold"
                : "hover:bg-orange-50 text-orange-700"
            } mb-2`}
            aria-label={name}
          >
            {icon}
            <span>{name}</span>
          </Link>
        );
      })}
    </div>
  );

  return (
    <div className="flex flex-col h-screen">
      {/* Topbar */}
      <header className="flex items-center justify-between px-6 py-4 bg-white shadow-md border-b border-gray-200 h-[72px] flex-shrink-0">
        <div className="flex items-center gap-6">
          <button
            onClick={toggleSidebar}
            className="md:hidden block text-gray-700"
            aria-label="Toggle sidebar"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <Link to="/" className="text-2xl font-bold text-neutral-800">
            <span className="text-orange-500">F</span>oodie
            <span className="text-orange-500">M</span>ania
          </Link>
        </div>
        <div className="flex items-center gap-4 text-gray-600">
          <>
            <p className="font-medium lg:block md:block hidden">
              Hi, {seller?.name || "Seller"}
            </p>
          </>

          <button
            onClick={handleLogout}
            disabled={loadingLogout}
            className={` bg-orange-400 rounded-full font-light text-sm text-white px-4 py-1.5 hover:bg-orange-600 focus:outline-none ${
              loadingLogout ? "opacity-50 cursor-not-allowed" : ""
            }`}
            aria-label="Logout"
          >
            {loadingLogout ? "Logging out..." : "Logout"}
          </button>
        </div>
      </header>

      {/* Main layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar (Desktop) */}
        <aside className="hidden md:block w-64 bg-white border-r border-gray-300 h-full">
          <SidebarContent />
        </aside>

        {/* Main content */}
        <main className="flex-1 bg-gray-50 p-6 overflow-y-auto h-full">
          <Outlet />
        </main>
      </div>

      {/* Sidebar (Mobile) */}
      {isSidebarOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black bg-opacity-50"
            onClick={toggleSidebar}
            aria-hidden="true"
          />
          <div
            className="fixed inset-y-0 left-0 z-50 bg-white w-64 shadow-lg h-full"
            role="navigation"
          >
            <SidebarContent />
          </div>
        </>
      )}
    </div>
  );
};

export default SellerLayout;
