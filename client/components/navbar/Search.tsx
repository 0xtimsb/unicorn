import { BiSearch } from "react-icons/bi";

const Search = () => {
  return (
    <div className="h-12 px-4 gap-1 flex-1 flex items-center rounded-full text-gray-400 bg-gray-100 cursor-text">
      <BiSearch className="text-xl" />
      <div className="text-base font-medium">Search</div>
    </div>
  );
};

export default Search;
