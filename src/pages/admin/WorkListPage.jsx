import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useCompletedWorks } from "../../hooks/useCompletedWork";
import { useAuth } from "../../hooks/useAuth";
import SidebarLayout from "../../layouts/SidebarLayout";
import ConditionTabs from "../../components/searchCondition/admin/ConditionTabs";
import Searchbar from "../../components/searchCondition/admin/Searchbar";
import SearchButton from "../../components/searchCondition/admin/SearchButton";
import Card from "../../components/commons/Card";
import NoticeIcon from "../../assets/images/notice.png";
import ListCountAndSort from "../../components/commons/ListCountAndSort";
import Pagination from "../../components/commons/Pagination";
import {
  setBeachSearch,
  setSort,
  setPage,
  setTabCondition,
  resetCompleted,
} from "../../slices/completedSlice";

const WorkListPage = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, role, id } = useAuth();
  const navigate = useNavigate();
  const [isReset, setIsReset] = useState(true);
  const { resetOld } = useLocation().state || { resetOld: true };

  const { page, tabCondition, beachSearch, sort } = useSelector(
    (state) => state.completed
  );

  const { searchedData, totalLength, totalPages, fetchCompletedWorks } =
    useCompletedWorks(id);
  const beachRef = useRef();

  useEffect(() => {
    if (isReset && resetOld) {
      dispatch(resetCompleted());
    }
  }, [dispatch]);

  // 관리자 id 아니면 로그인 페이지로 이동
  useEffect(() => {
    if (!isLoggedIn || role !== "ADMIN") {
      navigate("/", { replace: true });
    }
  }, [isLoggedIn, role, navigate]);

  // 탭이나 검색어가 변경될 때마다 데이터를 새로 가져옴
  useEffect(() => {
    fetchCompletedWorks();
  }, [page, beachSearch, sort, tabCondition, fetchCompletedWorks]);

  const handleSearch = () => {
    dispatch(setPage(1));
    dispatch(setBeachSearch(beachRef.current.value));
    fetchCompletedWorks();
  };

  const handleSortChange = (newSortOrder) => {
    dispatch(setSort(newSortOrder));
    dispatch(setPage(1));
  };

  const handlePageChange = (newPage) => {
    dispatch(setPage(newPage));
  };

  const handleConditionChange = (condition) => {
    dispatch(setTabCondition(condition));
    dispatch(setPage(1));
    dispatch(setSort("desc"));
    dispatch(setBeachSearch(""));
    beachRef.current.value = "";
  };

  const handleReset = () => {
    setIsReset(false);
  };

  return (
    <SidebarLayout>
      <div className="min-h-screen bg-gray-100 py-8 px-28">
        <h1
          className="text-xl font-bold mb-2 text-blue-700 inline-block cursor-pointer"
          onClick={() => {
            dispatch(resetCompleted());
            navigate("/workList");
          }}
        >
          작업 조회
        </h1>
        {/* 조회 전체 div */}
        <div className="bg-white rounded-lg shadow px-14 py-4 mb-8 h-24">
          <div className="flex items-center justify-between w-full">
            {/* 탭 버튼: 왼쪽 정렬 */}
            <ConditionTabs
              setActiveTab={handleConditionChange}
              activeTab={tabCondition}
              tabNames={["조사 완료", "청소 완료", "수거 완료"]} // 탭 이름 3개 전달
              tabKeys={["조사", "청소", "수거"]} // 탭 키 3개 전달
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
                <Card
                  key={report.id}
                  report={report}
                  tab={tabCondition}
                  onMove={handleReset}
                />
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
