import { FaStar, FaStarHalfAlt } from "react-icons/fa";

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStars = rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStars;

  return (
    <div className="flex items-center gap-1">
      {[...Array(fullStars)].map((_, i) => (
        <FaStar key={`full-${i}`} className="text-yellow-500 text-sm" />
      ))}
      {[...Array(halfStars)].map((_, i) => (
        <FaStarHalfAlt key={`half-${i}`} className="text-yellow-500 text-sm" />
      ))}
      {[...Array(emptyStars)].map((_, i) => (
        <FaStar key={`empty-${i}`} className="text-gray-300 text-sm" />
      ))}
      <span className="ml-2 text-gray-500 text-sm">{rating}</span>
    </div>
  );
};

export default StarRating;
