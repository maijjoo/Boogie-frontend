import { useCallback, useEffect, useState } from "react";
import { getNewWorks, completeNewWorks } from "../api/newWorksApi";

export const useNewWorks = (id) => {
  const [searchedData, setSearchedData] = useState([]);
  const [totalLength, setTotalLength] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [condition, setCondition] = useState("조사 완료");
  const [sortOrder, setSortOrder] = useState("desc");
  const [searchInput, setSearchInput] = useState("");
  const itemsPerPage = 10;
  const [searchParam, setSearchParam] = useState({
    tabCondition: condition,
    beachSearch: searchInput,
    page: currentPage,
    size: itemsPerPage,
    sort: sortOrder,
  });

  const fetchNewWorks = useCallback(async () => {
    try {
      const response = await getNewWorks(id, searchParam);
      setTotalLength(response.data.totalCount);
      setSearchedData(response.data.dtoList);
      setTotalPages(Math.ceil(response.data.totalCount / itemsPerPage));
    } catch (error) {
      console.error("데이터 검색 중 오류 발생 : ", error);
    }
  }, [id, searchParam]);

  useEffect(() => {
    fetchNewWorks();
  }, [fetchNewWorks]);

  const handleComplete = async (reportId) => {
    try {
      await completeNewWorks(reportId, condition);

      if (searchedData.length === 1 && currentPage > 1)
        setCurrentPage((prev) => prev - 1);
      else fetchNewWorks();
    } catch (error) {
      console.error("작업 완료 중 오류 발생 : ", error);
    }
  };

  return {
    searchedData,
    totalLength,
    totalPages,
    currentPage,
    condition,
    sortOrder,
    searchInput,
    searchParam,
    setSearchParam,
    setCurrentPage,
    setCondition,
    setSortOrder,
    setSearchInput,
    handleComplete,
    fetchNewWorks,
  };
};
