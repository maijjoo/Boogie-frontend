import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useNewWorks } from "../../hooks/useNewWorks";
import { useAuth } from "../../hooks/useAuth";
import { useResetConditions } from "../../hooks/useResetConditions";
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
  resetCondition,
} from "../../slices/conditionSlice";

const NewWorksPage = () => {
  useResetConditions("old");

  const dispatch = useDispatch(); // 리덕스 실행하는 함수
  const { isLoggedIn, role, id } = useAuth();
  // const location = useLocation();
  const navigate = useNavigate();
  // const [isReset, setIsReset] = useState(true);

  const {
    searchedData,
    totalLength,
    totalPages,
    fetchNewWorks,
    nextPage,
    prevPage,
    pageNumberList,
  } = useNewWorks(id); // 훅에서 사용할 값 가져오기
  const beachRef = useRef(); // 검색창 컴포넌트에서 검색어 가져오기

  const { page, tabCondition, beachSearch, sort } = useSelector(
    (state) => state.condition
  ); // 리덕스에서 사용할 값 가져오기

  useEffect(() => {
    if (!isLoggedIn || role === "WORKER") {
      navigate("/", { replace: true });
    }
  }, [isLoggedIn, role, navigate]);

  useEffect(() => {
    fetchNewWorks();
  }, [page, beachSearch, sort, tabCondition, fetchNewWorks]);

  const handleSearch = () => {
    dispatch(setPage(1));
    if (beachRef.current) {
      const searchValue = beachRef.current.getValue();
      dispatch(setBeachSearch(searchValue));
    }
    fetchNewWorks();
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
    if (beachRef.current) {
      beachRef.current.clear();
    }
  };

  return (
    <SidebarLayout>
      <div className="min-h-screen bg-gray-100 py-8 px-28">
        <h1
          className="text-xl font-bold mb-2 text-blue-700 inline-block cursor-pointer"
          onClick={() => {
            dispatch(resetCondition());
            navigate("/newWorks", { replace: true });
          }}
        >
          New 작업
        </h1>
        <div className="bg-white rounded-lg shadow px-14 py-4 mb-8 h-24">
          <div className="flex justify-between items-center w-full">
            <ConditionTabs
              setActiveTab={handleConditionChange}
              activeTab={tabCondition}
              tabNames={["조사 완료", "청소 완료"]}
              tabKeys={["조사 완료", "청소 완료"]}
            />
            <div className="flex items-center rounded-full p-2 w-3/5 justify-end h-12">
              <Searchbar
                onSearch={handleSearch}
                ref={beachRef}
                placeholder="해안명을 입력하세요"
                activeSearch={beachSearch}
              />
              <SearchButton onSearch={handleSearch} />
            </div>
          </div>
        </div>
        <ListCountAndSort
          totalCount={totalLength}
          onSortChange={handleSortChange}
          activeSort={sort}
        />

        {searchedData && searchedData.length > 0 ? (
          <>
            <div className="flex flex-wrap justify-start gap-4 mb-8 h-full w-full">
              {searchedData.map((report) => (
                <Card key={report.id} report={report} tab={tabCondition} />
              ))}
            </div>
            <div className="flex justify-center mt-4">
              <Pagination
                totalPages={totalPages}
                currentPage={page}
                onPageChange={handlePageChange}
                nextPage={nextPage}
                prevPage={prevPage}
                pageNumberList={pageNumberList}
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

export default NewWorksPage;
