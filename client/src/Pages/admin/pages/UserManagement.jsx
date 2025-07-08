const Users = () => {
  return (
    <div className="content-section">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <h2 className="text-xl font-semibold text-gray-900">
              Users Management
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
                  placeholder="Search users..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                />
              </div>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm font-medium whitespace-nowrap !rounded-button">
                <div className="w-4 h-4 flex items-center justify-center inline mr-2">
                  <i className="ri-filter-line text-sm"></i>
                </div>
                Filter
              </button>
              <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 text-sm font-medium whitespace-nowrap !rounded-button">
                <div className="w-4 h-4 flex items-center justify-center inline mr-2">
                  <i className="ri-add-line text-sm"></i>
                </div>
                Add User
              </button>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Joined
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[
                {
                  id: 12345,
                  name: "Sarah Johnson",
                  email: "sarah.johnson@email.com",
                  status: "Active",
                  statusColor: "green",
                  joined: "Jan 15, 2024",
                  imgSrc:
                    "https://readdy.ai/api/search-image?query=professional%20headshot%20portrait%20young%20woman%20business%20casual%20clean%20background&width=40&height=40&seq=user1&orientation=squarish",
                },
                {
                  id: 12346,
                  name: "Michael Chen",
                  email: "michael.chen@email.com",
                  status: "Pending",
                  statusColor: "yellow",
                  joined: "Jan 12, 2024",
                  imgSrc:
                    "https://readdy.ai/api/search-image?query=professional%20headshot%20portrait%20middle%20aged%20man%20business%20suit%20clean%20background&width=40&height=40&seq=user2&orientation=squarish",
                },
                {
                  id: 12347,
                  name: "Emma Rodriguez",
                  email: "emma.rodriguez@email.com",
                  status: "Active",
                  statusColor: "green",
                  joined: "Jan 10, 2024",
                  imgSrc:
                    "https://readdy.ai/api/search-image?query=professional%20headshot%20portrait%20young%20woman%20casual%20attire%20clean%20background%20modern%20style&width=40&height=40&seq=user3&orientation=squarish",
                },
              ].map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        src={user.imgSrc}
                        alt={user.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {user.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          ID: #{user.id}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full bg-${user.statusColor}-100 text-${user.statusColor}-800`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.joined}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        className="text-primary hover:text-blue-700"
                        aria-label={`View ${user.name}`}
                      >
                        <div className="w-4 h-4 flex items-center justify-center">
                          <i className="ri-eye-line"></i>
                        </div>
                      </button>
                      <button
                        className="text-gray-600 hover:text-gray-900"
                        aria-label={`Edit ${user.name}`}
                      >
                        <div className="w-4 h-4 flex items-center justify-center">
                          <i className="ri-edit-line"></i>
                        </div>
                      </button>
                      <button
                        className="text-red-600 hover:text-red-900"
                        aria-label={`Delete ${user.name}`}
                      >
                        <div className="w-4 h-4 flex items-center justify-center">
                          <i className="ri-delete-bin-line"></i>
                        </div>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing 1 to 3 of 24,567 results
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

export default Users;
