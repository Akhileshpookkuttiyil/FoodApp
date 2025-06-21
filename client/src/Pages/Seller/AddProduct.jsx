import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const AddProduct = () => {
  const [images, setImages] = useState(Array(4).fill(null));
  const [productName, setProductName] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [category, setCategory] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
  const [stock, setStock] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
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
    setShortDescription("");
    setLongDescription("");
    setCategory("");
    setProductPrice("");
    setOfferPrice("");
    setDeliveryTime("");
    setStock("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validations
    if (offerPrice && parseFloat(offerPrice) > parseFloat(productPrice)) {
      toast.error("Offer Price cannot be greater than Product Price.");
      setIsSubmitting(false);
      return;
    }
    if (
      parseFloat(productPrice) < 0 ||
      parseFloat(offerPrice) < 0 ||
      parseInt(stock) < 0
    ) {
      toast.error("Price and Stock values must be non-negative.");
      setIsSubmitting(false);
      return;
    }

    try {
      const formData = new FormData();

      images.forEach((img) => {
        if (img) formData.append("images", img);
      });

      formData.append("name", productName);
      formData.append("shortDescription", shortDescription);
      formData.append("longDescription", longDescription || "");
      formData.append("category", category);
      formData.append("price", parseFloat(productPrice));
      formData.append("offerPrice", offerPrice ? parseFloat(offerPrice) : "");
      formData.append("deliveryTime", parseInt(deliveryTime));
      formData.append("stock", parseInt(stock));

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
    <div className="bg-gray-50 min-h-screen">
      <Toaster />
      <form
        className="md:p-10 p-4 space-y-5 max-w-lg bg-white shadow-md rounded"
        onSubmit={handleSubmit}
      >
        {/* Product Images */}
        <div>
          <p className="text-lg font-medium mb-2">Product Images</p>
          <div className="flex flex-wrap items-center gap-4">
            {Array(4)
              .fill("")
              .map((_, index) => (
                <label
                  key={index}
                  htmlFor={`image${index}`}
                  className="cursor-pointer border border-gray-300 rounded overflow-hidden w-24 h-24 flex items-center justify-center bg-gray-100 relative"
                >
                  <input
                    accept="image/*"
                    type="file"
                    id={`image${index}`}
                    hidden
                    onChange={(e) => handleImageChange(e, index)}
                  />
                  {images[index] ? (
                    <>
                      <img
                        src={URL.createObjectURL(images[index])}
                        alt={`upload-${index}`}
                        className="w-full h-full object-cover"
                        onLoad={(e) => URL.revokeObjectURL(e.target.src)}
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeImage(index);
                        }}
                        className="absolute top-0 right-0 bg-black bg-opacity-50 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center"
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
        <div className="flex flex-col gap-1">
          <label className="text-lg font-medium" htmlFor="product-name">
            Product Name
          </label>
          <input
            id="product-name"
            type="text"
            placeholder="Enter product name"
            className="outline-none py-2 px-3 rounded border border-gray-400"
            required
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>

        {/* Short Description */}
        <div className="flex flex-col gap-1">
          <label className="text-lg font-medium" htmlFor="short-description">
            Short Description
          </label>
          <textarea
            id="short-description"
            rows={3}
            className="outline-none py-2 px-3 rounded border border-gray-400 resize-none"
            placeholder="Enter a short description (max 150 chars)"
            maxLength={150}
            required
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
          ></textarea>
        </div>

        {/* Long Description */}
        <div className="flex flex-col gap-1">
          <label className="text-lg font-medium" htmlFor="long-description">
            Long Description (optional)
          </label>
          <textarea
            id="long-description"
            rows={5}
            className="outline-none py-2 px-3 rounded border border-gray-400 resize-none"
            placeholder="Enter detailed description (max 2000 chars)"
            maxLength={2000}
            value={longDescription}
            onChange={(e) => setLongDescription(e.target.value)}
          ></textarea>
        </div>

        {/* Category */}
        <div className="flex flex-col gap-1">
          <label className="text-lg font-medium" htmlFor="category">
            Category
          </label>
          <select
            id="category"
            className="outline-none py-2 px-3 rounded border border-gray-400"
            value={category}
            required
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="" disabled>
              Select Category
            </option>
            {["Burgers", "Pizza", "Desserts", "Drinks", "Salads", "Other"].map(
              (item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              )
            )}
          </select>
        </div>

        {/* Price and Offer Price */}
        <div className="flex gap-6 flex-wrap">
          <div className="flex-1 flex flex-col gap-1 min-w-[140px]">
            <label className="text-md font-medium" htmlFor="product-price">
              Product Price
            </label>
            <input
              id="product-price"
              type="number"
              placeholder="0.00"
              className="outline-none py-2 px-3 rounded border border-gray-400"
              min={0}
              step="0.01"
              required
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
            />
          </div>
          <div className="flex-1 flex flex-col gap-1 min-w-[140px]">
            <label className="text-md font-medium" htmlFor="offer-price">
              Offer Price (optional)
            </label>
            <input
              id="offer-price"
              type="number"
              placeholder="0.00"
              className="outline-none py-2 px-3 rounded border border-gray-400"
              min={0}
              step="0.01"
              value={offerPrice}
              onChange={(e) => setOfferPrice(e.target.value)}
            />
          </div>
        </div>

        {/* Delivery Time and Stock */}
        <div className="flex gap-6 flex-wrap">
          <div className="flex-1 flex flex-col gap-1 min-w-[140px]">
            <label className="text-md font-medium" htmlFor="delivery-time">
              Delivery Time (minutes)
            </label>
            <input
              id="delivery-time"
              type="number"
              placeholder="e.g. 30"
              className="outline-none py-2 px-3 rounded border border-gray-400"
              min={1}
              max={180}
              required
              value={deliveryTime}
              onChange={(e) => setDeliveryTime(e.target.value)}
            />
          </div>
          <div className="flex-1 flex flex-col gap-1 min-w-[140px]">
            <label className="text-md font-medium" htmlFor="stock">
              Stock
            </label>
            <input
              id="stock"
              type="number"
              placeholder="e.g. 100"
              className="outline-none py-2 px-3 rounded border border-gray-400"
              min={0}
              required
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 rounded font-medium text-white ${
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
