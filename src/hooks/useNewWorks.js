import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setTabCondition,
  setBeachSearch,
  setPage,
  setSize,
  setSort,
} from "../slices/conditionSlice";
import { getNewWorks, completeNewWorks } from "../api/newWorksApi";

export const useNewWorks = (id) => {
  const [searchedData, setSearchedData] = useState([]);
  const [totalLength, setTotalLength] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [nextPage, setNextPage] = useState(0);
  const [prevPage, setPrevPage] = useState(0);
  const [pageNumberList, setPageNumberList] = useState([]);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [condition, setCondition] = useState("조사 완료");
  // const [sortOrder, setSortOrder] = useState("desc");
  // const [searchInput, setSearchInput] = useState("");
  // const itemsPerPage = 10;
  // const [searchParam, setSearchParam] = useState({
  //   tabCondition: condition,
  //   beachSearch: searchInput,
  //   page: currentPage,
  //   size: itemsPerPage,
  //   sort: sortOrder,
  // });

  const dispatch = useDispatch();
  const { tabCondition, beachSearch, page, size, sort } = useSelector(
    (state) => state.condition
  );
  const itemsPerPage = size;

  const fetchNewWorks = useCallback(async () => {
    const searchParam = {
      tabCondition,
      beachSearch,
      page,
      size,
      sort,
    };

    try {
      const response = await getNewWorks(id, searchParam);
      setTotalLength(response.data.totalCount);
      setSearchedData(response.data.dtoList);
      setTotalPages(Math.ceil(response.data.totalCount / itemsPerPage));
      setNextPage(response.data.nextPage);
      setPrevPage(response.data.prevPage);
      setPageNumberList(response.data.pageNumberList);
    } catch (error) {
      console.error("데이터 검색 중 오류 발생 : ", error);
    }
  }, [id, tabCondition, beachSearch, page, itemsPerPage, sort]);

  useEffect(() => {
    fetchNewWorks();
  }, [fetchNewWorks]);

  const handleComplete = async (reportId) => {
    try {
      await completeNewWorks(reportId, tabCondition);

      if (searchedData.length === 1 && page > 1) dispatch(setPage(page - 1));
      else fetchNewWorks();
    } catch (error) {
      console.error("작업 완료 중 오류 발생 : ", error);
    }
  };

  return {
    searchedData,
    totalLength,
    totalPages,
    page,
    tabCondition,
    nextPage,
    prevPage,
    pageNumberList,
    setTabCondition: (condition) => dispatch(setTabCondition(condition)),
    setBeachSearch: (search) => dispatch(setBeachSearch(search)),
    setPage: (newPage) => dispatch(setPage(newPage)),
    setSize: (newSize) => dispatch(setSize(newSize)),
    setSort: (sortOrder) => dispatch(setSort(sortOrder)),
    handleComplete,
    fetchNewWorks,
  };
};
