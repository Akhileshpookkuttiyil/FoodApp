// src/utils/api.js
import axios from "axios";

// Global config
axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

// ===================== Fetch Products =====================
export const fetchProducts = async ({ inStockOnly = false } = {}) => {
  try {
    const res = await axios.get("/api/product/list");
    const products = res.data.data || [];

    const filtered = inStockOnly ? products.filter((p) => p.inStock) : products;

    return filtered.map((item) => ({
      id: item._id,
      name: item.name,
      category: item.category,
      price: item.price,
      offerPrice: item.offerPrice,
      description: item.description,
      stock: item.stock,
      images: item.images || [],
      rating: item.rating || 0,
      image: item.images?.[0] || "/assets/img/default-image.png",
      hotel: item.restaurant?.name || "Restaurant",
      deliveryTime: item.deliveryTime || 30,
      inStock: item.inStock,
    }));
  } catch (err) {
    console.error("Error fetching products:", err);
    return [];
  }
};

// ===================== Fetch Products By id =====================
export const fetchProductById = async (id) => {
  try {
    const res = await axios.get(`/api/product/${id}`);
    return res.data?.data || null;
  } catch (err) {
    console.error("Error fetching product:", err);
    return null;
  }
};
