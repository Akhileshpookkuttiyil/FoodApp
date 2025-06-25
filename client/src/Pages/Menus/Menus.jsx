import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { fetchProducts } from "../../utils/api"; // ✅ Import the reusable function

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
    const loadData = async () => {
      const products = await fetchProducts({ inStockOnly: true });
      setMenuItems(products);

      const categorySet = new Set(products.map((item) => item.category));
      setCategories(["All", ...categorySet]);

      setLoading(false);
    };

    loadData();
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
