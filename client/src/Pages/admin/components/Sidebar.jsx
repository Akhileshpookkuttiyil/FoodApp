import { NavLink, Link } from "react-router-dom";
import PropTypes from "prop-types";

const letters = [
  { char: "F", color: "text-orange-500" },
  { char: "o", color: "" },
  { char: "o", color: "" },
  { char: "d", color: "" },
  { char: "i", color: "" },
  { char: "e", color: "" },
  { char: "M", color: "text-orange-500" },
  { char: "a", color: "" },
  { char: "n", color: "" },
  { char: "i", color: "" },
  { char: "a", color: "" },
];

const links = [
  { name: "Dashboard", icon: "ri-dashboard-line", path: "/admin/dashboard" },
  { name: "Users", icon: "ri-user-line", path: "/admin/users" },
  { name: "Sellers", icon: "ri-store-line", path: "/admin/sellers" },
  {
    name: "Restaurants",
    icon: "ri-restaurant-line",
    path: "/admin/restaurants",
  },
  { name: "Orders", icon: "ri-shopping-bag-line", path: "/admin/orders" },
];

const Sidebar = ({ isOpen, setIsOpen }) => {
  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <aside
      className={`fixed lg:relative w-64 h-full bg-white shadow-lg z-30 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 transition-transform duration-300`}
    >
      {/* Logo */}
      <div className="flex p-6 border-b border-gray-200 justify-center">
         <Link
          to="/"
          onClick={handleLogoClick}
          className="flex text-2xl font-extrabold tracking-wide select-none"
        >
          {letters.map((letter, i) => (
            <span key={i} className={`${letter.color}`}>
              {letter.char}
            </span>
          ))}
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="mt-6 px-6 space-y-2">
        {links.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `flex items-center px-4 py-3 rounded-lg hover:bg-gray-50 hover:text-primary ${
                isActive ? "text-primary bg-blue-50" : "text-gray-700"
              }`
            }
          >
            <div className="w-5 h-5 mr-3 flex items-center justify-center">
              <i className={link.icon}></i>
            </div>
            {link.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default Sidebar;
