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

const BottomLinks = () => {
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

  return (
    <div className="py-8 mt-3">
      <div className="container mx-auto px-1">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10 text-black">
          Restaurants Near Me
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:scale-105 transform transition-all duration-300"
            >
              <img
                src={category.image} // Use the imported image directly
                alt={category.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 text-center">
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
