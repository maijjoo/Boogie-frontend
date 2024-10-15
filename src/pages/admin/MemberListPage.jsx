import React, { useEffect, useState } from "react";
import SidebarLayout from "../../layouts/SidebarLayout";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import ConditionTabs from "../../components/searchCondition/admin/ConditionTabs";
import Searchbar from "../../components/searchCondition/admin/Searchbar";
import SearchButton from "../../components/searchCondition/admin/SearchButton";
import Button from "../../components/searchCondition/admin/WebButton";
import NoticeIcon from "../../assets/images/notice.png";
import { getMemberList } from "../../api/memberListApi";
import excelHoeverIcon from "../../assets/icons/write/ExcelIcon.png";
import excelIcon from "../../assets/icons/adminMode/excelBlue.png";
import addHoverIcon from "../../assets/icons/adminMode/add.png";
import addIcon from "../../assets/icons/adminMode/addBlue.png";
import deleteHoverIcon from "../../assets/icons/adminMode/delete.png";
import deleteIcon from "../../assets/icons/adminMode/deleteBlue.png";
import ListCountAndSort from "../../components/commons/ListCountAndSort";
import TableComponent from "../../components/table/TableComponent";
import Pagination from "../../components/commons/Pagination";

const MemberListPage = () => {
  // 관리자 id, 역할
  const { isLoggedIn, role } = useAuth();
  const navigate = useNavigate();

  // 조회 조건 탭(조사 완료/청소 완료)
  const [condition, setCondition] = useState("allWorkersTab");

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
  const fetchMemberList = async () => {
    try {
      let tabCondition = "";
      if (condition === "allWorkersTab") {
        tabCondition = "전체";
      } else if (condition === "researcherClaenerATab") {
        tabCondition = "조사/청소";
      } else if (condition === "collectorTab") {
        tabCondition = "수거자";
      }
      const response = await getMemberList({
        ...searchParam,
        tabCondition,
      });
      setSearchedData(response.data);
    } catch (error) {
      console.error("데이터 검색 중 오류 발생:", error);
    }
  };

  // 탭이나 검색어가 변경될 때마다 데이터를 새로 가져옴
  useEffect(() => {
    fetchMemberList();
  }, [condition, searchParam]);

  // 검색어 상태 및 핸들러
  const [searchValue, setSearchValue] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    handleSearchInputChange(value);
  };

  const handleSearch = () => {
    fetchMemberList();
  };

  // 각 버튼의 hover 상태관리
  const [isHovered, setIsHovered] = useState({
    add: false,
    excel: false,
    delete: false,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleSortChange = (sortOrder) => {
    setSortOrder(sortOrder);
  };
  const headers = [
    { label: "", width: "40px", isCheckbox: true }, // 체크박스 열을 40px로 설정
    { label: "번호", width: "50px", isCheckbox: false }, // 번호 열을 50px로 설정
    { label: "이름", width: "120px", isCheckbox: false },
    { label: "연락처", width: "200px", isCheckbox: false },
    { label: "차량 적재량(t)", width: "150px", isCheckbox: false },
    { label: "시작일", width: "150px", isCheckbox: false },
    { label: "종료일", width: "150px", isCheckbox: false },
    { label: "가입일", width: "150px", isCheckbox: false },
  ];

  const rows = [
    [
      "",
      "1",
      "홍길동",
      "010-1234-5678",
      "5t",
      "2023-01-01",
      "2023-12-31",
      "2023-01-01",
    ],
    [
      "",
      "2",
      "이순신",
      "010-9876-5432",
      "3t",
      "2023-02-01",
      "2023-12-31",
      "2023-02-01",
    ],
  ];
  return (
    <SidebarLayout>
      <div className="min-h-screen bg-gray-100 py-8 px-28">
        <h1 className="text-xl font-bold mb-2 text-blue-700">회원 조회</h1>
        {/* 조회 전체 div */}
        <div className="bg-white rounded-lg shadow px-14 py-4 mb-8 h-24">
          <div className="flex items-center justify-between w-full">
            {/* 탭 버튼: 왼쪽 정렬 */}
            <ConditionTabs
              setActiveTab={setCondition}
              activeTab={condition}
              initSearchParam={setSearchParam}
              tabNames={["전체", "조사/청소", "수거자"]}
              tabKeys={[
                "allWorkersTab",
                "researcherClaenerATab",
                "collectorTab",
              ]}
              searchParams={searchParam}
            />

            {/* 검색어 입력창과 검색 버튼: 오른쪽 정렬 */}
            <div className="flex items-center space-x-4 rounded-full p-2 w-full justify-end h-12">
              <Searchbar
                placeholder="회원명을 입력하세요"
                searchValue={searchValue}
                onSearchInputChange={handleInputChange}
                onSearch={handleSearch}
              />
              <SearchButton onSearch={handleSearch} />
            </div>
          </div>
        </div>

        {/* 등록 및 삭제 버튼 */}
        <div className="flex justify-end items-center mb-8">
          <Button
            color="emptyBlue"
            size="medium"
            className="flex items-center justify-center"
            onMouseEnter={() =>
              setIsHovered((prev) => ({ ...prev, add: true }))
            }
            onMouseLeave={() =>
              setIsHovered((prev) => ({ ...prev, add: false }))
            }
          >
            <img
              src={isHovered.add ? addHoverIcon : addIcon}
              alt="add"
              className="w-5 h-5 mr-2"
            />
            개별 등록
          </Button>
          <Button
            color="emptyBlue"
            size="medium"
            className="ml-2 flex items-center justify-center"
            onMouseEnter={() =>
              setIsHovered((prev) => ({ ...prev, excel: true }))
            }
            onMouseLeave={() =>
              setIsHovered((prev) => ({ ...prev, excel: false }))
            }
          >
            <img
              src={isHovered.excel ? excelHoeverIcon : excelIcon}
              alt="ExcelIcon"
              className="w-5 h-5 mr-2"
            />
            일괄 등록
          </Button>
          <Button
            color="emptyBlue"
            size="medium"
            className="ml-2 flex items-center justify-center"
            onMouseEnter={() =>
              setIsHovered((prev) => ({ ...prev, delete: true }))
            }
            onMouseLeave={() =>
              setIsHovered((prev) => ({ ...prev, delete: false }))
            }
          >
            <img
              src={isHovered.delete ? deleteHoverIcon : deleteIcon}
              alt="delete"
              className="w-5 h-5 mr-2"
            />
            선택 삭제
          </Button>
        </div>
        <ListCountAndSort
          totalCount={searchedData.length}
          onSortChange={handleSortChange}
        />
        <div className="">
          <TableComponent headers={headers} rows={rows} />
        </div>
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

export default MemberListPage;
