import React, { useEffect } from "react";
import {
  FiChevronsLeft,
  FiChevronLeft,
  FiChevronRight,
  FiChevronsRight,
} from "react-icons/fi";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  useEffect(() => {
    console.log("=======", totalPages);
  });

  return (
    <div className="flex items-center space-x-2">
      {/* 맨 처음 페이지로 이동 */}
      <button
        className={`px-2 py-1 ${
          currentPage === 1
            ? "text-gray-300"
            : "text-gray-600 hover:text-gray-800"
        }`}
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
      >
        <FiChevronsLeft size={16} />
      </button>

      {/* 이전 페이지로 이동 */}
      <button
        className={`px-2 py-1 ${
          currentPage === 1
            ? "text-gray-300"
            : "text-gray-600 hover:text-gray-800"
        }`}
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <FiChevronLeft size={16} />
      </button>

      {/* 페이지 번호 버튼 */}
      {getPageNumbers().map((page) => (
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

      {/* 다음 페이지로 이동 */}
      <button
        className={`px-2 py-1 ${
          currentPage === totalPages
            ? "text-gray-300"
            : "text-gray-600 hover:text-gray-800"
        }`}
        onClick={() =>
          currentPage < totalPages && onPageChange(currentPage + 1)
        }
        disabled={currentPage === totalPages}
      >
        <FiChevronRight size={16} />
      </button>

      {/* 맨 마지막 페이지로 이동 */}
      <button
        className={`px-2 py-1 ${
          currentPage === totalPages
            ? "text-gray-300"
            : "text-gray-600 hover:text-gray-800"
        }`}
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
      >
        <FiChevronsRight size={16} />
      </button>
    </div>
  );
};

export default Pagination;
