import greenLeaf from "../../../assets/img/greenLeaf.jpg";
import tandooriFlames from "../../../assets/img/tandooriFlames.jpg";
import royalBiryani from "../../../assets/img/royalBiryani.jpeg";
import shanghaiExpress from "../../../assets/img/shanghaiExpress.png";
import arabianNights from "../../../assets/img/arabianNights.jpg";

const restaurantsData = [
  {
    id: 1,
    name: "Green Leaf Veg Restaurant",
    category: "Vegetarian",
    fullAddress: "123 MG Road, Andheri West, Mumbai, India",
    duration: "30-40 mins",
    rating: 4.5,
    image: greenLeaf,
    latitude: 19.1197, // Andheri West, Mumbai
    longitude: 72.8465,
  },
  {
    id: 2,
    name: "Tandoori Flames",
    category: "Indian",
    fullAddress: "45 Connaught Place, New Delhi, India",
    duration: "25-35 mins",
    rating: 4.2,
    image: tandooriFlames,
    latitude: 28.6315, // Connaught Place, Delhi
    longitude: 77.2167,
  },
  {
    id: 3,
    name: "Royal Biryani House",
    category: "Biryani",
    fullAddress: "678 Charminar Road, Hyderabad, India",
    duration: "35-45 mins",
    rating: 4.8,
    image: royalBiryani,
    latitude: 17.3616, // Charminar, Hyderabad
    longitude: 78.4747,
  },
  {
    id: 4,
    name: "Shanghai Express",
    category: "Chinese",
    fullAddress: "12 Brigade Road, Bangalore, India",
    duration: "20-30 mins",
    rating: 4.3,
    image: shanghaiExpress,
    latitude: 12.9716, // Brigade Road, Bengaluru
    longitude: 77.5946,
  },
  {
    id: 5,
    name: "Arabian Nights",
    category: "Arab",
    fullAddress: "56 Marina Beach Road, Chennai, India",
    duration: "40-50 mins",
    rating: 4.6,
    image: arabianNights,
    latitude: 13.0491, // Marina Beach, Chennai
    longitude: 80.2824,
  },
];

export default restaurantsData;
