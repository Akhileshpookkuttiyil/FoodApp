import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import {
  FaBars,
  FaSearch,
  FaShoppingCart,
  FaUser,
  FaMapMarkerAlt,
  FaEnvelope,
} from "react-icons/fa";
import toast from "react-hot-toast";
import { LiaTimesSolid } from "react-icons/lia";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../Context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const { cartItems, clearCart, user, setUser, setShowLogin, axios } =
    useAppContext();
  const [isLoading, setIsLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const totalQty = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const [open, setOpen] = useState(false);
  const [showLocation, setShowLocation] = useState(false);
  const [currentLocation, setCurrentLocation] = useState("Fetching...");
  const location = useLocation();

  const NavLinks = useMemo(
    () => [
      { href: "/", name: "Home" },
      { href: "/menus", name: "Menus" },
      { href: "/location", name: "Locations" },
      { href: "/contact", name: "Contact" },
      { href: "/about", name: "About" },
    ],
    []
  );

  const handleClick = useCallback(() => setOpen((prev) => !prev), []);
  const handleClose = useCallback(() => setOpen(false), []);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery(""); // clear input after search
      setOpen(false); // close mobile menu if open
    }
  };

  const logoutUser = async () => {
    try {
      const { data } = await axios.post("/api/user/logout");

      if (data.success) {
        navigate("/");
        toast.success("Logged out successfully.");
      } else {
        toast.error(data.message || "Logout response was not successful.");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Logout failed. Please try again."
      );
    } finally {
      clearCart();
      setUser(null);
    }
  };

  const handleRoute = (e) => {
    setOpen(false);
    e.preventDefault();
    if (user) {
      navigate("/cart");
    } else {
      setShowLogin(true);
    }
  };

  useEffect(() => {
    setDropdownOpen(false);
  }, [user]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Close if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    const fetchLocation = async (lat, lon) => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/location/get?lat=${lat}&lon=${lon}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch location from backend");
        }

        const data = await response.json();
        console.log("Reverse Geocode Data:", data);

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
          "Unknown";
        setCurrentLocation(localName);
      } catch (err) {
        console.error(err);
        setCurrentLocation("Unknown");
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          if (isMounted) fetchLocation(coords.latitude, coords.longitude);
        },
        (error) => {
          console.log(error);
          if (isMounted) setCurrentLocation("not found");
        }
      );
    } else {
      if (isMounted) setCurrentLocation("Geolocation not supported");
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
        <ul className="flex text-base text-neutral-600 font-medium gap-x-5 lg:gap-x-7 xl:gap-x-14 2xl:gap-x-20">
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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search here..."
            className="flex-1 px-4 py-2 bg-transparent outline-none text-neutral-800 placeholder:text-neutral-400/80"
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2.5 text-orange-400 flex items-center justify-center bg-neutral-100 hover:bg-orange-400 hover:text-white transition-all duration-300"
          >
            <FaSearch className="w-5 h-5" />
          </button>
        </div>
        <div className="flex items-center gap-8 menu-range:hidden xsm:hidden">
          {/* Cart */}
          <Link
            onClick={handleRoute}
            className={`relative text-neutral-800 hover:text-orange-400 transition-all duration-300 ${
              location.pathname === "/cart" ? "text-orange-500" : ""
            }`}
          >
            <FaShoppingCart className="text-xl lg:text-2xl" />

            {user && isLoading ? (
              // Show spinner while loading
              <div className="absolute -top-2 -right-2 w-3 h-3 border-4 border-t-transparent border-orange-300 border-solid rounded-full animate-spin"></div>
            ) : (
              // Show cart count only if the user is logged in
              user &&
              totalQty > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-300 text-white text-xs px-1.5 py-0.5 rounded-full">
                  {totalQty}
                </span>
              )
            )}
          </Link>

          {/* User Login / Logout */}
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 hover:text-orange-400 transition"
              >
                <FaUser className="text-xl" />
              </button>

              {dropdownOpen && (
                <div
                  className="fixed right-4 top-[72px] bg-neutral-50 p-3 shadow-lg z-50 w-64 border-2 border-gray-100"
                  style={{ maxWidth: "90vw" }} // optional for smaller screens
                >
                  {/* User Info */}
                  <div className="flex gap-2 items-start mb-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors duration-200">
                    <div
                      className="bg-center bg-no-repeat bg-cover aspect-square min-h-20 w-25 rounded-tl-md rounded-bl-md rounded-tr-none rounded-br-none"
                      style={{
                        backgroundImage: `url('${user.profileImage}')`,
                      }}
                    ></div>

                    {/* Limit width and allow truncation */}
                    <div className="flex flex-col justify-center min-h-20 max-w-[200px] overflow-hidden gap-2">
                      <p
                        className="text-[#757575] text-xs font-bold flex items-center gap-1.5 truncate whitespace-nowrap"
                        title={user.fullName}
                      >
                        <FaUser className="text-[#757575d2]" />
                        {user.fullName}
                      </p>
                      <hr className="border-gray-300" />
                      <p
                        className="text-[#757575] text-xs flex items-center gap-1.5 truncate whitespace-nowrap"
                        title={user.email}
                      >
                        <FaEnvelope className="text-[#757575d2]" />
                        {user.email}
                      </p>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => {
                        navigate("/user/edit-profile");
                        setDropdownOpen(false);
                      }}
                      className="flex items-center gap-4 px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded"
                    >
                      <span className="text-[#141414] text-base">Profile</span>
                    </button>

                    <button
                      onClick={() => {
                        navigate("/orders");
                        setDropdownOpen(false);
                      }}
                      className="flex items-center gap-4 px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded"
                    >
                      <span className="text-[#141414] text-base">
                        My Orders
                      </span>
                    </button>

                    <button
                      onClick={() => {
                        logoutUser();
                        setDropdownOpen(false);
                      }}
                      className="flex items-center gap-4 px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded text-red-500"
                    >
                      <span className="material-icons text-red-500">
                        logout
                      </span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => {
                setShowLogin(true);
                setOpen(false);
              }}
              className="hover:text-orange-400"
            >
              <FaUser className="text-xl" />
            </button>
          )}
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
            onClick={handleRoute}
            className={`relative text-neutral-800 hover:text-orange-400 transition-all duration-300 ${
              location.pathname === "/cart" ? "text-orange-500" : ""
            }`}
          >
            <FaShoppingCart className="text-xl lg:text-2xl" />

            {user && isLoading ? (
              // Show spinner while loading
              <div className="absolute -top-2 -right-2 w-3 h-3 border-4 border-t-transparent border-orange-300 border-solid rounded-full animate-spin"></div>
            ) : (
              // Show cart count only if the user is logged in
              user &&
              totalQty > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-300 text-white text-xs px-1.5 py-0.5 rounded-full">
                  {totalQty}
                </span>
              )
            )}
          </Link>

          {/* User Login */}
          {user ? (
            <div className="relative">
              <button
                className="flex items-center gap-2 hover:text-orange-400 transition"
                onClick={() => setDropdownOpen(!dropdownOpen)} // Toggle dropdown visibility
              >
                <FaUser className="text-xl" />
              </button>

              {/* Dropdown menu using <ul> and <li> */}
              {dropdownOpen && (
                <ul className="absolute mt-4 bg-white text-black shadow-md rounded-md w-48">
                  <li
                    onClick={() => {
                      setOpen(false);
                    }}
                    className="cursor-pointer text-sm text-black hover:bg-gray-100 py-2 px-4"
                  >
                    Profile
                  </li>
                  <li
                    onClick={() => {
                      setOpen(false);
                    }}
                    className="cursor-pointer text-sm text-black hover:bg-gray-100 py-2 px-4"
                  >
                    Settings
                  </li>
                  <li
                    onClick={() => {
                      logoutUser();
                      setOpen(false);
                    }}
                    className="cursor-pointer text-sm text-red-500 hover:bg-red-100 py-2 px-4"
                  >
                    Logout
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <button
              onClick={() => {
                setShowLogin(true);
                setOpen(false);
              }}
              className="hover:text-orange-400"
            >
              <FaUser className="text-xl" />
            </button>
          )}

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
