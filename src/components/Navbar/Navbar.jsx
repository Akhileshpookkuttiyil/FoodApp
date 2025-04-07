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

const Navbar = () => {
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
          const cityName =
            data?.address?.city ||
            data?.address?.town ||
            data?.address?.village ||
            data?.address?.hamlet ||
            data?.address?.county ||
            data?.address?.state ||
            "Unknown";

          setCurrentLocation(cityName);
          console.log("📍 Location fetched:", cityName);
        }
      } catch (error) {
        console.error("❌ Error fetching location data:", error);
        if (isMounted) setCurrentLocation("Unknown Location");
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log("📡 Coordinates:", latitude, longitude);
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

        {/* Location Dropdown */}
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
