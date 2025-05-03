import { useState } from "react";
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
  const [selectedCategory, setSelectedCategory] = useState("All");

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
