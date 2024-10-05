import searchIcon from "../../assets/icons/write/Search.png";

const Search = ({ handleSearch }) => {
  //$$$ onSearch prop 추가
  return (
    <button
      className="px-4 py-2 w-24 h-12 bg-blue-700 text-white rounded-md flex items-center justify-center ml-5"
      onClick={handleSearch} //$$$ Search 버튼 클릭 시 onSearch 호출
    >
      <img src={searchIcon} alt="searchIcon" className="w-5 h-5" />
      <div className="ms-2">검색</div>
    </button>
  );
};

export default Search;
