const SearchBar = ({ onSearch }) => (
    <input
      type="text"
      placeholder="Search recipes..."
      className="border p-2 rounded w-full"
      onChange={(e) => onSearch(e.target.value)}
    />
  );
  
  export default SearchBar;
  