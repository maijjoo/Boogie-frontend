import { forwardRef, useState } from "react";

const Searchbar = forwardRef(function SearchBar(
  { onSearch, placeholder, activeSearch },
  ref
) {
  const [searchValue, setSearchValue] = useState(activeSearch);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch(searchValue); // 엔터키를 누르면 검색 실행
    }
  };

  return (
    <div className="flex items-center border border-gray-300 rounded-full p-2 w-96 h-12 focus-within:border-2 focus-within:border-gray-700 hover:border-gray-700">
      <input
        type="text"
        ref={ref}
        placeholder={placeholder} // props로 전달된 placeholder 사용
        className="outline-none flex-grow text-gray-700 px-4 mr-4"
        value={searchValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown} // 엔터키 감지
      />
    </div>
  );
});

export default Searchbar;
