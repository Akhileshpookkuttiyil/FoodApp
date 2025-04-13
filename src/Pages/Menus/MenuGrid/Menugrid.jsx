import { Link } from "react-router-dom";
import MenuItem from "../MenuItems/MenuItems";

const MenuGrid = ({ filteredItems, renderStars, noResultsImg }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6 px-4">
      {filteredItems.length ? (
        filteredItems.map((item) => (
          <Link to={`/dish/${item.id}`} key={item.id}>
            <div className="bg-white p-4 rounded-lg w-full text-center border transition-transform duration-300 hover:scale-105 relative">
              <MenuItem item={item} renderStars={renderStars} />
            </div>
          </Link>
        ))
      ) : (
        <div className="text-center col-span-full flex flex-col items-center justify-center">
          <img
            src={noResultsImg}
            alt="No results"
            className="h-80 w-auto max-w-lg md:max-w-2xl"
            loading="lazy"
            decoding="async"
          />
        </div>
      )}
    </div>
  );
};

export default MenuGrid;
