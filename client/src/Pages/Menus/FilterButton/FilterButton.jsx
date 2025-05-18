import { FaFilter } from "react-icons/fa";

const FilterButton = ({ setIsFilterOpen }) => {
  return (
    <button
      onClick={() => setIsFilterOpen(true)}
      className="p-2 px-4 border border-orange-300 rounded-md outline-none focus:border-orange-500 text-black bg-white hover:bg-orange-100 transition"
    >
      <FaFilter className="inline mr-2" />
    </button>
  );
};

export default FilterButton;
