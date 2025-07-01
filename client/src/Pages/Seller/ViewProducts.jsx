import { useEffect, useState } from "react";
import { FaHotel } from "react-icons/fa6";
import toast from "react-hot-toast";
import { useAppContext } from "../../Context/AppContext";

const ViewProducts = () => {
  const { axios } = useAppContext();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/product/getByRestaurant");
      setProducts(res.data.data); // ← array of products
    } catch (err) {
      console.error(err.message);
      toast.error("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const toggleStock = async (id, currentStock) => {
    try {
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, inStock: !currentStock } : p))
      );

      const { data } = await axios.patch("/api/product/toggle-stock", {
        id,
        inStock: !currentStock,
      });

      if (!data.success) throw new Error();
      toast.success("Stock status updated.");
    } catch {
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, inStock: currentStock } : p))
      );
      toast.error("Failed to update stock status.");
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const {
        id,
        name,
        price,
        category,
        description,
        offerPrice,
        stock,
        images = [],
      } = selectedProduct;

      const cleanImages = images.filter((img) => img && img.trim());

      const { data } = await axios.patch("/api/product/update", {
        id,
        name,
        price,
        category,
        description,
        offerPrice,
        stock,
        images: cleanImages,
      });

      if (!data.success) throw new Error("Update failed");

      toast.success("Product updated successfully!");

      setIsEditing(false);
      setSelectedProduct(null);
      await loadProducts();
    } catch (err) {
      console.error(err.message);
      toast.error(err.message || "Failed to update product.");
    }
  };

  const handleImageChange = (e, index) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const updatedImages = [...(selectedProduct.images || [])];
      updatedImages[index] = reader.result;
      setSelectedProduct({ ...selectedProduct, images: updatedImages });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col justify-between">
      <div className="w-full px-3 py-4 md:p-8">
        <div className="max-w-6xl mx-auto w-full rounded-md bg-white border border-gray-200 shadow-sm">
          <h2 className="text-lg font-semibold text-center py-4">
            Product List
          </h2>

          {loading ? (
            <p className="text-center text-gray-500 py-6">Loading...</p>
          ) : products.length === 0 ? (
            <p className="text-center text-gray-500 py-6">No products found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="table-auto w-full min-w-[600px] text-sm text-left text-gray-600">
                <thead className="bg-gray-50 text-gray-900">
                  <tr>
                    <th className="px-4 py-3 font-medium">Product</th>
                    <th className="px-4 py-3 font-medium">Category</th>
                    <th className="px-4 py-3 font-medium hidden md:table-cell">
                      Price
                    </th>
                    <th className="px-4 py-3 font-medium hidden sm:table-cell">
                      Hotel
                    </th>
                    <th className="px-4 py-3 font-medium">In Stock</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((item) => (
                    <tr key={item.id} className="border-t border-gray-100">
                      <td className="px-4 py-3 flex items-center gap-3">
                        <div
                          className="border border-gray-200 rounded p-1 bg-white cursor-pointer"
                          onClick={() => {
                            setSelectedProduct(item);
                            setIsEditing(true);
                          }}
                        >
                          <img
                            src={item.images[0]}
                            alt={item.name}
                            className="w-12 h-12 sm:w-14 sm:h-14 object-cover rounded"
                          />
                        </div>
                        <span className="font-medium text-gray-700 hidden sm:inline-block">
                          {item.name}
                        </span>
                      </td>
                      <td className="px-4 py-3">{item.category}</td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        ₹{item.price}
                      </td>
                      <td className="px-4 py-3 hidden sm:table-cell text-gray-700">
                        <div className="flex items-center gap-1">
                          <FaHotel className="text-orange-500" />
                          <span>{item.restaurant.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 w-44">
                        <div className="flex items-center gap-2">
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              checked={item.inStock}
                              onChange={() =>
                                toggleStock(item.id, item.inStock)
                              }
                            />
                            <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-green-500 relative">
                              <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
                            </div>
                          </label>
                          <span
                            className={`text-sm font-medium inline-block min-w-[85px] text-center ${
                              item.inStock ? "text-green-600" : "text-red-500"
                            }`}
                          >
                            {item.inStock ? "In Stock" : "Out of Stock"}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {isEditing && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <form
            onSubmit={handleEditSubmit}
            className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg overflow-y-auto max-h-[90vh]"
          >
            <h3 className="text-lg font-semibold mb-4">Edit Product</h3>

            {/* Name */}
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Name
              <input
                type="text"
                value={selectedProduct.name}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    name: e.target.value,
                  })
                }
                className="w-full mt-1 p-2 border rounded"
              />
            </label>

            {/* Images */}
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Upload Images (up to 4)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[0, 1, 2, 3].map((index) => (
                  <div key={index} className="flex flex-col items-center">
                    <input
                      type="file"
                      accept="image/*"
                      id={`fileInput-${index}`}
                      style={{ display: "none" }}
                      onChange={(e) => handleImageChange(e, index)}
                    />
                    {selectedProduct.images?.[index] ? (
                      <img
                        src={selectedProduct.images[index]}
                        alt={`Preview ${index + 1}`}
                        className="w-20 h-20 object-cover rounded border cursor-pointer"
                        onClick={() =>
                          document.getElementById(`fileInput-${index}`)?.click()
                        }
                      />
                    ) : (
                      <div
                        className="w-20 h-20 flex items-center justify-center border rounded cursor-pointer bg-gray-100 hover:bg-gray-200 text-2xl text-gray-500"
                        onClick={() =>
                          document.getElementById(`fileInput-${index}`)?.click()
                        }
                      >
                        +
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Offer Price */}
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Offer Price
              <input
                type="number"
                value={selectedProduct.offerPrice ?? ""}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    offerPrice: e.target.value ? +e.target.value : undefined,
                  })
                }
                className="w-full mt-1 p-2 border rounded"
              />
            </label>

            {/* Description */}
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Description
              <textarea
                value={selectedProduct.description}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    description: e.target.value,
                  })
                }
                className="w-full mt-1 p-2 border rounded"
                rows={3}
              />
            </label>

            {/* Stock */}
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Stock
              <input
                type="number"
                value={selectedProduct.stock}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    stock: +e.target.value,
                  })
                }
                className="w-full mt-1 p-2 border rounded"
              />
            </label>

            {/* Actions */}
            <div className="flex justify-end gap-3 mt-4">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ViewProducts;
