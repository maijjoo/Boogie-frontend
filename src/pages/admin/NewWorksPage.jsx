import React, { useEffect, useState } from "react";
import SidebarLayout from "../../layouts/SidebarLayout";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { getNewWorks } from "../../api/newWorksApi";
import ConditionTabs from "../../components/searchCondition/admin/ConditionTabs";
import Searchbar from "../../components/searchCondition/admin/Searchbar";
import SearchButton from "../../components/searchCondition/admin/SearchButton";
import Card from "../../components/commons/Card";
import NoticeIcon from "../../assets/images/notice.png";
import ListCountAndSort from "../../components/commons/ListCountAndSort";
import Pagination from "../../components/commons/Pagination";
import { useNewWorks } from "../../hooks/useNewWorks";

const NewWorksPage = () => {
  const { isLoggedIn, role, id } = useAuth();
  const navigate = useNavigate();
  const {
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
    fetchNewWorks,
  } = useNewWorks(id);

  useEffect(() => {
    if (!isLoggedIn || role !== "ADMIN") {
      navigate("/", { replace: true });
    }
  }, [isLoggedIn, role, navigate]);

  // const fetchNewWorks = async () => {
  //   try {
  //     const response = await getNewWorks(id, {
  //       tabCondition: condition === "researchTab" ? "조사 완료" : "청소 완료",
  //       beachSearch: searchParam.beachSearch,
  //       page: currentPage,
  //       size: itemsPerPage,
  //       sort: sortOrder,
  //     });
  //     console.log("------------newTasks get response: ", response);

  //     setTotalLength(response.data.totalCount);
  //     setSearchedData(response.data.dtoList);
  //     setTotalPages(Math.ceil(response.data.totalCount / itemsPerPage));
  //   } catch (error) {
  //     console.error("데이터 검색 중 오류 발생:", error);
  //   }
  // };

  useEffect(() => {
    fetchNewWorks();
  }, [searchParam]);

  const handleSearchInputChange = (inputValue) => {
    setSearchInput(inputValue);
  };

  const handleSearch = (input) => {
    setCurrentPage(1);
    setSearchInput(input);
    setSearchParam((prev) => ({
      ...prev,
      page: currentPage,
      beachSearch: searchInput,
    }));
    fetchNewWorks();
  };

  const handleSortChange = (sortOrder) => {
    setSortOrder(sortOrder);
    setSearchParam((prev) => ({ ...prev, sort: sortOrder }));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setSearchParam((prev) => ({ ...prev, page: currentPage }));
  };

  const handleConditionChange = (condition) => {
    setCondition(condition);
    setSearchParam((prev) => ({ ...prev, tabCondition: condition }));
  };

  return (
    <SidebarLayout>
      <div className="min-h-screen bg-gray-100 py-8 px-28">
        <Link to={"/newWorks"}>
          <h1 className="text-xl font-bold mb-2 text-blue-700">New 작업</h1>
        </Link>
        <div className="bg-white rounded-lg shadow px-14 py-4 mb-8 h-24">
          <div className="flex items-center justify-between w-full">
            <ConditionTabs
              setActiveTab={handleConditionChange}
              activeTab={condition}
              initSearchParam={setSearchParam}
              tabNames={["조사 완료", "청소 완료"]}
              tabKeys={["조사 완료", "청소 완료"]}
              searchParams={searchParam}
            />

            <div className="flex items-center space-x-4 rounded-full p-2 w-full justify-end h-12">
              <Searchbar
                onSearchInputChange={handleSearchInputChange}
                onSearch={handleSearch}
                placeholder="해안명을 입력하세요"
              />
              <SearchButton onSearch={handleSearch} />
            </div>
          </div>
        </div>
        <ListCountAndSort
          totalCount={totalLength}
          onSortChange={handleSortChange}
        />

        {searchedData && searchedData.length > 0 ? (
          <div className="flex flex-wrap justify-start gap-4 mb-8 h-full w-full">
            {searchedData.map((report) => {
              return <Card key={report.id} report={report} tab={condition} />;
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center mt-40">
            <img
              src={NoticeIcon}
              alt="Notice"
              className="w-8 h-8 object-cover mb-2"
            />
            <p className="text-[#014EB6] font-semibold text-lg">
              {searchParam.beachSearch
                ? "검색 결과가 없습니다"
                : "해당 데이터가 없습니다"}
            </p>
          </div>
        )}

        <div className="flex justify-center mt-4">
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </SidebarLayout>
  );
};

export default NewWorksPage;
