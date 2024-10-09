import React, { useEffect, useState } from "react";
import SidebarLayout from "../../layouts/SidebarLayout";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { getWorkList } from "../../api/workListApi";
import ConditionTabs from "../../components/searchCondition/admin/ConditionTabs";
import Searchbar from "../../components/searchCondition/admin/Searchbar";
import SearchButton from "../../components/searchCondition/admin/SearchButton";
import Card from "../../components/commons/Card";
import NoticeIcon from "../../assets/images/notice.png";

const WorkListPage = ({ onSearchInputChange }) => {
  // 관리자 id, 역할
  const { isLoggedIn, role } = useAuth();
  const navigate = useNavigate();

  // 조회 조건 탭(조사 완료/청소 완료)
  const [condition, setCondition] = useState("researchTab");

  // 조회 파라미터(해안명)
  const [searchParam, setSearchParam] = useState({
    beachName: "", // 초기 값은 빈 문자열
  });

  // 조회 결과 데이터
  const [searchedData, setSearchedData] = useState([]);

  // 관리자 id 아니면 로그인 페이지로 이동
  useEffect(() => {
    if (!isLoggedIn || role !== "ADMIN") {
      navigate("/", { replace: true });
    }
  }, [isLoggedIn, role, navigate]);

  // 유저가 입력한 검색어로 searchParam 업데이트
  const handleSearchInputChange = (inputValue) => {
    setSearchParam((prev) => ({
      ...prev,
      beachName: inputValue, // 검색어를 beachName으로 설정
    }));
  };

  // API 호출 함수
  const fetchNewWorks = async () => {
    try {
      const response = await getWorkList({
        ...searchParam,
        tabCondition: condition === "researchTab" ? "조사" : "청소",
      });
      setSearchedData(response.data); // API 응답 데이터 설정
    } catch (error) {
      console.error("데이터 검색 중 오류 발생:", error);
    }
  };

  // 탭이나 검색어가 변경될 때마다 데이터를 새로 가져옴
  useEffect(() => {
    fetchNewWorks(); // 상태가 변경될 때마다 호출
  }, [condition, searchParam]);

  const [searchValue, setSearchValue] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearchInputChange(value); // 부모 컴포넌트로 검색어 전달
  };

  const handleSearch = (beachName) => {
    console.log("검색 조건:", beachName); // 검색 조건 확인
    // 여기에 검색 로직 추가
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
              setActiveTab={setCondition}
              activeTab={condition}
              initSearchParam={setSearchParam}
              tabNames={["조사 완료", "청소 완료", "수거 완료"]} // 탭 이름 3개 전달
              tabKeys={["researchTab", "cleanTab", "extraWorkTab"]} // 탭 키 3개 전달
              searchParams={searchParam} // 상태로 관리된 searchParam을 전달
            />

            {/* 검색어 입력창과 검색 버튼: 오른쪽 정렬 */}
            <div className="flex items-center space-x-4 rounded-full p-2 w-full justify-end h-12">
              <Searchbar />
              <SearchButton onSearch={handleSearch} beachName={searchValue} />
              {/* 검색 버튼에 beachName 전달 */}
            </div>
          </div>
        </div>

        {/* 작업 보고서 리스트 */}
        {searchedData.length > 0 ? (
          <div className="flex flex-wrap justify-between gap-4 mb-8 h-full w-full">
            {/* 그리드 레이아웃으로 카드 배열 */}
            {searchedData.map((report) => (
              <Card
                key={report.id}
                image={
                  report.image ||
                  "https://www.jejunews.com/news/photo/202110/2186126_208084_2056.jpg"
                } // 이미지가 없는 경우 기본값 설정
                title={report.beachName || "해안가명"}
                worker={report.worker || "작업 종류"}
                date={report.date || "날짜 정보 없음"}
                status={report.status || "상태 없음"}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center mt-40">
            <img
              src={NoticeIcon}
              alt="Notice"
              className="w-8 h-8 object-cover mb-2"
            />
            <p className="text-[#014EB6] font-semibold text-lg">
              {searchValue ? "검색 결과가 없습니다" : "해당 데이터가 없습니다"}
            </p>
          </div>
        )}
      </div>
    </SidebarLayout>
  );
};

export default WorkListPage;
