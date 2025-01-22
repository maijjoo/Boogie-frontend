import { forwardRef, useEffect, useImperativeHandle, useState } from "react";

const Searchbar = forwardRef(function SearchBar(
  { onSearch, placeholder, activeSearch },
  ref
) {
  const [searchValue, setSearchValue] = useState(activeSearch || "");

  useImperativeHandle(ref, () => ({
    clear: () => setSearchValue(""),
    getValue: () => searchValue,
  }));

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchValue(value);
  };

  useEffect(() => {
    setSearchValue(activeSearch || "");
  }, [activeSearch]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      onSearch(); // 엔터키를 누르면 검색 실행
    }
  };

  return (
    <div className="flex items-center border border-gray-300 rounded-full p-2 w-96 h-12 focus-within:border-2 focus-within:border-gray-700 hover:border-gray-700 bg-white">
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
