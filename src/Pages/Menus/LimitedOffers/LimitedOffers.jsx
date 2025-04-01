import { FaStar, FaRegStarHalf } from "react-icons/fa";
import butterChicken from "../../../assets/img/butterChicken.png";
import paneerTikka from "../../../assets/img/paneerTikka.png";
import masalaDosa from "../../../assets/img/masalaDosa.png";
import chickenBiryani from "../../../assets/img/chickenBiryani.png";
import chickenFriedRice from "../../../assets/img/chickenFriedRice.png";

const LimitedOffers = () => {
  const offers = [
    {
      id: 1,
      name: "Butter Chicken",
      price: "₹299",
      oldPrice: "₹399",
      image: butterChicken,
      discount: "25% OFF",
      hotelName: "Spicy Kitchen",
      rating: 4.5,
    },
    {
      id: 2,
      name: "Paneer Tikka",
      price: "₹249",
      oldPrice: "₹349",
      image: paneerTikka,
      discount: "28% OFF",
      hotelName: "The Tandoor House",
      rating: 4.2,
    },
    {
      id: 3,
      name: "Masala Dosa",
      price: "₹149",
      oldPrice: "₹199",
      image: masalaDosa,
      discount: "30% OFF",
      hotelName: "Dosa Delight",
      rating: 3.5,
    },
    {
      id: 4,
      name: "Chicken Biryani",
      price: "₹349",
      oldPrice: "₹449",
      image: chickenBiryani,
      discount: "22% OFF",
      hotelName: "Biryani Royal",
      rating: 4.7,
    },
    {
      id: 5,
      name: "Chicken Fried Rice",
      price: "₹199",
      oldPrice: "₹279",
      image: chickenFriedRice,
      discount: "29% OFF",
      hotelName: "Rice & Spice",
      rating: 4.4,
    },
  ];

  // Function to render full, half, and empty stars based on rating
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStars = rating % 1 !== 0 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;

    const stars = [];

    // Add full stars (★)
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="text-yellow-500" />);
    }

    // Add half star (½)
    if (halfStars) {
      stars.push(<FaRegStarHalf key="half" className="text-yellow-500" />);
    }

    // Add empty stars (☆)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <FaRegStarHalf key={`empty-${i}`} className="text-gray-300" />
      );
    }

    return stars;
  };

  return (
    <div className="w-full py-10 mt-10">
      <h2 className="text-3xl font-bold text-center mb-6 text-red-700">
        🍛 Limited-Time Indian Delights!
      </h2>
      <div className="flex flex-wrap justify-center gap-6">
        {offers.map((item) => (
          <div
            key={item.id}
            className="bg-white p-4 shadow-lg rounded-lg w-64 text-center border border-orange-500 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
          >
            <img
              src={item.image}
              alt={item.name}
              onError={(e) => (e.target.src = "/assets/img/default-image.png")} // Fallback image on error
              className="w-full h-36 object-contain rounded-md"
            />
            <h3 className="text-lg font-semibold mt-2">{item.name}</h3>
            <p className="text-gray-500 line-through">{item.oldPrice}</p>
            <p className="text-red-600 font-bold">{item.price}</p>
            <span className="text-sm text-white bg-red-500 px-2 py-1 rounded-full">
              {item.discount}
            </span>
            <div className="mt-2">
              <p className="text-sm font-semibold text-gray-700">
                {item.hotelName}
              </p>
              <div className="flex justify-center items-center text-yellow-500">
                {renderStars(item.rating)}
                <span className="ml-2 text-sm text-gray-500">
                  ({item.rating})
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LimitedOffers;
