import React, { useEffect, useRef } from "react";
import SidebarLayout from "../../layouts/SidebarLayout";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import ConditionTabs from "../../components/searchCondition/admin/ConditionTabs";
import Searchbar from "../../components/searchCondition/admin/Searchbar";
import SearchButton from "../../components/searchCondition/admin/SearchButton";
import Card from "../../components/commons/Card";
import NoticeIcon from "../../assets/images/notice.png";
import { useDispatch, useSelector } from "react-redux";
import { useCompletedWorks } from "../../hooks/useCompletedWork";
import {
  setBeachSearch,
  setSort,
  setPage,
  setTabCondition,
} from "../../slices/completedSlice";
import ListCountAndSort from "../../components/commons/ListCountAndSort";
import Pagination from "../../components/commons/Pagination";
import { resetCondition } from "../../slices/conditionSlice";

const WorkListPage = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, role, id } = useAuth();
  const navigate = useNavigate();

  const { page, tabCondition, beachSearch, sort } = useSelector(
    (state) => state.completed
  );

  const { searchedData, totalLength, totalPages, fetchCompletedWorks } =
    useCompletedWorks(id);
  const beachRef = useRef();

  useEffect(() => {
    return () => {
      dispatch(resetCondition()); // 페이지를 벗어날 때 상태 초기화
    };
  }, [dispatch]);

  // // 조회 조건 탭(조사 완료/청소 완료)
  // const [condition, setCondition] = useState("researchTab");

  // // 조회 파라미터(해안명)
  // const [searchParam, setSearchParam] = useState({
  //   beachName: "", // 초기 값은 빈 문자열
  // });

  // // 조회 결과 데이터
  // const [searchedData, setSearchedData] = useState([]);

  // 관리자 id 아니면 로그인 페이지로 이동
  useEffect(() => {
    if (!isLoggedIn || role !== "ADMIN") {
      navigate("/", { replace: true });
    }
  }, [isLoggedIn, role, navigate]);

  // 유저가 입력한 검색어로 searchParam 업데이트
  // const handleSearchInputChange = (inputValue) => {
  //   setSearchParam((prev) => ({
  //     ...prev,
  //     beachName: inputValue, // 검색어를 beachName으로 설정
  //   }));
  // };

  // API 호출 함수
  // const fetchNewWorks = async () => {
  //   try {
  //     const response = await getWorkList({
  //       ...searchParam,
  //       tabCondition: condition === "researchTab" ? "조사" : "청소",
  //     });
  //     setSearchedData(response.data); // API 응답 데이터 설정
  //   } catch (error) {
  //     console.error("데이터 검색 중 오류 발생:", error);
  //   }
  // };

  // 탭이나 검색어가 변경될 때마다 데이터를 새로 가져옴
  useEffect(() => {
    fetchCompletedWorks(); // 상태가 변경될 때마다 호출
  }, [page, beachSearch, sort, tabCondition, fetchCompletedWorks]);

  // const [searchValue, setSearchValue] = useState("");

  // const handleInputChange = (e) => {
  //   const value = e.target.value;
  //   setSearchValue(value);
  //   onSearchInputChange(value); // 부모 컴포넌트로 검색어 전달
  // };

  const handleSearch = () => {
    dispatch(setPage(1));
    dispatch(setBeachSearch(beachRef.current.value));
    fetchCompletedWorks();
  };

  const handleSortChange = (newSortOrder) => {
    // setSortOrder(sortOrder);
    // setSearchParam((prev) => ({ ...prev, sort: sortOrder }));
    dispatch(setSort(newSortOrder));
    dispatch(setPage(1));
  };

  const handlePageChange = (newPage) => {
    // setCurrentPage(page);
    // setSearchParam((prev) => ({ ...prev, page: currentPage }));
    dispatch(setPage(newPage));
  };

  const handleConditionChange = (condition) => {
    // setCondition(condition);
    // setSearchParam((prev) => ({ ...prev, tabCondition: condition }));
    dispatch(setTabCondition(condition));
    dispatch(setPage(1));
  };

  return (
    <SidebarLayout>
      <div className="min-h-screen bg-gray-100 py-8 px-28">
        <h1 className="text-xl font-bold mb-2 text-blue-700">작업 조회</h1>
        {/* 조회 전체 div */}
        <div className="bg-white rounded-lg shadow px-14 py-4 mb-8 h-24">
          <div className="flex items-center justify-between w-full">
            {/* 탭 버튼: 왼쪽 정렬 */}
            <ConditionTabs
              setActiveTab={handleConditionChange}
              activeTab={tabCondition}
              // initSearchParam={setSearchParam}
              tabNames={["조사 완료", "청소 완료", "수거 완료"]} // 탭 이름 3개 전달
              tabKeys={["조사", "청소", "수거"]} // 탭 키 3개 전달
              // searchParams={searchParam} // 상태로 관리된 searchParam을 전달
            />

            {/* 검색어 입력창과 검색 버튼: 오른쪽 정렬 */}
            <div className="flex items-center space-x-4 rounded-full p-2 w-full justify-end h-12">
              <Searchbar
                onSearch={handleSearch}
                ref={beachRef}
                placeholder="해안명을 입력하세요"
                activeSearch={beachSearch}
              />
              <SearchButton onSearch={handleSearch} />
              {/* 검색 버튼에 beachName 전달 */}
            </div>
          </div>
        </div>
        <ListCountAndSort
          totalCount={totalLength}
          onSortChange={handleSortChange}
          activeSort={sort}
        />

        {/* 작업 보고서 리스트 */}
        {searchedData && searchedData.length > 0 ? (
          <>
            <div className="flex flex-wrap justify-start gap-4 mb-8 h-full w-full">
              {/* 그리드 레이아웃으로 카드 배열 */}
              {searchedData.map((report) => (
                <Card key={report.id} report={report} tab={tabCondition} />
              ))}
            </div>
            <div className="flex justify-center mt-4">
              <Pagination
                totalPages={totalPages}
                currentPage={page}
                onPageChange={handlePageChange}
              />
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center mt-40">
            <img
              src={NoticeIcon}
              alt="Notice"
              className="w-8 h-8 object-cover mb-2"
            />
            <p className="text-[#014EB6] font-semibold text-lg">
              {beachSearch ? "검색 결과가 없습니다" : "해당 데이터가 없습니다"}
            </p>
          </div>
        )}
      </div>
    </SidebarLayout>
  );
};

export default WorkListPage;
