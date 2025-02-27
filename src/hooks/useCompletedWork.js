import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setTabCondition,
  setBeachSearch,
  setPage,
  setSize,
  setSort,
} from "../slices/completedSlice";
import { getCompletedWorks } from "../api/workListApi";

export const useCompletedWorks = (id) => {
  const [searchedData, setSearchedData] = useState([]);
  const [totalLength, setTotalLength] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [nextPage, setNextPage] = useState(0);
  const [prevPage, setPrevPage] = useState(0);
  const [pageNumberList, setPageNumberList] = useState([]);

  const dispatch = useDispatch();
  const { tabCondition, beachSearch, page, size, sort } = useSelector(
    (state) => state.completed
  );
  const itemsPerPage = size;

  const fetchCompletedWorks = useCallback(async () => {
    const searchParam = {
      tabCondition,
      beachSearch,
      page,
      size,
      sort,
    };

    try {
      const response = await getCompletedWorks(id, searchParam);
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
    fetchCompletedWorks();
  }, [fetchCompletedWorks]);

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
    fetchCompletedWorks,
  };
};
