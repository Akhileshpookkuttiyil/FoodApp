import { useState, useEffect, useCallback, useMemo } from "react";
import {
  FaBars,
  FaSearch,
  FaShoppingCart,
  FaUser,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { LiaTimesSolid } from "react-icons/lia";
import { Link, useLocation } from "react-router-dom";

const Navbar = ({ setShowLogin }) => {
  const [open, setOpen] = useState(false);
  const [showLocation, setShowLocation] = useState(false);
  const [currentLocation, setCurrentLocation] = useState("Fetching...");
  const location = useLocation();

  const NavLinks = useMemo(
    () => [
      { href: "/", name: "Home" },
      { href: "/menus", name: "Menus" },
      { href: "/location", name: "Locations" },
      { href: "/blogs", name: "Blogs" },
      { href: "/contact", name: "Contact" },
      { href: "/about", name: "About" },
    ],
    []
  );

  const handleClick = useCallback(() => setOpen((prev) => !prev), []);
  const handleClose = useCallback(() => setOpen(false), []);

  useEffect(() => {
    let isMounted = true;

    const fetchLocation = async (lat, lon) => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
        );
        const data = await response.json();

        if (isMounted) {
          const address = data?.address;
          const localName =
            address?.village ||
            address?.hamlet ||
            address?.town ||
            address?.suburb ||
            address?.city ||
            address?.county ||
            address?.state_district ||
            address?.state ||
            "Unknown Location";

          setCurrentLocation(localName);
        }
      } catch (error) {
        console.error("Error fetching location:", error);
        if (isMounted) setCurrentLocation("Unknown Location");
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          fetchLocation(coords.latitude, coords.longitude);
        },
        (error) => {
          console.error("Geolocation error:", error.message);
          if (isMounted) setCurrentLocation("Location not found");
        }
      );
    } else {
      setCurrentLocation("Geolocation not supported");
    }

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <nav className="w-full h-[8ch] bg-neutral-50 flex items-center justify-between lg:px-5 md:px-16 sm:px-7 px-4 fixed top-0 z-50 shadow-md">
      {/* Logo */}
      <Link to="/" className="text-3xl text-neutral-800 font-bold">
        <span className="text-orange-400">F</span>oodie
        <span className="text-orange-400">M</span>ania
      </Link>

      {/* Nav Links (center) */}
      <div className="hidden lg:flex items-center flex-1 justify-center">
        <ul className="flex gap-x-7 text-base text-neutral-600 font-medium">
          {NavLinks.map((link) => (
            <li key={link.href}>
              <Link
                to={link.href}
                onClick={handleClose}
                className={`duration-300 ${
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

      {/* Right section */}
      <div className="flex items-center space-x-4 md:space-x-6 lg:space-x-10 justify-end ml-auto">
        {/* Search (hidden between 1024px–1300px using menu-range) */}
        <div className="hidden md:flex items-center border border-neutral-400/70 rounded-full bg-white overflow-hidden w-[250px] lg:w-[300px]">
          <input
            type="text"
            placeholder="Search here..."
            className="flex-1 px-4 py-2 bg-transparent outline-none text-neutral-800 placeholder:text-neutral-400/80"
          />
          <button className="px-4 py-2.5 text-orange-400 flex items-center justify-center bg-neutral-100 hover:bg-orange-400 hover:text-white transition-all duration-300">
            <FaSearch className="w-5 h-5" />
          </button>
        </div>
        <div className="flex items-center gap-8 menu-range:hidden xsm:hidden">
          {/* Cart */}
          <Link
            to="/cart"
            className="relative text-neutral-800 hover:text-orange-400 transition-all duration-300"
          >
            <FaShoppingCart className="text-xl lg:text-2xl" />
            <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-1.5 py-0.5 rounded-full">
              3
            </span>
          </Link>

          {/* User Login */}
          <button
            onClick={() => setShowLogin(true)}
            className="text-neutral-800 hover:text-orange-400 transition-all duration-300"
          >
            <FaUser className="text-xl lg:text-2xl" />
          </button>

          {/* Location */}
          <div className="relative">
            <button
              onClick={() => setShowLocation(!showLocation)}
              className="flex items-center text-gray-800 hover:text-orange-500 transition-all duration-300"
            >
              <FaMapMarkerAlt className="text-sm mr-1" />
              <span className="text-sm">{currentLocation}</span>
            </button>

            {showLocation && (
              <div className="absolute top-10 right-0 bg-white shadow-md rounded-md p-3 w-44 text-neutral-700 z-40">
                <p className="text-sm">Your Location:</p>
                <p className="font-semibold">{currentLocation}</p>
              </div>
            )}
          </div>
        </div>

        {/* Hamburger */}
        <button
          onClick={handleClick}
          className="lg:hidden menu-range:flex text-neutral-600"
        >
          {open ? (
            <LiaTimesSolid className="text-xl" />
          ) : (
            <FaBars className="text-xl" />
          )}
        </button>
      </div>
      {/* Mobile Menu */}
      <div
        className={`absolute top-[100%] left-0 w-full flex-col bg-neutral-100 shadow-md p-4 z-40 lg:hidden ${
          open ? "flex menu-range:flex" : "hidden"
        }`}
      >
        {/* Nav Links (hidden in menu-range) */}
        <ul className="flex flex-col gap-y-3 text-base text-neutral-600 font-medium menu-range:hidden">
          {NavLinks.map((link) => (
            <li key={link.href}>
              <Link
                to={link.href}
                onClick={handleClose}
                className={`duration-300 ${
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

        {/* Search Bar (hidden in menu-range) */}
        <div className="flex w-full mt-4 rounded-full border border-neutral-400/70 bg-white items-center overflow-hidden menu-range:hidden md:hidden">
          <input
            type="text"
            placeholder="Search here..."
            className="flex-1 px-4 py-2 bg-transparent outline-none text-neutral-800 placeholder:text-neutral-400/80"
          />
          <button className="px-4 py-2.5 text-orange-400 flex items-center justify-center bg-neutral-100 hover:bg-orange-400 hover:text-white transition-all duration-300">
            <FaSearch className="w-5 h-5" />
          </button>
        </div>

        {/* Action Icons */}
        <div className="hidden xsm:flex menu-range:flex items-center justify-between mt-4 px-1 text-neutral-800">
          {/* Cart */}
          <Link
            to="/cart"
            className="relative hover:text-orange-400 transition-all duration-300"
          >
            <FaShoppingCart className="text-xl lg:text-2xl" />
            <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-1.5 py-0.5 rounded-full">
              3
            </span>
          </Link>

          {/* User Login */}
          <button
            onClick={() => setShowLogin(true)}
            className="hover:text-orange-400 transition-all duration-300"
          >
            <FaUser className="text-xl lg:text-2xl" />
          </button>

          {/* Location */}
          <div className="relative">
            <button
              onClick={() => setShowLocation(!showLocation)}
              className="flex items-center hover:text-orange-500 transition-all duration-300"
            >
              <FaMapMarkerAlt className="text-sm mr-1" />
              <span className="text-sm">{currentLocation}</span>
            </button>

            {/* Location Dropdown */}
            {showLocation && (
              <div className="absolute top-10 right-0 bg-white shadow-md rounded-md p-3 w-44 text-neutral-700 z-40">
                <p className="text-sm">Your Location:</p>
                <p className="font-semibold">{currentLocation}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
