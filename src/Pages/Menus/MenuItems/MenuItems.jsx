import { motion } from "framer-motion";
// eslint-disable-next-line react/prop-types
const MenuItem = ({ item, renderStars }) => {
  return (
    <motion.div
      key={item.id}
      className="p-4 border rounded-lg shadow-md bg-white hover:shadow-lg hover:scale-105 transition"
    >
      <img
        src={item.img}
        alt={item.name}
        className="w-full h-40 object-cover rounded-md"
      />
      <h2 className="text-lg font-semibold mt-3">{item.name}</h2>
      <p className="text-sm text-gray-500">{item.hotel}</p>
      {renderStars(item.rating)}
      <p className="text-lg font-bold">₹{item.price}</p>
      <p className="text-sm text-gray-500">Delivery: {item.deliveryTime} mins</p>
    </motion.div>
  );
};

export default MenuItem;
