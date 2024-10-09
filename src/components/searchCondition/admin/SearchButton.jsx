import searchIcon from "../../../assets/icons/write/Search.png";

// Search 컴포넌트에서 beachName을 props로 받아서 검색 조건을 확인합니다.
const SearchButton = ({ onSearch, beachName }) => {
  return (
    <button
      className="px-4 py-2 w-24 h-12 rounded-md flex items-center justify-center ml-5 text-white bg-blue-700 cursor-pointer whitespace-nowrap"
      onClick={() => {
        onSearch(beachName);
      }}
    >
      {/* 줄바꿈 방지 */}
      <img src={searchIcon} alt="searchIcon" className="w-5 h-5" />
      <div className="ms-2">검색</div>
    </button>
  );
};

export default SearchButton;
