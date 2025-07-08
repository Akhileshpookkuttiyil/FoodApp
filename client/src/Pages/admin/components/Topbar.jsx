import PropTypes from "prop-types";
import { RiNotificationLine } from "react-icons/ri";

const Topbar = ({ toggleSidebar, profileOpen, setProfileOpen }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center">
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={toggleSidebar}
          >
            <i className="ri-menu-line w-5 h-5"></i>
          </button>
          <div className="relative ml-4">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i className="ri-search-line text-sm text-gray-400"></i>
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
            />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-lg hover:bg-gray-100 relative">
            <RiNotificationLine className="w-5 h-5 text-gray-600" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              3
            </span>
          </button>
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100"
            >
              <img
                src="https://readdy.ai/api/search-image?query=professional%20business%20person%20headshot%20portrait%20clean%20background%20modern%20corporate%20style&width=40&height=40&seq=admin-avatar&orientation=squarish"
                alt="Admin"
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="text-sm font-medium text-gray-700">
                John Smith
              </span>
              <i className="ri-arrow-down-s-line text-sm"></i>
            </button>
            {profileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="py-2">
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Settings
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Profile
                  </a>
                  <hr className="my-2" />
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    Logout
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

Topbar.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
  profileOpen: PropTypes.bool.isRequired,
  setProfileOpen: PropTypes.func.isRequired,
};

export default Topbar;
