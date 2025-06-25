import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const AddProduct = () => {
  const [images, setImages] = useState(Array(4).fill(null));
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
  const [stock, setStock] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
      if (!allowedTypes.includes(file.type)) {
        toast.error("Only JPG, PNG, and WEBP files are allowed.");
        return;
      }

      const updatedImages = [...images];
      updatedImages[index] = file;
      setImages(updatedImages);
    }
  };

  const removeImage = (index) => {
    const updatedImages = [...images];
    updatedImages[index] = null;
    setImages(updatedImages);
  };

  const resetForm = () => {
    setImages(Array(4).fill(null));
    setProductName("");
    setDescription("");
    setCategory("");
    setProductPrice("");
    setOfferPrice("");
    setDeliveryTime("");
    setStock("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validation
    if (!productName || !category || !productPrice || !deliveryTime || !stock) {
      toast.error("Please fill all required fields.");
      setIsSubmitting(false);
      return;
    }

    if (offerPrice && parseFloat(offerPrice) > parseFloat(productPrice)) {
      toast.error("Offer Price cannot exceed Product Price.");
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData();
    images.forEach((img) => {
      if (img) formData.append("images", img);
    });

    formData.append("name", productName);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("price", parseFloat(productPrice));
    if (offerPrice) formData.append("offerPrice", parseFloat(offerPrice));
    formData.append("deliveryTime", parseInt(deliveryTime));
    formData.append("stock", parseInt(stock));

    try {
      const res = await axios.post("/api/product/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        toast.success("Product added successfully!");
        resetForm();
      } else {
        toast.error("Failed: " + res.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Error: " + (err.response?.data?.message || err.message));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4 md:p-10">
      <Toaster />
      <form
        className="space-y-6 max-w-lg bg-white shadow-lg rounded p-6"
        onSubmit={handleSubmit}
      >
        {/* Images */}
        <div>
          <p className="text-lg font-semibold mb-2">Product Images</p>
          <div className="flex gap-4 flex-wrap">
            {images.map((img, i) => (
              <label
                key={i}
                htmlFor={`image-${i}`}
                className="cursor-pointer w-24 h-24 border border-gray-300 rounded flex items-center justify-center relative bg-gray-100 overflow-hidden"
              >
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  id={`image-${i}`}
                  onChange={(e) => handleImageChange(e, i)}
                />
                {img ? (
                  <>
                    <img
                      src={URL.createObjectURL(img)}
                      alt="preview"
                      className="w-full h-full object-cover"
                      onLoad={(e) => URL.revokeObjectURL(e.target.src)}
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeImage(i);
                      }}
                      className="absolute top-0 right-0 bg-black bg-opacity-50 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                    >
                      ×
                    </button>
                  </>
                ) : (
                  <span className="text-gray-400 text-xs">Upload</span>
                )}
              </label>
            ))}
          </div>
        </div>

        {/* Product Name */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Product Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="E.g. Double Cheese Burger"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            rows={4}
            maxLength={2000}
            placeholder="Enter product description"
            className="w-full border border-gray-300 rounded px-3 py-2 resize-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">-- Select Category --</option>
            {["Burgers", "Pizza", "Desserts", "Drinks", "Salads", "Other"].map(
              (cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              )
            )}
          </select>
        </div>

        {/* Price Fields */}
        <div className="flex gap-4 flex-wrap">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">
              Price (₹) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              className="w-full border border-gray-300 rounded px-3 py-2"
              min={0}
              step="0.01"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              required
            />
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">
              Offer Price (₹)
            </label>
            <input
              type="number"
              className="w-full border border-gray-300 rounded px-3 py-2"
              min={0}
              step="0.01"
              value={offerPrice}
              onChange={(e) => setOfferPrice(e.target.value)}
            />
          </div>
        </div>

        {/* Delivery Time & Stock */}
        <div className="flex gap-4 flex-wrap">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">
              Delivery Time (min) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              className="w-full border border-gray-300 rounded px-3 py-2"
              min={1}
              max={180}
              value={deliveryTime}
              onChange={(e) => setDeliveryTime(e.target.value)}
              required
            />
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">
              Stock <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              className="w-full border border-gray-300 rounded px-3 py-2"
              min={0}
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 text-white rounded font-semibold ${
            isSubmitting
              ? "bg-indigo-300 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {isSubmitting ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
