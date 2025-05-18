
import { useLocation } from "react-router-dom";
import Banner from "./Banner/Banner";
import Category from "./Category/Category";
import RestaurantList from "../Locations/RestaurantList/RestaurantList";
import { useState } from "react";

const Locations = () => {
  const location = useLocation(); // ⬅️ Get navigation state
  const initialCategory = location.state?.cat || "All";
  console.log(initialCategory);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  return (
    <div className="space-y-9">
      <Banner />
      <Category
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <RestaurantList selectedCategory={selectedCategory} />
    </div>
  );
};

export default Locations;
