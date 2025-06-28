import { useState } from "react";
import { Outlet, useLocation, Link } from "react-router-dom";
import { useAppContext } from "../../Context/AppContext";

const SellerLayout = () => {
  const { seller, logoutSeller } = useAppContext();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const handleLogout = async () => {
    await logoutSeller();
  };

  const sidebarLinks = [
    { name: "Dashboard", path: "/seller", icon: dashboardIcon },
    { name: "Add Product", path: "/seller/add-product", icon: addProductIcon },
    {
      name: "View Products",
      path: "/seller/view-products",
      icon: viewProductIcon,
    },
    { name: "Users", path: "/seller/view-users", icon: usersIcon },
    { name: "Orders", path: "/seller/orders", icon: ordersIcon },
  ];

  const SidebarContent = () => (
    <div className="w-64 bg-white border-r border-gray-300 pt-4 h-full">
      {sidebarLinks.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            to={item.path}
            key={item.name}
            className={`flex items-center py-3 px-4 gap-3 transition-all ${
              isActive
                ? "border-r-4 md:border-r-[6px] bg-orange-100 border-orange-500 text-orange-600 font-semibold"
                : "hover:bg-orange-50 text-orange-700"
            } mb-2`}
            aria-label={item.name}
          >
            {item.icon}
            <span className="hidden md:block">{item.name}</span>
            <span className="block md:hidden">{item.name[0]}</span>
          </Link>
        );
      })}
    </div>
  );

  return (
    <div className="flex flex-col h-screen">
      {/* Topbar */}
      <div className="flex items-center justify-between px-6 py-4 bg-white shadow-md border-b border-gray-200 h-[72px] flex-shrink-0">
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
                strokeWidth={2}
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
          <p className="font-medium">Hi, {seller?.name || "Seller"}</p>
          <button
            onClick={handleLogout}
            className="border border-gray-400 bg-gray-200 rounded-full text-sm px-3 py-1 hover:bg-gray-300 focus:outline-none"
            aria-label="Logout"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Layout Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="hidden md:block w-64 bg-white border-r border-gray-300 h-full">
          <SidebarContent />
        </div>

        {/* Main Content */}
        <main className="flex-1 bg-gray-50 p-6 overflow-y-auto h-full">
          <Outlet />
        </main>
      </div>

      {/* Mobile Sidebar */}
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

// SVG Icons
const dashboardIcon = (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 3h7v7H3V3zm0 11h7v7H3v-7zm11-11h7v7h-7V3zm0 11h7v7h-7v-7z"
    />
  </svg>
);

const addProductIcon = (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 4v16m8-8H4"
    />
  </svg>
);

const viewProductIcon = (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v16a1 1 0 01-1 1H4a1 1 0 01-1-1V4z"
    />
  </svg>
);

const usersIcon = (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87M16 3.13a4 4 0 010 7.75M8 3.13a4 4 0 000 7.75"
    />
  </svg>
);

const ordersIcon = (
  <svg
    className="w-6 h-6"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 640 512"
    fill="currentColor"
  >
    <path d="M58.9 42.1c3-6.1 9.6-9.6 16.3-8.7L320 64 564.8 33.4c6.7-.8 13.3 2.7 16.3 8.7l41.7 83.4c9 17.9-.6 39.6-19.8 45.1L439.6 217.3c-13.9 4-28.8-1.9-36.2-14.3L320 64 236.6 203c-7.4 12.4-22.3 18.3-36.2 14.3L37.1 170.6c-19.3-5.5-28.8-27.2-19.8-45.1L58.9 42.1zM321.1 128l54.9 91.4c14.9 24.8 44.6 36.6 72.5 28.6L576 211.6v167c0 22-15 41.2-36.4 46.6l-204.1 51c-10.2 2.6-20.9 2.6-31 0l-204.1-51C79 419.7 64 400.5 64 378.5v-167L191.6 248c27.8 8 57.6-3.8 72.5-28.6L318.9 128l2.2 0z" />
  </svg>
);

export default SellerLayout;
