import { useState, useMemo } from "react";
import { FaStar, FaRegStarHalf } from "react-icons/fa";
import FilterDialog from "./FilterDialog";
import HeroBanner from "./Banner/Banner";
import bannerImg from "../../assets/img/banner.jpg";
import BottomBanner from "./BottomBanner/BottomBanner";
import PageHeader from "./Banner/PageHeader/PageHeader";
import Categories from "./Categories/Categories";
import SearchBar from "./SearchBar/SearchBar";
import FilterButton from "./FilterButton/FilterButton";
import SortDropdown from "./SortDropdown/SortDropdown";
import MenuGrid from "./MenuGrid/Menugrid";
import { menuItems } from "./Data/MenuData";  // Import menu data
import noResultsImg from "../../assets/img/Noimg.gif"; // "No results" image

//  Generate categories dynamically
const categories = ["All", ...new Set(menuItems.map((item) => item.category))];

const Menus = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [priceRange, setPriceRange] = useState(1000);
  const [minRating, setMinRating] = useState(3);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // 🔍 Optimize filtering using useMemo()
  const filteredItems = useMemo(() => {
    return menuItems
      .filter(
        (item) =>
          selectedCategory === "All" || item.category === selectedCategory
      )
      .filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter((item) => item.price <= priceRange)
      .filter((item) => item.rating >= minRating)
      .sort((a, b) => {
        if (sortBy === "default") return a.name.localeCompare(b.name);
        if (sortBy === "lowToHigh") return a.price - b.price;
        if (sortBy === "highToLow") return b.price - a.price;
        return 0;
      });
  }, [selectedCategory, searchTerm, priceRange, minRating, sortBy]);

  // 🌟 Render Star Ratings
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={i} className="text-yellow-500" />
        ))}
        {hasHalfStar && <FaRegStarHalf className="text-yellow-500" />}
        <span className="ml-2 text-gray-600 text-sm">({rating})</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen w-full bg-white pb-10">
      {/* Hero Banner */}
      <HeroBanner image={bannerImg} />
      {/* Page Title & Description */}
      <PageHeader
        title="Our Delicious Menu"
        description="Discover a variety of mouthwatering dishes carefully crafted for your taste."
      />
      {/* Category Filter */}
      <Categories
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <div className="flex flex-col md:flex-row items-center gap-4 bg-white p-4 shadow-md rounded-md mt-4">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <div className="flex items-center space-x-2">
          <SortDropdown sortBy={sortBy} setSortBy={setSortBy} />
          <FilterButton setIsFilterOpen={setIsFilterOpen} />
        </div>
      </div>
      {/* 🎛️ Filter Dialog */}
      <FilterDialog
        isFilterOpen={isFilterOpen}
        setIsFilterOpen={setIsFilterOpen}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        minRating={minRating}
        setMinRating={setMinRating}
      />
      {/* 🍕 Menu Items Grid */}
      <MenuGrid
        filteredItems={filteredItems}
        renderStars={renderStars}
        noResultsImg={noResultsImg}
      />
            {/* 🏆 New Bottom Banner */}
            <BottomBanner />
    </div>
  );
};

export default Menus;
