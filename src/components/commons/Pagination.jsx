import React from "react";
import {
  FiChevronsLeft,
  FiChevronLeft,
  FiChevronRight,
  FiChevronsRight,
} from "react-icons/fi";

const Pagination = ({
  totalPages,
  currentPage,
  onPageChange,
  nextPage,
  prevPage,
  pageNumberList,
}) => {
  // 범위 변경 함수
  const handlePrevRange = () => {
    onPageChange(prevPage);
  };

  const handleNextRange = () => {
    onPageChange(nextPage);
  };

  return (
    <div className="flex items-center space-x-2">
      {/* 맨 처음 페이지로 이동 */}
      <button
        className={`px-2 py-1 ${
          prevPage === 0 ? "text-gray-300" : "text-gray-600 hover:text-gray-800"
        }`}
        onClick={() => onPageChange(1)}
        disabled={prevPage === 0}
      >
        <FiChevronsLeft size={16} />
      </button>

      {/* 이전 범위로 이동 */}
      <button
        className={`px-2 py-1 ${
          prevPage === 0 ? "text-gray-300" : "text-gray-600 hover:text-gray-800"
        }`}
        onClick={handlePrevRange}
        disabled={prevPage === 0}
      >
        <FiChevronLeft size={16} />
      </button>

      {/* 페이지 번호 버튼 */}
      {pageNumberList.map((page) => (
        <button
          key={page}
          className={`px-3 py-1 rounded-md ${
            page === currentPage
              ? "bg-blue-600 text-white"
              : "text-gray-600 hover:bg-gray-200"
          }`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      {/* 다음 범위로 이동 */}
      <button
        className={`px-2 py-1 ${
          nextPage === 0 ? "text-gray-300" : "text-gray-600 hover:text-gray-800"
        }`}
        onClick={handleNextRange}
        disabled={nextPage === 0}
      >
        <FiChevronRight size={16} />
      </button>

      {/* 맨 마지막 페이지로 이동 */}
      <button
        className={`px-2 py-1 ${
          nextPage === 0 ? "text-gray-300" : "text-gray-600 hover:text-gray-800"
        }`}
        onClick={() => onPageChange(totalPages)}
        disabled={nextPage === 0}
      >
        <FiChevronsRight size={16} />
      </button>
    </div>
  );
};

export default Pagination;
