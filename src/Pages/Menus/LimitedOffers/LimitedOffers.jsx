import {
  FaStar,
  FaRegStarHalf,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { useState } from "react";
import butterChicken from "../../../assets/img/butterChicken.png";
import paneerTikka from "../../../assets/img/paneerTikka.png";
import masalaDosa from "../../../assets/img/masalaDosa.png";
import chickenBiryani from "../../../assets/img/chickenBiryani.png";
import chickenFriedRice from "../../../assets/img/chickenFriedRice.png";
import muttonBiriyani from "../../../assets/img/muttonBiriyani.png";
import fishCurry from "../../../assets/img/fishCurry.png";
import falafel from "../../../assets/img/falafel.png";
import lambShawarma from "../../../assets/img/lambShawarma.png";
import veggieBurger from "../../../assets/img/veggieBurger.png";
import choleBhature from "../../../assets/img/choleBhature.png";

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
    {
      id: 6,
      name: "Mutton Biriyani",
      price: "₹399",
      oldPrice: "₹499",
      image: muttonBiriyani,
      discount: "20% OFF",
      hotelName: "Royal Biryani",
      rating: 4.6,
    },
    {
      id: 7,
      name: "Fish Curry",
      price: "₹299",
      oldPrice: "₹399",
      image: fishCurry,
      discount: "25% OFF",
      hotelName: "Seafood Haven",
      rating: 4.3,
    },
    {
      id: 8,
      name: "Falafel Plate",
      price: "₹179",
      oldPrice: "₹249",
      image: falafel,
      discount: "28% OFF",
      hotelName: "Arabian Nights",
      rating: 4.0,
    },
    {
      id: 9,
      name: "Lamb Shawarma",
      price: "₹399",
      oldPrice: "₹499",
      image: lambShawarma,
      discount: "20% OFF",
      hotelName: "Shawarma King",
      rating: 4.6,
    },
    {
      id: 10,
      name: "Veggie Burger",
      price: "₹149",
      oldPrice: "₹199",
      image: veggieBurger,
      discount: "25% OFF",
      hotelName: "Veggie Delights",
      rating: 4.3,
    },
    {
      id: 11,
      name: "Chole Bhature",
      price: "₹159",
      oldPrice: "₹219",
      image: choleBhature,
      discount: "30% OFF",
      hotelName: "Bharati Bites",
      rating: 4.2,
    },
    // Add more items if needed
  ];

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10; // Total of 10 items (5 per row)

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

  // Paginate offers based on the current page (only show 10 per page)
  const displayedOffers = offers.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const nextPage = () => {
    if ((currentPage + 1) * itemsPerPage < offers.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="w-full py-10 mt-3 relative">
      <h2 className="text-3xl font-bold text-center mb-10 text-red-700">
        🍛 Limited-Time Indian Delights!
      </h2>
      <div className="absolute top-20 right-4 flex items-center space-x-3">
        <button
          onClick={prevPage}
          disabled={currentPage === 0}
          className="flex items-center justify-center px-1 py-1 bg-orange-400 text-white rounded-full shadow-md hover:bg-orange-500 disabled:bg-gray-300"
        >
          <FaChevronLeft />
        </button>

        <button
          onClick={nextPage}
          disabled={(currentPage + 1) * itemsPerPage >= offers.length}
          className="flex items-center justify-center px-1 py-1 bg-orange-400 text-white rounded-full shadow-md hover:bg-orange-500 disabled:bg-gray-300"
        >
          <FaChevronRight />
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4 px-4 mt-10">
        {displayedOffers.map((item) => (
          <div
            key={item.id}
            className="bg-white p-4 shadow-lg rounded-lg w-full text-center border transform transition-transform duration-300 hover:scale-105 hover:shadow-xl relative"
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
