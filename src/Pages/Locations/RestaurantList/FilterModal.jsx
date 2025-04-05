import React, { useState } from "react";

const FilterModal = ({ isOpen, onClose, onApply, filters, setFilters }) => {
  const [activeTab, setActiveTab] = useState("sort");

  if (!isOpen) return null;

  const handleChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  const handleToggle = (key) => {
    setFilters({ ...filters, [key]: !filters[key] });
  };

  const handleClear = () => {
    setFilters({
      sortBy: "none",
      rating: "none",
      distance: "none",
      happyHours: false,
      drinksNight: false,
    });
    setActiveTab("sort");
  };

  const leftTabs = [
    { key: "sort", label: "Sort By" },
    { key: "rating", label: "Ratings" },
    { key: "distance", label: "Distance" },
    { key: "offers", label: "More Filters" },
  ];

  const rightControls = {
    sort: (
      <select
        value={filters.sortBy}
        onChange={(e) => handleChange("sortBy", e.target.value)}
        className="w-full p-2 border rounded text-sm"
      >
        <option value="none">None</option>
        <option value="rating">Ratings (High to Low)</option>
        <option value="distance">Distance (Nearest)</option>
        <option value="deliveryTime">Delivery Time (Fastest)</option>
      </select>
    ),
    rating: (
      <select
        value={filters.rating}
        onChange={(e) => handleChange("rating", e.target.value)}
        className="w-full p-2 border rounded text-sm"
      >
        <option value="none">None</option>
        <option value="4">4.0+ Stars</option>
        <option value="3">3.0+ Stars</option>
        <option value="2">2.0+ Stars</option>
      </select>
    ),
    distance: (
      <select
        value={filters.distance}
        onChange={(e) => handleChange("distance", e.target.value)}
        className="w-full p-2 border rounded text-sm"
      >
        <option value="none">None</option>
        <option value="2">Within 2 km</option>
        <option value="5">Within 5 km</option>
        <option value="10">Within 10 km</option>
      </select>
    ),
    offers: (
      <div className="space-y-4 text-sm w-full">
        <div className="flex justify-between items-center">
          <span>Happy Hours</span>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={filters.happyHours}
              onChange={() => handleToggle("happyHours")}
              className="sr-only peer"
            />
            <div className="w-10 h-5 bg-gray-300 rounded-full peer peer-checked:bg-orange-500 relative">
              <div className="absolute left-1 top-0.5 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5" />
            </div>
          </label>
        </div>
        <div className="flex justify-between items-center">
          <span>Drinks Night</span>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={filters.drinksNight}
              onChange={() => handleToggle("drinksNight")}
              className="sr-only peer"
            />
            <div className="w-10 h-5 bg-gray-300 rounded-full peer peer-checked:bg-orange-500 relative">
              <div className="absolute left-1 top-0.5 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5" />
            </div>
          </label>
        </div>
      </div>
    ),
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center">
      <div className="bg-white rounded-xl shadow-lg w-[90%] max-w-md h-[90%] max-h-[400px] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-base font-semibold text-gray-800">Filters</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-red-500 text-xl font-bold"
          >
            &times;
          </button>
        </div>

        {/* Body */}
        <div className="flex flex-grow h-full overflow-hidden">
          {/* Left Tabs */}
          <div className="w-1/3 bg-gray-100 border-r p-2 text-sm overflow-y-auto">
            {leftTabs.map((tab) => (
              <div
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`p-2 rounded cursor-pointer mb-1 transition ${
                  activeTab === tab.key
                    ? "bg-orange-100 text-orange-600 font-medium"
                    : "hover:bg-gray-200 text-gray-700"
                }`}
              >
                {tab.label}
              </div>
            ))}
          </div>

          {/* Right Controls */}
          <div className="w-2/3 p-4 overflow-y-auto">
            {rightControls[activeTab]}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center p-3 border-t text-sm">
          <button
            onClick={handleClear}
            className="px-3 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          >
            Clear All
          </button>
          <button
            onClick={onApply}
            className="px-4 py-1 bg-orange-500 text-white rounded hover:bg-orange-600"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
