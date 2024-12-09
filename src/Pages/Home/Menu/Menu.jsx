import { Link } from "react-router-dom";

import Chicken from "../../../assets/img/hero2.png";
import Momos from "../../../assets/img/hero4.png";
import Biriyani from "../../../assets/img/hero3.png";
import Fish from "../../../assets/img/hero5.png";
import FriedRice from "../../../assets/img/rice.png";
import Burger from "../../../assets/img/burger.png";
import Pizza from "../../../assets/img/pizza.png";
import Sandwich from "../../../assets/img/sandwich.png";

const Menu = () => {
  // Dummy Data
  const menuData = [
    {
      id: 1,
      title: "Chicken",
      img: Chicken,
      name: "Full Grilled Chicken",
      desc: "Juicy grilled chicken seasoned with spices.",
      price: "Rs. 800",
      inStock: true,
    },
    {
      id: 2,
      title: "Momos",
      img: Momos,
      name: "Steamed Momos",
      desc: "Soft dumplings filled with veggies or chicken.",
      price: "Rs. 120",
      inStock: true,
    },
    {
      id: 3,
      title: "Biryani",
      img: Biriyani,
      name: "Hyderabadi Biryani",
      desc: "Flavorful rice with tender chicken pieces.",
      price: "Rs. 300",
      inStock: true,
    },
    {
      id: 4,
      title: "Fish",
      img: Fish,
      name: "Grilled Fish",
      desc: "Fresh fish fillet grilled to perfection.",
      price: "Rs. 500",
      inStock: false,
    },
    {
      id: 5,
      title: "Fried Rice",
      img: FriedRice,
      name: "Veg Fried Rice",
      desc: "Classic fried rice with vegetables.",
      price: "Rs. 150",
      inStock: true,
    },
    {
      id: 6,
      title: "Burger",
      img: Burger,
      name: "Cheese Burger",
      desc: "Beef patty with cheese, lettuce, and sauce.",
      price: "Rs. 200",
      inStock: true,
    },
    {
      id: 7,
      title: "Pizza",
      img: Pizza,
      name: "Pepperoni Pizza",
      desc: "Loaded with pepperoni and cheese.",
      price: "Rs. 600",
      inStock: true,
    },
    {
      id: 8,
      title: "Sandwich",
      img: Sandwich,
      name: "Club Sandwich",
      desc: "Triple-layer sandwich with a variety of fillings.",
      price: "Rs. 250",
      inStock: true,
    },
  ];

  return (
    <div className="w-full lg:px-11 md:px-8 sm:px-4 px-4 space-y-6">
      <div className="w-full flex items-center justify-between">
        <h5 className="text-2xl text-neutral-800 font-semibold">
          Our Best Menus
        </h5>
        <Link
          to={"/"}
          className="text-sm text-neutral-500 font-medium hover:text-orange-500 ease-in-out duration-300"
        >
          View All
        </Link>
      </div>

      {/* Menu Items */}
      <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-5">
        {menuData.map((data) => (
          <Link
            to={"/"}
            key={data.id}
            className="bg-white hover:bg-neutral-50 border border-neutral-200 px-4 py-5 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 ease-in-out"
          >
            <img
              src={data.img}
              alt={data.name}
              className="w-full aspect-[5/4] object-cover rounded-lg"
              loading="lazy"
            />
            <div className="mt-4">
              <h6 className="text-lg text-neutral-800 font-semibold">
                {data.name}
              </h6>
              {/* Description with a fixed height */}
              <p className="text-sm text-neutral-500 line-clamp-2 h-10 overflow-hidden">
                {data.desc}
              </p>
            </div>
            <div className="flex justify-between items-center mt-4">
              <h6 className="text-xl text-neutral-800 font-bold">
                {data.price}
              </h6>
              <button
                className={`px-4 py-2 rounded-lg font-medium text-white ${
                  data.inStock
                    ? "bg-orange-500 hover:bg-orange-600"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                disabled={!data.inStock}
              >
                {data.inStock ? "Order Now" : "Unavailable"}
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Menu;
