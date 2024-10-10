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

const NewWorksPage = ({ onSearchInputChange }) => {
  const { isLoggedIn, role, id } = useAuth();
  const navigate = useNavigate();

  const [condition, setCondition] = useState("researchTab");
  const [searchParam, setSearchParam] = useState({
    tabCondition: condition,
    beachSearch: null,
  });
  const [searchedData, setSearchedData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [sortOrder, setSortOrder] = useState("desc");
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (!isLoggedIn || role !== "ADMIN") {
      navigate("/", { replace: true });
    }
  }, [isLoggedIn, role, navigate]);

  const fetchNewWorks = async () => {
    try {
      const response = await getNewWorks(id, {
        tabCondition: condition === "researchTab" ? "조사 완료" : "청소 완료",
        beachSearch: searchParam.beachSearch,
        page: currentPage,
        size: itemsPerPage,
        sort: sortOrder,
      });
      setSearchedData(response.data.dtoList);
      setTotalPages(Math.ceil(response.data.totalCount / itemsPerPage));
    } catch (error) {
      console.error("데이터 검색 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    fetchNewWorks();
  }, [condition, searchParam, currentPage, sortOrder]);

  const handleSearchInputChange = (inputValue) => {
    setSearchParam((prev) => ({
      ...prev,
      beachSearch: inputValue,
    }));
  };

  const handleSortChange = (sortOrder) => {
    setSortOrder(sortOrder);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
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
              setActiveTab={setCondition}
              activeTab={condition}
              initSearchParam={setSearchParam}
              tabNames={["조사 완료", "청소 완료"]}
              tabKeys={["researchTab", "cleanTab"]}
              searchParams={searchParam}
            />

            <div className="flex items-center space-x-4 rounded-full p-2 w-full justify-end h-12">
              <Searchbar onInputChange={handleSearchInputChange} />
              <SearchButton
                onSearch={fetchNewWorks}
                beachSearch={searchParam.beachSearch}
              />
            </div>
          </div>
        </div>
        <ListCountAndSort
          totalCount={searchedData.length}
          onSortChange={handleSortChange}
        />

        {searchedData.length > 0 ? (
          <Link
            to={"/ResearchReport"}
            className="flex flex-wrap justify-between gap-4 mb-8 h-full w-full"
          >
            {searchedData.map((report) => (
              <Card
                key={report.id}
                image={
                  report.thumbnail ||
                  "https://www.jejunews.com/news/photo/202110/2186126_208084_2056.jpg"
                }
                beachName={report.beachName || "해안가명"}
                worker={
                  report.researcherName || report.cleanerName || "작업 종류"
                }
                date={
                  report.reportTime || report.cleanDateTime || "날짜 정보 없음"
                }
                status={
                  report.status === "ASSIGNMENT_NEEDED"
                    ? "배정 필요"
                    : report.status === "ASSIGNMENT_COMPLETED"
                    ? "작업 완료"
                    : "상태 없음"
                }
              />
            ))}
          </Link>
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
