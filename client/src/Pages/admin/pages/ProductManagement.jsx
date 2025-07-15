import { useEffect, useState } from "react";
import { useAppContext } from "../../../Context/AppContext";
import "remixicon/fonts/remixicon.css";

function ProductsContent() {
  const { axios, currency } = useAppContext();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination states
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      setError(null);
      try {
        // Pass pagination params
        const res = await axios.get(
          `/api/product/list?page=${page}&limit=${limit}`
        );

        if (res.data.success) {
          setProducts(res.data.data);
          setTotalPages(res.data.pages || 1);
        } else {
          setError("Failed to fetch products");
        }
      } catch (err) {
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to fetch products"
        );
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [axios, page]);

  if (loading) return <p className="p-6">Loading products...</p>;
  if (error) return <p className="p-6 text-red-600">Error: {error}</p>;

  const thClassCenter =
    "px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider";
  const thClassLeft =
    "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider";
  const tdClassCenter = "px-6 py-4 whitespace-nowrap text-center";
  const tdClassLeft = "px-6 py-4 whitespace-nowrap text-left";

  // Pagination handlers
  const handlePrev = () => setPage((p) => Math.max(1, p - 1));
  const handleNext = () => setPage((p) => Math.min(totalPages, p + 1));

  return (
    <div id="productsContent" className="content-section">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <h2 className="text-xl font-semibold text-gray-900">
              Products Management
            </h2>

            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
              {/* Search */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="ri-search-line text-sm text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search products..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                />
              </div>

              {/* Filter */}
              <button className="px-4 flex items-center justify-center bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm font-medium gap-1">
                <i className="ri-filter-line text-sm" />
                Filter
              </button>

              {/* Add Product */}
              <button className="px-4 flex items-center justify-center bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm font-medium gap-1">
                <i className="ri-add-line text-sm" />
                Add Product
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className={thClassLeft}>Product</th>
                <th className={thClassCenter}>Category</th>
                <th className={thClassCenter}>Price</th>
                <th className={thClassCenter}>Stock</th>
                <th className={thClassCenter}>Status</th>
                <th className={thClassCenter}>Actions</th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {products.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No products found.
                  </td>
                </tr>
              ) : (
                products.map((p) => (
                  <tr key={p._id}>
                    <td className={tdClassLeft}>
                      <div className="flex items-center">
                        <img
                          src={
                            p.images && p.images.length > 0
                              ? p.images[0]
                              : "https://via.placeholder.com/50"
                          }
                          alt={p.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div className="ml-4 text-left">
                          <div className="text-sm font-medium text-gray-900">
                            {p.name}
                          </div>
                          {/* No brand in schema, so removed */}
                        </div>
                      </div>
                    </td>

                    <td className={tdClassCenter}>
                      <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                        {p.category}
                      </span>
                    </td>

                    <td className={tdClassCenter}>
                      {currency}
                      {p.price.toFixed(2)}
                    </td>

                    <td className={tdClassCenter}>
                      <span
                        className={`text-sm ${
                          p.stock > 0 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {p.stock > 0 ? `${p.stock} in stock` : "Out of stock"}
                      </span>
                    </td>

                    <td className={tdClassCenter}>
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          p.inStock
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {p.inStock ? "Active" : "Inactive"}
                      </span>
                    </td>

                    <td className={`${tdClassCenter} text-sm font-medium`}>
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          className="text-primary hover:text-blue-700"
                          title="View"
                        >
                          <i className="ri-eye-line" />
                        </button>
                        <button
                          className="text-gray-600 hover:text-gray-900"
                          title="Edit"
                        >
                          <i className="ri-edit-line" />
                        </button>
                        <button
                          className="text-red-600 hover:text-red-900"
                          title="Delete"
                        >
                          <i className="ri-close-line" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing {(page - 1) * limit + 1} to{" "}
              {Math.min(page * limit, products.length)} of {products.length}{" "}
              results
            </div>
            <div className="flex space-x-2">
              <button
                onClick={handlePrev}
                disabled={page === 1}
                className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              {[...Array(totalPages)].map((_, idx) => {
                const pNum = idx + 1;
                return (
                  <button
                    key={pNum}
                    onClick={() => setPage(pNum)}
                    className={`px-3 py-1 text-sm rounded-lg ${
                      pNum === page
                        ? "bg-primary text-white"
                        : "border border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {pNum}
                  </button>
                );
              })}
              <button
                onClick={handleNext}
                disabled={page === totalPages}
                className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductsContent;
