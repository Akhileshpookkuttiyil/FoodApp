import MenuItem from "../MenuItems/MenuItems";

const MenuGrid = ({ filteredItems, renderStars, noResultsImg }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6 ml-4 mr-4">
      {filteredItems.length ? (
        filteredItems.map((item) => (
          <MenuItem key={item.id} item={item} renderStars={renderStars} />
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
