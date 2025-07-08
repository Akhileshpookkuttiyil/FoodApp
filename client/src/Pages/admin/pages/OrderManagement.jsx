const OrderManagement = () => {
  return (
    <div id="ordersContent" className="content-section">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <h2 className="text-xl font-semibold text-gray-900">
              Orders Management
            </h2>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <div className="w-4 h-4 flex items-center justify-center text-gray-400">
                    <i className="ri-search-line text-sm"></i>
                  </div>
                </div>
                <input
                  type="text"
                  placeholder="Search orders..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                />
              </div>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm font-medium whitespace-nowrap !rounded-button">
                <div className="w-4 h-4 flex items-center justify-center inline mr-2">
                  <i className="ri-filter-line text-sm"></i>
                </div>
                Filter
              </button>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm font-medium whitespace-nowrap !rounded-button">
                <div className="w-4 h-4 flex items-center justify-center inline mr-2">
                  <i className="ri-download-line text-sm"></i>
                </div>
                Export
              </button>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Restaurant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    #ORD-12345
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img
                      src="https://readdy.ai/api/search-image?query=happy%20customer%20portrait%20young%20person%20casual%20clothing%20clean%20background%20modern%20style&width=32&height=32&seq=customer1&orientation=squarish"
                      alt="Customer"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900">
                        Alex Thompson
                      </div>
                      <div className="text-sm text-gray-500">
                        alex.thompson@email.com
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    Bella Vista Restaurant
                  </div>
                  <div className="text-sm text-gray-500">Italian Cuisine</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  $45.80
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                    Completed
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">Jan 15, 2024</div>
                  <div className="text-sm text-gray-500">2:30 PM</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button className="text-primary hover:text-blue-700">
                      <div className="w-4 h-4 flex items-center justify-center">
                        <i className="ri-eye-line"></i>
                      </div>
                    </button>
                    <button className="text-gray-600 hover:text-gray-900">
                      <div className="w-4 h-4 flex items-center justify-center">
                        <i className="ri-download-line"></i>
                      </div>
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    #ORD-12346
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img
                      src="https://readdy.ai/api/search-image?query=professional%20woman%20customer%20portrait%20business%20casual%20clean%20background%20modern%20style&width=32&height=32&seq=customer2&orientation=squarish"
                      alt="Customer"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900">
                        Jessica Parker
                      </div>
                      <div className="text-sm text-gray-500">
                        jessica.parker@email.com
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">Golden Dragon</div>
                  <div className="text-sm text-gray-500">Chinese Cuisine</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  $32.50
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                    Processing
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">Jan 15, 2024</div>
                  <div className="text-sm text-gray-500">1:45 PM</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button className="text-primary hover:text-blue-700">
                      <div className="w-4 h-4 flex items-center justify-center">
                        <i className="ri-eye-line"></i>
                      </div>
                    </button>
                    <button className="text-gray-600 hover:text-gray-900">
                      <div className="w-4 h-4 flex items-center justify-center">
                        <i className="ri-download-line"></i>
                      </div>
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    #ORD-12347
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img
                      src="https://readdy.ai/api/search-image?query=young%20man%20customer%20portrait%20casual%20style%20clean%20background%20modern%20photography&width=32&height=32&seq=customer3&orientation=squarish"
                      alt="Customer"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900">
                        Robert Wilson
                      </div>
                      <div className="text-sm text-gray-500">
                        robert.wilson@email.com
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">Taco Fiesta</div>
                  <div className="text-sm text-gray-500">Mexican Cuisine</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  $28.90
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                    Pending
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">Jan 15, 2024</div>
                  <div className="text-sm text-gray-500">12:20 PM</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button className="text-primary hover:text-blue-700">
                      <div className="w-4 h-4 flex items-center justify-center">
                        <i className="ri-eye-line"></i>
                      </div>
                    </button>
                    <button className="text-gray-600 hover:text-gray-900">
                      <div className="w-4 h-4 flex items-center justify-center">
                        <i className="ri-download-line"></i>
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
              Showing 1 to 3 of 8,942 results
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 !rounded-button whitespace-nowrap">
                Previous
              </button>
              <button className="px-3 py-1 text-sm bg-primary text-gray-400 rounded-lg !rounded-button whitespace-nowrap">
                1
              </button>
              <button className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 !rounded-button whitespace-nowrap">
                2
              </button>
              <button className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 !rounded-button whitespace-nowrap">
                3
              </button>
              <button className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 !rounded-button whitespace-nowrap">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderManagement;
