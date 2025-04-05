import { useState } from "react";
import Banner from "./Banner/Banner";
import Category from "./Category/Category";
import RestaurantList from "../Locations/RestaurantList/RestaurantList";

const Locations = () => {
  const [selectedCategory, setSelectedCategory] = useState("All"); 

  return (
    <div className="space-y-9">
      <Banner />
      <Category selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      <RestaurantList selectedCategory={selectedCategory} />
    </div>
  );
};

export default Locations;
