import { useState } from "react";
import { FaBars, FaSearch } from "react-icons/fa";
import { LiaTimesSolid } from "react-icons/lia";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation(); // Get the current path

  const NavLinks = [
    { href: "/", name: "Home" },
    { href: "/menus", name: "Menus" },
    { href: "/category", name: "Category" },
    { href: "/location", name: "Locations" },
    { href: "/contact", name: "Contact" },
  ];

  const handleClick = () => setOpen(!open);
  const handleClose = () => setOpen(false);

  return (
    <nav className="w-full h-[8ch] bg-neutral-50 flex items-center md:flex-row lg:px-28 md:px-16 sm:px-7 px-4 fixed top-0 z-50 shadow">
      {/* Logo */}
      <Link to="/" className="text-2xl text-neutral-800 font-bold mr-16">
        <span className="text-orange-400">F</span>oodie
        <span className="text-orange-400">M</span>ania
      </Link>

      {/* Toggle Button (for mobile) */}
      <button
        onClick={handleClick}
        className="flex-1 lg:hidden text-neutral-600 flex items-center justify-end"
      >
        {open ? (
          <LiaTimesSolid className="text-xl" />
        ) : (
          <FaBars className="text-xl" />
        )}
      </button>

      {/* Nav Links */}
      <div
        className={`${
          open
            ? "flex absolute top-14 left-0 w-full h-auto md:h-auto md:relative"
            : "hidden"
        } flex-1 md:flex flex-col md:flex-row gap-x-5 gap-y-2 md:items-center md:p-0 sm:p-4 p-4 justify-between md:bg-transparent bg-neutral-100 md:shadow-none shadow-md rounded-md`}
      >
        <ul className="list-none flex md:items-center items-start gap-x-7 gap-y-1 flex-wrap md:flex-row flex-col text-base text-neutral-600 font-medium">
          {NavLinks.map((link) => (
            <li key={link.href}>
              <Link
                onClick={handleClose}
                to={link.href}
                className={`ease-in-out duration-300 ${
                  location.pathname === link.href
                    ? "text-orange-400 font-semibold" // Active link style
                    : "hover:text-orange-400"
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Search & Order Button */}
        <div className="flex md:items-center items-start gap-x-5 gap-y-2 flex-wrap md:flex-row flex-col text-base font-medium text-neutral-800">
          <div className="w-[300px] px-3 py-1.5 rounded-full border border-neutral-400/70 bg-transparent flex items-center gap-x-2">
            <FaSearch className="w-3.5 h-3.5 text-orange-300" />
            <input
              type="text"
              placeholder="Search Here"
              className="flex-1 bg-transparent outline-none text-base text-neutral-800 font-normal placeholder:text-neutral-400/80"
            />
          </div>
          <button className="bg-orange-400 px-6 py-2 rounded-full text-sm text-neutral-50 font-medium hover:bg-orange-600/5 hover:text-orange-600 ease-in-out duration-300 border border-orange-500">
            Order Now
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
