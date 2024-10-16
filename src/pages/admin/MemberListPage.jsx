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
  const { isLoggedIn, role, id } = useAuth();
  const navigate = useNavigate();

  // 검색 조건 탭 [전체], [조사/청소자], [수거자]
  const [condition, setCondition] = useState("allWorkersTab");
  const [rows, setRows] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const itemsPerPage = 20; // 페이지 당 항목 수

  // 조회 파라미터(회원명), 기본 탭 [전체]
  const [searchParam, setSearchParam] = useState({
    tabCondition: "전체",
    searchName: "", // 초기 값은 빈 문자열
    page: currentPage,
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
      const response = await getMemberList(
        {
          ...searchParam,
          tabCondition,
        },
        id
      );
      console.log("-----------response----", response.data.dtoList);
      console.log("-----------response----", response.data.totalPage);
      setRows(response.data.dtoList);
      setSearchedData(response.data);
      setTotalPages(response.data.totalPage);
      setTotalCount(response.data.totalCount);
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

  useEffect(() => {
    console.log("--------------------" + searchedData);
  }, [searchedData]);

  // 각 버튼의 hover 상태관리
  const [isHovered, setIsHovered] = useState({
    add: false,
    excel: false,
    delete: false,
  });

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setSearchParam((prev) => ({
      ...prev,
      page: page, // 검색어를 name으로 설정
    }));
  };

  const [sortOrder, setSortOrder] = useState("desc"); // 기본 정렬은 내림차순

  const handleSortChange = (sortOrder) => {
    setSortOrder(sortOrder);
    setSearchParam((prev) => ({ ...prev, sort: sortOrder }));
    const sortedRows = [...rows].sort((a, b) => {
      const dateA = new Date(a.createdDate);
      const dateB = new Date(b.createdDate);

      // 오름차순 : 내림차순
      sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

    setRows(sortedRows); // 정렬된 데이터를 상태로 업데이트
  };

  // 회원 목록 테이블 컴포넌트 td값 지정
  const headers = [
    { label: "", width: "40px", isCheckbox: true, field: "" },
    {
      label: "번호",
      width: "60px",
      isCheckbox: false,
      field: "index",
      formatter: (row, index) => index, // 전체 인덱스를 계산해서 표시
    },
    { label: "이름", width: "100px", isCheckbox: false, field: "name" },
    { label: "연락처", width: "200px", isCheckbox: false, field: "phone" },
    {
      label: "차량 적재량(t)",
      width: "150px",
      isCheckbox: false,
      field: "vehicleCapacity",
      formatter: (row) => row.vehicleCapacity || "-",
    },
    { label: "시작일", width: "150px", isCheckbox: false, field: "startDate" },
    { label: "종료일", width: "150px", isCheckbox: false, field: "endDate" },
    {
      label: "가입일",
      width: "150px",
      isCheckbox: false,
      field: "createdDate",
      formatter: (row) => row.createdDate.split("T")[0],
    },
  ];

  // const rows = [...searchedData.dtoList];

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
          totalCount={totalCount}
          onSortChange={handleSortChange}
        />
        {rows && rows.length > 0 ? (
          <div className="">
            <TableComponent
              headers={headers}
              rows={rows}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
            />
            <div className="flex justify-center mt-4">
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center mt-40">
            <img
              src={NoticeIcon}
              alt="Notice"
              className="w-8 h-8 object-cover mb-2"
            />
            <p className="text-[#014EB6] font-semibold text-lg">
              {searchParam.searchName
                ? "검색 결과가 없습니다"
                : "해당 데이터가 없습니다"}
            </p>
          </div>
        )}
      </div>
    </SidebarLayout>
  );
};

export default MemberListPage;
