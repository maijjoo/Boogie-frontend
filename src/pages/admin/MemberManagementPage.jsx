import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { createBulkMember, getMemberList } from "../../api/memberListApi";
import { getAdminDetail } from "../../api/memberDetailApi";
import SidebarLayout from "../../layouts/SidebarLayout";
import ConditionTabs from "../../components/searchCondition/admin/ConditionTabs";
import Searchbar from "../../components/searchCondition/admin/Searchbar";
import SearchButton from "../../components/searchCondition/admin/SearchButton";
import Button from "../../components/searchCondition/admin/WebButton";
import NoticeIcon from "../../assets/images/notice.png";
import excelHoeverIcon from "../../assets/icons/write/ExcelIcon.png";
import excelIcon from "../../assets/icons/adminMode/excelBlue.png";
import addHoverIcon from "../../assets/icons/adminMode/add.png";
import addIcon from "../../assets/icons/adminMode/addBlue.png";
import ListCountAndSort from "../../components/commons/ListCountAndSort";
import TableComponent from "../../components/table/TableComponent";
import Pagination from "../../components/commons/Pagination";
import AdminDetailModalComponent from "../../components/admin/modal/AdminDetailModalComponent";
import CreateAdminModalComponent from "../../components/admin/modal/CreateAdminModalComponent";
import CreateBulkModalComponent from "../../components/admin/modal/CreateBulkModalComponent";

const MemberManagementPage = () => {
  const { isLoggedIn, role, id } = useAuth(); // 로그인 유저 정보 확인
  const navigate = useNavigate();
  const [condition, setCondition] = useState("adminTab"); // 검색 조건 탭 [관리자], [조사/청소자], [수거자]
  const [rows, setRows] = useState([]); // 회원 목록
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 1 지정
  const [totalPages, setTotalPages] = useState(0); // 총 페이지 수
  const [totalCount, setTotalCount] = useState(0); // 목록의 총 회원 수
  const itemsPerPage = 20; // 페이지 당 항목 수
  const nameRef = useRef();

  // 회원 등록 =================================================================================
  const [isCreateAdminModalComponent, setIsCreateAdminModalComponent] =
    useState(false); // 회원 등록 모달 상태
  const openCreateAdminModalComponent = () => {
    setIsCreateAdminModalComponent(true); // 모달 열기 상태로 변경
  };
  const closeCreateAdminModalComponent = (message) => {
    setIsCreateAdminModalComponent(false); // 모달 닫기 상태로 변경
    if (message === "success") {
      fetchMemberList();
    }
  };

  // 관리자 일괄 등록 =================================================================================
  const [isCreateAdminBulkModalComponent, setIsCreateAdminBulkModalComponent] =
    useState(false);

  const openCreateAdminBulkModalComponent = () => {
    setIsCreateAdminBulkModalComponent(true);
  };

  const closeCreateAdminBulkModalComponent = () => {
    setIsCreateAdminBulkModalComponent(false);
  };

  const handleCreateAdminBulk = (formData) => {
    console.log("mngmnt page got formData: ");

    for (let [key, value] of formData.entries()) {
      console.log("key: ", key, ", value: ", value); // FormData에 파일이 제대로 들어갔는지 확인
    }
    const res = createBulkMember(formData, id, "admin");
    console.log("create bulk admin res: ", res);

    setIsCreateAdminBulkModalComponent(false);
  };

  // 관리자 상세정보 =================================================================================
  const [isAdminDetailModalComponent, setIsAdminDetailModalComponent] =
    useState(false); // 회원 상세정보 모달 상태
  // 관리자 상세 모달 열기 함수
  const openAdminDetailModalComponent = async (member) => {
    try {
      // member에서 workerId를 가져와 API 호출
      const adminId = member.id; // 여기서 member의 id를 workerId로 사용
      const response = await getAdminDetail(adminId);

      console.log("Fetched Admin Details:", response); // API에서 데이터를 잘 받아오는지 확인

      // API에서 가져온 회원 상세 정보를 selectedMember에 설정
      setSelectedMember(response); // response는 getWorkerDetail에서 받은 데이터
      setIsAdminDetailModalComponent(true); // 상세 모달 열기
    } catch (error) {
      console.error("관리자 상세 정보를 가져오는 중 오류 발생:", error);
    }
  };
  // 관리자 상세 모달 닫기 함수
  const closeAdminDetailModalComponent = () => {
    setIsAdminDetailModalComponent(false); // 모달 닫기 상태로 변경
    setSelectedMember(null); // 모달 닫을 때 선택된 회원 초기화
  };

  const [checkedRows, setCheckedRows] = useState([]); // 체크된 row 상태 관리
  // 체크된 상태를 업데이트하는 핸들러
  // const handleCheckChange = (checkedRows) => {
  //   console.log("체크된 회원 ID 목록:", checkedRows); // 여기에 선택된 회원 ID를 출력
  //   setCheckedRows(checkedRows); // 체크된 상태를 업데이트
  // };
  const [selectedMember, setSelectedMember] = useState(null); // 선택된 회원 정보 상태 관리
  // const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // 회원 삭제 모달 상태
  // const openDeleteModal = () => setIsDeleteModalOpen(true); // 회원 삭제 모달 열기
  // const closeDeleteModal = () => setIsDeleteModalOpen(false); // 회원 삭제 모달 닫기

  // 삭제 함수: 체크된 회원 ID를 삭제
  // const handleDelete = async () => {
  //   // const idsToDelete = checkedRows
  //   //   .filter((checked) => checked) // 체크된 행 필터링
  //   //   .map((row) => row.id); // 회원 ID 추출
  //   // // 삭제할 ID 확인
  //   // console.log("삭제할 회원 ID 목록:", idsToDelete);
  //   // console.log(
  //   //   "삭제할 회원 ID 목록:",
  //   //   checkedRows
  //   //     .filter((checked) => checked) // 체크된 행 필터링
  //   //     .map((row) => row.id)
  //   // );
  //   try {
  //     await deleteMemberApi(checkedRows); // API 호출
  //     setIsDeleteModalOpen(false);
  //     fetchMemberList(); // 삭제 후 목록 새로고침
  //   } catch (error) {
  //     console.error("회원 삭제 중 오류 발생:", error);
  //   }
  // };

  // 조회 파라미터
  const [searchParam, setSearchParam] = useState({
    tabCondition: "관리자", // 기본 탭 지정 [관리자]
    nameSearch: "", // 검색어 회원명 초기값은 빈 문자열
    page: currentPage,
  });
  const [searchedData, setSearchedData] = useState([]); // 조회 결과 데이터

  // 유저가 입력한 검색어로 searchParam 업데이트
  // const handleSearchInputChange = (inputValue) => {
  //   setSearchParam((prev) => ({
  //     ...prev,
  //     name: inputValue, // 검색어를 name으로 설정
  //   }));
  // };

  // 작업자 목록 테이블 컴포넌트 td값 지정
  const adminHeaders = [
    { label: "", width: "40px", isCheckbox: true, field: "" },
    {
      label: "번호",
      width: "60px",
      isCheckbox: false,
      field: "index",
      formatter: (row, index) => index, // 전체 인덱스를 계산해서 표시
    },
    { label: "이름", width: "100px", isCheckbox: false, field: "name" },
    { label: "근무처", width: "100px", isCheckbox: false, field: "workPlace" },
    { label: "부서", width: "100px", isCheckbox: false, field: "department" },
    { label: "연락처", width: "200px", isCheckbox: false, field: "contact" },
    { label: "이메일", width: "150px", isCheckbox: false, field: "email" },
  ];
  // 작업자 목록 테이블 컴포넌트 td값 지정
  const workerHeaders = [
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
      formatter: (row) => row.createdDate && row.createdDate.split("T")[0],
    },
  ];

  // 검색어 상태 및 핸들러
  // const [searchValue, setSearchValue] = useState("");

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setCheckedRows([]);
    setSearchParam((prev) => ({
      ...prev,
      page: page, // 검색어를 name으로 설정
    }));
  };

  // 입력 값이 바뀔 때 호출되는 함수
  // const handleInputChange = (e) => {
  //   const value = e.target.value; // 입력된 값
  //   setSearchValue(value); // 검색창 상태 업데이트
  //   setSearchParam((prev) => ({
  //     ...prev,
  //     nameSearch: value, // nameSearch 값 업데이트
  //   }));
  // };

  const handleSearch = () => {
    setCurrentPage(1);
    setCheckedRows([]);
    setSortOrder("desc");
    setSearchParam((prev) => ({
      ...prev,
      nameSearch: nameRef.current.getValue(),
      page: 1,
    }));
    console.log("------fetch by handleSearch------");

    fetchMemberList();
  };

  const [sortOrder, setSortOrder] = useState("desc"); // 기본 정렬은 내림차순

  const handleSortChange = (sortOrders) => {
    setSortOrder(sortOrders === "asc" ? "desc" : "asc");
    setSearchParam((prev) => ({ ...prev, sort: sortOrder }));
    setCheckedRows([]);
    // const sortedRows = [...rows].sort((a, b) => {
    //   const dateA = new Date(a.createdDate);
    //   const dateB = new Date(b.createdDate);
    //   return sortOrder === "asc" ? dateB - dateA : dateA - dateB;
    // });

    // setRows(sortedRows); // 정렬된 데이터를 상태로 업데이트
  };

  // API 호출 함수
  const fetchMemberList = async () => {
    try {
      const tabCondition = "관리자";

      // API 호출 전에 로그 찍기
      console.log("로그 Fetching member list with tabCondition:", tabCondition);

      const response = await getMemberList(
        {
          ...searchParam,
          tabCondition,
          nameSearch: nameRef.current.getValue(),
          page: currentPage,
        },
        id
      );

      // API 응답 데이터 로그 찍기
      console.log("로그 Fetched member list response:", response.data);

      setCheckedRows([]);
      setRows(response.data.dtoList);
      setSearchedData(response.data);
      setTotalPages(response.data.totalPage);
      setTotalCount(response.data.totalCount);
    } catch (error) {
      console.error("데이터 검색 중 오류 발생:", error);
    }
  };

  // 각 버튼의 hover 상태관리
  const [isHovered, setIsHovered] = useState({
    add: false,
    excel: false,
    delete: false,
  });

  // 관리자 id 아니면 로그인 페이지로 이동
  useEffect(() => {
    if (!isLoggedIn || role !== "SUPER_ADMIN") {
      navigate("/", { replace: true });
    }
  }, [isLoggedIn, role, navigate]);

  // 탭이나 검색어가 변경될 때마다 데이터를 새로 가져옴
  useEffect(() => {
    console.log("------fetch by useEffect------");
    fetchMemberList();
  }, [searchParam]);

  useEffect(() => {
    console.log("--------------------", searchedData);
  }, [searchedData]);

  return (
    <SidebarLayout>
      <div className="min-h-screen bg-gray-100 py-8 px-28">
        <h1 className="text-xl font-bold mb-2 text-blue-700">회원 조회</h1>
        {/* 조회 전체 div */}
        <div className="bg-white rounded-lg shadow px-14 py-4 mb-8 h-24">
          <div className="flex items-center justify-between w-full">
            {/* 탭 버튼: 왼쪽 정렬 */}
            <ConditionTabs
              activeTab={condition}
              initSearchParam={setSearchParam}
              tabNames={["관리자"]}
              tabKeys={["adminTab"]}
              searchParams={searchParam}
            />

            {/* 검색어 입력창과 검색 버튼: 오른쪽 정렬 */}
            <div className="flex items-center space-x-4 rounded-full p-2 w-full justify-end h-12">
              <Searchbar
                placeholder="회원명을 입력하세요"
                onSearch={handleSearch} // 검색 버튼 클릭 시 호출
                ref={nameRef}
              />

              <SearchButton onSearch={handleSearch} />
            </div>
          </div>
        </div>

        {/* 등록 및 삭제 버튼 */}
        <div className="flex justify-end items-center mb-8">
          <Button
            onClick={openCreateAdminModalComponent} // 회원 등록 모달 열기
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
            onClick={openCreateAdminBulkModalComponent}
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
        </div>
        <ListCountAndSort
          totalCount={totalCount}
          onSortChange={handleSortChange}
          activeSort={sortOrder}
        />
        {rows && rows.length > 0 ? (
          <div className="">
            <TableComponent
              headers={adminHeaders}
              rows={rows}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              onRowClick={openAdminDetailModalComponent}
              checkedRows={checkedRows}
              setCheckedRows={setCheckedRows}
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
              {searchParam.nameSearch
                ? "검색 결과가 없습니다"
                : "해당 데이터가 없습니다"}
            </p>
          </div>
        )}
      </div>

      {/* 관리자 상세정보 모달 */}
      {isAdminDetailModalComponent && selectedMember && (
        <AdminDetailModalComponent
          isOpen={isAdminDetailModalComponent}
          onClose={closeAdminDetailModalComponent}
          selectedMember={selectedMember} // 선택된 회원 정보 전달
        />
      )}

      {/* 관리자 개별 등록 모달 */}
      {isCreateAdminModalComponent && (
        <CreateAdminModalComponent
          isOpen={isCreateAdminModalComponent}
          onClose={closeCreateAdminModalComponent}
        />
      )}

      {/* 관리자 일괄 등록 모달 */}
      {isCreateAdminBulkModalComponent && (
        <CreateBulkModalComponent
          onConfirm={handleCreateAdminBulk}
          onCancel={closeCreateAdminBulkModalComponent}
          isOpen={isCreateAdminBulkModalComponent}
          target="admin"
        />
      )}
    </SidebarLayout>
  );
};

export default MemberManagementPage;
