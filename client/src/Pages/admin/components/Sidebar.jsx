import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

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
  return (
    <aside
      className={`fixed lg:relative w-64 h-full bg-white shadow-lg z-30 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 transition-transform duration-300`}
    >
      <div className="flex p-6 border-b border-gray-200 justify-center">
      <Link to="/" className="flex text-3xl font-bold tracking-tight select-none">
        {letters.map((letter, i) => (
          <span
            key={i}
            className={`swing ${letter.color}`}
            style={{ animationDelay: `${i * 0.15}s` }}
          >
            {letter.char}
          </span>
        ))}
      </Link>
    </div>

      <nav className="mt-6 px-6 space-y-2">
        {links.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              `flex items-center px-4 py-3 rounded-lg hover:bg-gray-50 hover:text-primary ${
                isActive ? "text-primary bg-blue-50" : "text-gray-700"
              }`
            }
            onClick={() => setIsOpen(false)} // close sidebar on click
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
