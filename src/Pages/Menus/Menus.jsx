import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; // ⬅️ Add this
import HeroBanner from "./Banner/Banner";
import PageHeader from "./Banner/PageHeader/PageHeader";
import Categories from "./Categories/Categories";
import MenuGrid from "./MenuGrid/Menugrid";
import BannerAd from "./BannerAd/BannerAd";
import LimitedOffers from "./LimitedOffers/LimitedOffers";
import BottomBanner from "./BottomBanner/BottomBanner";
import BottomLinks from "./bottomLinks/bottomLinks";

import bannerImg from "../../assets/img/banner.jpg";
import { menuItems } from "./Data/MenuData";

const categories = ["All", ...new Set(menuItems.map((item) => item.category))];

const Menus = () => {
  const location = useLocation(); // ⬅️ Get navigation state
  const initialCategory = location.state?.category || "All";
  console.log(initialCategory)

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

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
      ? menuItems.filter((item) => item.inStock)
      : menuItems.filter(
          (item) => item.category === selectedCategory && item.inStock
        );

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

      <MenuGrid items={categoryItems} />

      {/* Extra Sections */}
      <BannerAd />
      <LimitedOffers />
      <BottomBanner />
      <BottomLinks />
    </div>
  );
};

export default Menus;
