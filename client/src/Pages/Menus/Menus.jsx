import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

import HeroBanner from "./Banner/Banner";
import PageHeader from "./Banner/PageHeader/PageHeader";
import Categories from "./Categories/Categories";
import MenuGrid from "./MenuGrid/Menugrid";
import BannerAd from "./BannerAd/BannerAd";
import LimitedOffers from "./LimitedOffers/LimitedOffers";
import BottomBanner from "./BottomBanner/BottomBanner";
import BottomLinks from "./bottomLinks/bottomLinks";

import bannerImg from "../../assets/img/banner.jpg";

const Menus = () => {
  const location = useLocation();
  const initialCategory = location.state?.category || "All";

  const [menuItems, setMenuItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [categories, setCategories] = useState(["All"]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const res = await axios.get("/api/product/list"); // Adjust your API URL
        const data = res.data.data || [];
        console.log(data);

        // Filter only in-stock items initially
        const inStockItems = data.filter((item) => item.inStock);

        const formattedItems = inStockItems.map((item) => ({
          id: item._id,
          name: item.name,
          category: item.category,
          price: item.offerPrice || item.price,
          rating: item.rating || 0,
          image: item.images?.[0] || "/assets/img/default-image.png",
          hotel: item.restaurant?.name || "Restaurant",
          deliveryTime: item.deliveryTime || 30,
          inStock: item.inStock,
        }));

        setMenuItems(formattedItems);

        const categorySet = new Set(inStockItems.map((item) => item.category));
        setCategories(["All", ...categorySet]);
      } catch (err) {
        console.error("Error fetching menu items:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  useEffect(() => {
    const pageHeight = document.documentElement.scrollHeight;
    const targetScrollPosition = pageHeight * 0.045;

    window.scrollTo({
      top: targetScrollPosition,
      behavior: "smooth",
    });
  }, []);

  const categoryItems =
    selectedCategory === "All"
      ? menuItems
      : menuItems.filter((item) => item.category === selectedCategory);

  return (
    <div className="min-h-screen w-full bg-white pb-10">
      <HeroBanner image={bannerImg} />
      <PageHeader
        title="Our Delicious Menu"
        description="Discover a variety of mouthwatering dishes carefully crafted for your taste."
      />
      <Categories
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {loading ? (
        <div className="text-center text-gray-500 py-10">Loading menu...</div>
      ) : (
        <MenuGrid items={categoryItems} />
      )}

      {/* Extra Sections */}
      <BannerAd />
      <LimitedOffers />
      <BottomBanner />
      <BottomLinks />
    </div>
  );
};

export default Menus;
