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
  const [showSearchModal, setShowSearchModal] = useState(false);
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
        console.error("Error fetching location data:", error);
        if (isMounted) setCurrentLocation("Unknown Location");
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchLocation(latitude, longitude);
        },
        (error) => {
          console.error("⚠️ Geolocation error:", error.message);
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

      {/* Nav Links */}
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

      {/* Right Icons */}
      <div className="flex items-center space-x-6 lg:space-x-14 md:space-x-8 ml-auto justify-end">
        {/* Full Search Bar */}
        <div className="hidden md:flex menu-range:hidden ml-4 w-[250px] lg:w-[300px] rounded-full border border-neutral-400/70 bg-white items-center overflow-hidden">
          <input
            type="text"
            placeholder="Search here..."
            className="flex-1 px-4 py-2 bg-transparent outline-none text-neutral-800 placeholder:text-neutral-400/80"
          />
          <button className="px-4 py-2.5 text-orange-400 flex items-center justify-center bg-neutral-100 hover:bg-orange-400 hover:text-white transition-all duration-300">
            <FaSearch className="w-5 h-5" />
          </button>
        </div>

        {/* Search Icon in menu-range */}
        <button
          onClick={() => setShowSearchModal(true)}
          className="hidden menu-range:flex text-orange-500 hover:text-orange-600"
        >
          <FaSearch className="text-xl" />
        </button>

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

        {/* Login */}
        <button
          onClick={() => setShowLogin(true)}
          className="text-neutral-800 hover:text-orange-400 transition-all duration-300"
        >
          <FaUser className="text-xl lg:text-2xl" />
        </button>

        {/* Location */}
        <div className="relative">
          <button
            aria-label="Show location"
            onClick={() => setShowLocation(!showLocation)}
            className="flex items-center text-gray-800 hover:text-orange-500 transition-all duration-300"
          >
            <FaMapMarkerAlt className="text-sm lg:text-sm" />
            <span>{currentLocation}</span>
          </button>

          {showLocation && (
            <div className="absolute top-10 right-0 bg-white shadow-md rounded-md p-3 w-40 text-neutral-700">
              <p className="text-sm">Your Location:</p>
              <p className="font-semibold">{currentLocation}</p>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={handleClick}
          className="lg:hidden text-neutral-600 flex items-center justify-end"
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
        className={`${
          open ? "flex absolute top-14 left-0 w-full" : "hidden"
        } flex-col lg:hidden bg-neutral-100 shadow-md rounded-md p-4 mt-3`}
      >
        <ul className="list-none flex flex-col items-start gap-y-3 text-base text-neutral-600 font-medium">
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

        {/* Search (Mobile) */}
        <div className="md:hidden flex w-full mt-4 rounded-full border border-neutral-400/70 bg-white items-center overflow-hidden shadow-sm">
          <input
            type="text"
            placeholder="Search here..."
            className="flex-1 px-4 py-2 bg-transparent outline-none text-neutral-800 placeholder:text-neutral-400/80"
          />
          <button className="px-4 py-2.5 text-orange-400 flex items-center justify-center bg-neutral-100 hover:bg-orange-400 hover:text-white transition-all duration-300">
            <FaSearch className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Search Modal (for menu-range screens) */}
      {showSearchModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-[99]">
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-md relative">
            <button
              onClick={() => setShowSearchModal(false)}
              className="absolute top-2 right-3 text-xl text-neutral-600 hover:text-red-400"
            >
              <LiaTimesSolid />
            </button>
            <input
              type="text"
              placeholder="Search food or restaurants..."
              className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 ring-orange-400"
            />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
