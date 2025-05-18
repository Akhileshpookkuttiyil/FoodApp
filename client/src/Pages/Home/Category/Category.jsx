import { useNavigate } from "react-router-dom";
import { FaPizzaSlice, FaHamburger, FaIceCream, FaFish } from "react-icons/fa";
import { GiNoodles, GiSushis, GiHotDog, GiChiliPepper } from "react-icons/gi";

const categories = [
  {
    label: "Pizza",
    value: "Pizza",
    icon: <FaPizzaSlice className="w-5 h-5 text-orange-500" />,
  },
  {
    label: "Burger",
    value: "Burger",
    icon: <FaHamburger className="w-5 h-5 text-orange-500" />,
  },
  {
    label: "Ice Cream",
    value: "Icecream",
    icon: <FaIceCream className="w-5 h-5 text-orange-500" />,
  },
  {
    label: "Noodles",
    value: "Noodles",
    icon: <GiNoodles className="w-5 h-5 text-orange-500" />,
  },
  {
    label: "Sushi",
    value: "Sushi",
    icon: <GiSushis className="w-5 h-5 text-orange-500" />,
  },
  {
    label: "Hot Dog",
    value: "Hotdog",
    icon: <GiHotDog className="w-5 h-5 text-orange-500" />,
  },
  {
    label: "Seafood",
    value: "Seafood",
    icon: <FaFish className="w-5 h-5 text-orange-500" />,
  },
  {
    label: "Spicy Food",
    value: "Spicy",
    icon: <GiChiliPepper className="w-5 h-5 text-orange-500" />,
  },
];

const Category = () => {
  const navigate = useNavigate();

  const handleClick = (category) => {
    navigate("/menus", { state: { category: category.value } });
    // Pass the selected category to Menus page
  };

  return (
    <div className="w-full lg:px-11 md:px-10 sm:px-2 px-6 py-6 space-y-4">
      {/* Top Section */}
      <div className="w-full flex items-center justify-between">
        <h5 className="text-xl text-neutral-700 font-semibold">
          Popular Category
        </h5>
        <button
          onClick={() => navigate("/menus")}
          className="text-sm text-neutral-500 font-medium hover:text-orange-500 transition duration-300"
        >
          View All
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid md:grid-cols-8 sm:grid-cols-4 grid-cols-3 gap-x-3 gap-y-3.5 md:gap-6">
        {categories.map((cat, index) => (
          <button
            key={index}
            onClick={() => handleClick(cat)} // Pass the whole category object
            title={cat.label}
            className="w-full min-w-[90px] bg-neutral-300/60 flex items-center justify-center gap-x-2.5 px-3.5 py-3 rounded-full hover:bg-neutral-400/50 focus:bg-zinc-400/50 hover:shadow-md transition duration-300"
          >
            {cat.icon}
            <h6 className="md:text-base text-sm text-neutral-600 font-medium">
              {cat.label}
            </h6>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Category;
