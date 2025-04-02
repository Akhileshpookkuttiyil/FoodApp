import { useState } from "react";
import { FaBars, FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import { LiaTimesSolid } from "react-icons/lia";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const NavLinks = [
    { href: "/", name: "Home" },
    { href: "/menus", name: "Menus" },
    { href: "/location", name: "Locations" },
    { href: "/category", name: "Blogs" },
    { href: "/contact", name: "Contact" },
    { href: "/about", name: "About" },
  ];

  const handleClick = () => setOpen(!open);
  const handleClose = () => setOpen(false);

  return (
    <nav className="w-full h-[8ch] bg-neutral-50 flex items-center justify-between lg:px-28 md:px-16 sm:px-7 px-4 fixed top-0 z-50 shadow-md">
      {/* Logo */}
      <Link to="/" className="text-2xl text-neutral-800 font-bold">
        <span className="text-orange-400">F</span>oodie
        <span className="text-orange-400">M</span>ania
      </Link>

      {/* Nav Links for Medium and Large Screens */}
      <div className="hidden lg:flex items-center space-x-6 flex-1 justify-center">
        <ul className="list-none flex items-center gap-x-7 text-base text-neutral-600 font-medium">
          {NavLinks.map((link) => (
            <li key={link.href}>
              <Link
                onClick={handleClose}
                to={link.href}
                className={`ease-in-out duration-300 ${
                  location.pathname === link.href
                    ? "text-orange-400 font-semibold"
                    : "hover:text-orange-400"
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Right Side Icons for Medium Screens and Above */}
      <div className="flex items-center space-x-6 lg:space-x-14 md:space-x-8 ml-auto justify-end">
        {/* Search Bar for Large Screens */}
        <div className="hidden md:flex w-[250px] lg:w-[300px] hide-range:hidden rounded-full border border-neutral-400/70 bg-white items-center overflow-hidden">
          <input
            type="text"
            placeholder="Search here..."
            className="flex-1 px-4 py-2 bg-transparent outline-none text-neutral-800 placeholder:text-neutral-400/80"
          />
          <button className="px-4 py-2.5 text-orange-400 flex items-center justify-center bg-neutral-100 hover:bg-orange-400 hover:text-white hover:py-2.5 transition-all duration-300">
            <FaSearch className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Icon */}
        <Link
          to="/cart"
          className="relative text-neutral-800 hover:text-orange-400 transition-all duration-300"
        >
          <FaShoppingCart className="text-xl lg:text-2xl" />
          <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-1.5 py-0.5 rounded-full">
            3
          </span>
        </Link>

        {/* Account Icon */}
        <Link
          to="/account"
          className="text-neutral-800 hover:text-orange-400 transition-all duration-300"
        >
          <FaUser className="text-xl lg:text-2xl" />
        </Link>

        {/* Mobile Menu Toggle Button (Visible in Small Screens) */}
        <button
          onClick={handleClick}
          className="lg:hidden menu-range:flex text-neutral-600 flex items-center justify-end"
        >
          {open ? (
            <LiaTimesSolid className="text-xl" />
          ) : (
            <FaBars className="text-xl" />
          )}
        </button>
      </div>
      {/* Mobile Menu for Small and Medium Screens */}
      <div
        className={`${
          open ? "menu-range:flex flex absolute top-14 left-0 w-full" : "hidden"
        } flex-col lg:hidden bg-neutral-100 shadow-md rounded-md p-4 mt-3`}
      >
        <ul className="hide-range:hidden list-none flex flex-col items-start gap-y-3 text-base text-neutral-600 font-medium">
          {NavLinks.map((link) => (
            <li key={link.href}>
              <Link
                onClick={handleClose}
                to={link.href}
                className={`ease-in-out duration-300 ${
                  location.pathname === link.href
                    ? "text-orange-400 font-semibold"
                    : "hover:text-orange-400"
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Search Bar inside Mobile Menu */}
        <div className="md:hidden menu-range:flex flex w-full mt-4 rounded-full border border-neutral-400/70 bg-white items-center overflow-hidden shadow-sm">
          <input
            type="text"
            placeholder="Search here..."
            className="flex-1 px-4 py-2 bg-transparent outline-none text-neutral-800 placeholder:text-neutral-400/80"
          />
          <button className="px-4 py-2.5 text-orange-400 flex items-center justify-center bg-neutral-100 hover:bg-orange-400 hover:text-white hover:py-2.5 transition-all duration-300">
            <FaSearch className="w-5 h-5" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
