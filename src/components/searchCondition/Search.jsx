import searchIcon from "../../assets/icons/write/Search.png";
const Search = ({ condition, searchParam, onSearch }) => {
  const canSearch =
    condition === "year"
      ? searchParam.year !== null
      : condition === "month"
      ? searchParam.year !== null && searchParam.month !== null
      : searchParam.start !== null && searchParam.end !== null;

  return (
    <button
      className={`px-4 py-2 w-24 h-12 rounded-md flex items-center justify-center ml-5 text-white ${
        canSearch ? " bg-blue-700 cursor-pointer" : " bg-gray-400"
      }`}
      disabled={!canSearch}
      onClick={onSearch}
    >
      <img src={searchIcon} alt="searchIcon" className="w-5 h-5" />
      <div className="ms-2">검색</div>
    </button>
  );
};

export default Search;
