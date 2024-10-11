import React, { useEffect, useState } from "react";
import SidebarLayout from "../../layouts/SidebarLayout";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import ConditionTabs from "../../components/searchCondition/admin/ConditionTabs";
import Searchbar from "../../components/searchCondition/admin/Searchbar";
import SearchButton from "../../components/searchCondition/admin/SearchButton";
import NoticeIcon from "../../assets/images/notice.png";
import { getMemeberList } from "../../api/memberApi";

const MemberListPage = ({ onSearchInputChange }) => {
  // 관리자 id, 역할
  const { isLoggedIn, role } = useAuth();
  const navigate = useNavigate();

  // 조회 조건 탭(조사 완료/청소 완료)
  const [condition, setCondition] = useState("allWorkerTab");

  // 조회 파라미터(해안명)
  const [searchParam, setSearchParam] = useState({
    name: "", // 초기 값은 빈 문자열
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
      name: inputValue, // 검색어를 name으로 설정
    }));
  };

  // API 호출 함수
  const fetchNewWorks = async () => {
    try {
      // condition에 따른 tabCondition 값을 설정
      let tabCondition = "";
      if (condition === "allWorkersTab") {
        tabCondition = "전체";
      } else if (condition === "researcherClaenerATab") {
        tabCondition = "조사/청소";
      } else if (condition === "collectorTab") {
        tabCondition = "수거자";
      }
      const response = await getMemeberList({
        ...searchParam,
        tabCondition, // 설정된 tabCondition 전달
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

  const handleSearch = (name) => {
    console.log("검색 조건:", name); // 검색 조건 확인
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
              tabNames={["전체", "조사/청소", "수거자"]} // 탭 이름 3개 전달
              tabKeys={[
                "allWorkersTab",
                "researcherClaenerATab",
                "collectorTab",
              ]} // 탭 키 3개 전달
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
      </div>
    </SidebarLayout>
  );
};

export default MemberListPage;
