import { useEffect } from "react";
import { FaUser, FaShoppingBag, FaStore, FaDollarSign } from "react-icons/fa";
import PropTypes from "prop-types";

// Reusable Summary Card Component
const SummaryCard = ({ label, value, icon, bgColor, change }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{label}</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        <div className="flex items-center mt-2">
          <span className="text-green-600 text-sm font-medium">{change}</span>
          <span className="text-gray-500 text-sm ml-1">vs last month</span>
        </div>
      </div>
      <div
        className={`w-12 h-12 ${bgColor} rounded-lg flex items-center justify-center`}
      >
        {icon}
      </div>
    </div>
  </div>
);

SummaryCard.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  bgColor: PropTypes.string.isRequired,
  change: PropTypes.string.isRequired,
};

// Main Dashboard Component
const Dashboard = () => {
  useEffect(() => {
    document.title = "Dashboard - Admin Panel";
  }, []);

  return (
    <div className="flex-1 flex flex-col lg:ml-0">
      <main className="flex-1 overflow-auto p-6">
        <div id="dashboardContent" className="content-section">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Dashboard Overview
            </h1>
            <p className="text-gray-600">
              Welcome back! Here is what is happening with your platform today.
            </p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <SummaryCard
              label="Total Users"
              value="24,567"
              icon={<FaUser className="text-blue-600 text-xl" />}
              bgColor="bg-blue-100"
              change="+12.5%"
            />
            <SummaryCard
              label="Total Orders"
              value="8,942"
              icon={<FaShoppingBag className="text-green-600 text-xl" />}
              bgColor="bg-green-100"
              change="+8.2%"
            />
            <SummaryCard
              label="Active Sellers"
              value="1,234"
              icon={<FaStore className="text-purple-600 text-xl" />}
              bgColor="bg-purple-100"
              change="+5.7%"
            />
            <SummaryCard
              label="Revenue"
              value="$487,234"
              icon={<FaDollarSign className="text-orange-600 text-xl" />}
              bgColor="bg-orange-100"
              change="+15.3%"
            />
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Revenue Trends
              </h3>
              <div id="revenueChart" style={{ height: 300 }}></div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Order Statistics
              </h3>
              <div id="orderChart" style={{ height: 300 }}></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
