function RestaurantsContent() {
  return (
    <div id="restaurantsContent" className="content-section">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <h2 className="text-xl font-semibold text-gray-900">
              Restaurants Management
            </h2>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <div className="w-4 h-4 flex items-center justify-center text-gray-400">
                    <i className="ri-search-line text-sm" />
                  </div>
                </div>
                <input
                  type="text"
                  placeholder="Search restaurants..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                />
              </div>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm font-medium whitespace-nowrap rounded-button">
                <div className="w-4 h-4 flex items-center justify-center inline mr-2">
                  <i className="ri-filter-line text-sm" />
                </div>
                Filter
              </button>
              <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 text-sm font-medium whitespace-nowrap rounded-button">
                <div className="w-4 h-4 flex items-center justify-center inline mr-2">
                  <i className="ri-add-line text-sm" />
                </div>
                Add Restaurant
              </button>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Restaurant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img
                      src="https://readdy.ai/api/search-image?query=elegant%20italian%20restaurant%20interior%20dining%20room%20warm%20lighting%20modern%20design%20clean%20background&width=50&height=50&seq=restaurant1&orientation=squarish"
                      alt="Restaurant"
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        Bella Vista Restaurant
                      </div>
                      <div className="text-sm text-gray-500">ID: #R12345</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    Downtown Manhattan
                  </div>
                  <div className="text-sm text-gray-500">New York, NY</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                    Italian
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-4 h-4 flex items-center justify-center text-yellow-400 mr-1">
                      <i className="ri-star-fill" />
                    </div>
                    <span className="text-sm text-gray-900">4.8</span>
                    <span className="text-sm text-gray-500 ml-1">(234)</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                    Active
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button className="text-primary hover:text-blue-700">
                      <div className="w-4 h-4 flex items-center justify-center">
                        <i className="ri-eye-line" />
                      </div>
                    </button>
                    <button className="text-gray-600 hover:text-gray-900">
                      <div className="w-4 h-4 flex items-center justify-center">
                        <i className="ri-edit-line" />
                      </div>
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <div className="w-4 h-4 flex items-center justify-center">
                        <i className="ri-close-line" />
                      </div>
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img
                      src="https://readdy.ai/api/search-image?query=modern%20chinese%20restaurant%20interior%20red%20lanterns%20traditional%20decor%20elegant%20dining%20room%20clean%20background&width=50&height=50&seq=restaurant2&orientation=squarish"
                      alt="Restaurant"
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        Golden Dragon
                      </div>
                      <div className="text-sm text-gray-500">ID: #R12346</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">Chinatown</div>
                  <div className="text-sm text-gray-500">San Francisco, CA</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
                    Chinese
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-4 h-4 flex items-center justify-center text-yellow-400 mr-1">
                      <i className="ri-star-fill" />
                    </div>
                    <span className="text-sm text-gray-900">4.6</span>
                    <span className="text-sm text-gray-500 ml-1">(189)</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                    Active
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button className="text-primary hover:text-blue-700">
                      <div className="w-4 h-4 flex items-center justify-center">
                        <i className="ri-eye-line" />
                      </div>
                    </button>
                    <button className="text-gray-600 hover:text-gray-900">
                      <div className="w-4 h-4 flex items-center justify-center">
                        <i className="ri-edit-line" />
                      </div>
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <div className="w-4 h-4 flex items-center justify-center">
                        <i className="ri-close-line" />
                      </div>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing 1 to 2 of 456 results
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 rounded-button whitespace-nowrap">
                Previous
              </button>
              <button className="px-3 py-1 text-sm bg-primary text-gray-400 rounded-lg rounded-button whitespace-nowrap">
                1
              </button>
              <button className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 rounded-button whitespace-nowrap">
                2
              </button>
              <button className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 rounded-button whitespace-nowrap">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RestaurantsContent;
