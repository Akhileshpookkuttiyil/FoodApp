const SortDropdown = ({ sortBy, setSortBy }) => {
    return (
      <select
        className="p-2 border border-orange-300 rounded-md outline-none focus:border-orange-500"
        onChange={(e) => setSortBy(e.target.value)}
        value={sortBy}
      >
        <option value="default">Sort By: Name</option>
        <option value="lowToHigh">Price: Low to High</option>
        <option value="highToLow">Price: High to Low</option>
      </select>
    );
  };
  
  export default SortDropdown;
  