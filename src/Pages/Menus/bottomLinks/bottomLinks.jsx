import fastFood from "../../../assets/img/fastFood.jpg";
import indian from "../../../assets/img/indian.png";
import arabic from "../../../assets/img/arab.jpg";
import seafood from "../../../assets/img/seafood.jpg";
import vegetarian from "../../../assets/img/vegetarian.jpg";
import desserts from "../../../assets/img/desserts.jpg";
import chinese from "../../../assets/img/chinese.jpg";
import italian from "../../../assets/img/italian.jpg";
import mexican from "../../../assets/img/mexican.jpg";
import bbq from "../../../assets/img/bbq.jpg";
import { useNavigate } from "react-router-dom";

const BottomLinks = () => {
  const navigate = useNavigate();
  const categories = [
    { name: "Fast Food", image: fastFood },
    { name: "Indian", image: indian },
    { name: "Arab", image: arabic },
    { name: "Seafood", image: seafood },
    { name: "Vegetarian", image: vegetarian },
    { name: "Desserts", image: desserts },
    { name: "Chinese", image: chinese },
    { name: "Italian", image: italian },
    { name: "Mexican", image: mexican },
    { name: "BBQ", image: bbq },
  ];

  const handleClick = (category) => {
    navigate("/location", { state: { cat: category.name } });
    // Pass the selected category to Menus page
  };

  return (
    <div className="py-8 mt-3 min-h-screen w-full">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10 text-black">
        Restaurants Near Me
      </h2>
      <div className="w-full px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 lg:gap-12 auto-rows-fr">
          {categories.map((category, index) => (
            <div
              key={index}
              onClick={() => handleClick(category)}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:scale-105 transform transition-all duration-300 h-full cursor-pointer flex flex-col"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 text-center flex-grow flex flex-col justify-between">
                <h4 className="text-xl font-semibold text-gray-800">
                  {category.name}
                </h4>
                <p className="text-gray-600 mt-2">
                  Find the best {category.name} restaurants near you.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BottomLinks;
