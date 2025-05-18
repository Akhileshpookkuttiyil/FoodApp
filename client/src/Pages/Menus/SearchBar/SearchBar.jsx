const SearchBar = ({ searchTerm, setSearchTerm }) => {
    return (
      <div className="relative w-full md:flex-grow">
        <input
          type="text"
          placeholder="Search food..."
          className="w-full p-2 pr-10 border rounded-md focus:outline-none focus:border-orange-200"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <button
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-orange-500"
            onClick={() => setSearchTerm("")}
          >
            ✖
          </button>
        )}
      </div>
    );
  };
  
  export default SearchBar;
  