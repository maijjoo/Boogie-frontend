import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import {
  getMemberList,
  deleteMembers,
  createBulkMember,
} from "../../api/memberListApi";
import { deleteMemberApi } from "../../api/deleteMemberApi";
import { getWorkerDetail, getAdminDetail } from "../../api/memberDetailApi";
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
import deleteHoverIcon from "../../assets/icons/adminMode/delete.png";
import deleteIcon from "../../assets/icons/adminMode/deleteBlue.png";
import ListCountAndSort from "../../components/commons/ListCountAndSort";
import TableComponent from "../../components/table/TableComponent";
import Pagination from "../../components/commons/Pagination";
import WebModal from "../../components/modal/WebModal";
import WorkerDetailModalComponent from "../../components/admin/modal/WorkerDetailModalComponent";
import CreateWorkerModalComponent from "../../components/admin/modal/CreateWorkerModalComponent";
import CreateBulkModalComponent from "../../components/admin/modal/CreateBulkModalComponent";

const WorkerManagementPage = () => {
  const { isLoggedIn, role, id, departmentInfo } = useAuth(); // 로그인 유저 정보 확인
  const navigate = useNavigate();
  const [condition, setCondition] = useState("allWorkersTab"); // 검색 조건 탭 [전체], [조사/청소자], [수거자]
  const [rows, setRows] = useState([]); // 회원 목록
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 1 지정
  const [totalPages, setTotalPages] = useState(0); // 총 페이지 수
  const [totalCount, setTotalCount] = useState(0); // 목록의 총 회원 수
  const itemsPerPage = 20; // 페이지 당 항목 수
  const nameRef = useRef();

  // 회원 개별 등록 =================================================================================
  const [isCreateWorkerModalComponent, setIsCreateWorkerModalComponent] =
    useState(false); // 회원 개별 등록 모달 상태
  const openCreateWorkerModalComponent = () => {
    setIsCreateWorkerModalComponent(true); // 모달 열기 상태로 변경
  };
  const closeCreateWorkerModalComponent = (message) => {
    setIsCreateWorkerModalComponent(false); // 모달 닫기 상태로 변경
    if (message === "success") {
      fetchMemberList();
    }
  };

  // 회원 일괄 등록 =================================================================================
  const [isCreateWokerBulkModalComponent, setIsCreateWokerBulkModalComponent] =
    useState(false); // 회원 일괄 등록 모달 상태

  const openCreateWokerBulkModalComponent = () => {
    setIsCreateWokerBulkModalComponent(true); // 모달 열기 상태로 변경
  };

  const closeCreateWokerBulkModalComponent = () => {
    setIsCreateWokerBulkModalComponent(false); // 모달 닫기 상태로 변경
  };

  const handleCreateWorkerBulk = (formData) => {
    console.log("mngmnt page got formData: ");

    for (let [key, value] of formData.entries()) {
      console.log("key: ", key, ", value: ", value); // FormData에 파일이 제대로 들어갔는지 확인
    }
    const res = createBulkMember(formData, id, "worker");
    console.log("create bulk user res: ", res);

    setIsCreateWokerBulkModalComponent(false);
  };
  // 회원 상세정보 =================================================================================
  const [isWorkerDetailModalComponent, setIsWorkerDetailModalComponent] =
    useState(false); // 회원 상세정보 모달 상태

  // 회원 상세 모달 열기 함수
  const openWorkerDetailModalComponent = async (member) => {
    try {
      // member에서 workerId를 가져와 API 호출
      const workerId = member.id; // 여기서 member의 id를 workerId로 사용
      const response = await getWorkerDetail(workerId);

      // API에서 가져온 회원 상세 정보를 selectedMember에 설정
      setSelectedMember(response); // response는 getWorkerDetail에서 받은 데이터

      setIsWorkerDetailModalComponent(true); // 상세 모달 열기
    } catch (error) {
      console.error("회원 상세 정보를 가져오는 중 오류 발생:", error);
    }
  };

  const closeWorkerDetailModalComponent = () => {
    setIsWorkerDetailModalComponent(false); // 모달 닫기 상태로 변경
    setSelectedMember(null); // 모달 닫을 때 선택된 회원 초기화
  };

  // const [workerUpdate, setworkerUpdate] = useState(false); // 회원 정보 수정

  const [checkedRows, setCheckedRows] = useState([]); // 체크된 row 상태 관리
  // 체크된 상태를 업데이트하는 핸들러
  // const handleCheckChange = (checkedRows) => {
  //   console.log("체크된 회원 ID 목록:", checkedRows); // 여기에 선택된 회원 ID를 출력
  //   setCheckedRows(checkedRows); // 체크된 상태를 업데이트
  // };
  const [selectedMember, setSelectedMember] = useState(null); // 선택된 회원 정보 상태 관리
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // 회원 삭제 모달 상태
  const openDeleteModal = () => setIsDeleteModalOpen(true); // 회원 삭제 모달 열기
  const closeDeleteModal = () => setIsDeleteModalOpen(false); // 회원 삭제 모달 닫기

  // 삭제 함수: 체크된 회원 ID를 삭제
  const handleDelete = async () => {
    // const idsToDelete = checkedRows
    //   .filter((row) => row.checked === true) // 체크된 행 필터링
    //   .map((row) => row.id); // 회원 ID 추출
    // 삭제할 ID 확인
    // console.log("삭제할 회원 ID 목록:", idsToDelete);

    try {
      await deleteMemberApi(checkedRows); // API 호출
      setIsDeleteModalOpen(false);
      fetchMemberList(); // 삭제 후 목록 새로고침
    } catch (error) {
      console.error("회원 삭제 중 오류 발생:", error);
    }
  };

  // 조회 파라미터
  const [searchParam, setSearchParam] = useState({
    tabCondition: "전체", // 기본 탭 지정 [전체]
    nameSearch: "", // 검색어 회원명 초기값은 빈 문자열
    page: currentPage,
  });
  const [searchedData, setSearchedData] = useState([]); // 조회 결과 데이터

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
      formatter: (row) => row.createdDate && row.createdDate.split("T")[0],
    },
  ];

  // 검색어 상태 및 핸들러
  const handlePageChange = (page) => {
    console.log("handlePageChange");
    setCurrentPage(page);
    setCheckedRows([]);
    setSearchParam((prev) => ({
      ...prev,
      page: page,
    }));
  };

  const handleSearch = () => {
    setCurrentPage(1);
    setCheckedRows([]);
    setSortOrder("desc");
    setSearchParam((prev) => ({
      ...prev,
      nameSearch: nameRef.current.getValue(), // 검색어를 name으로 설정
      page: 1,
    }));
    console.log("------fetch by handleSearch------");

    fetchMemberList();
  };

  const [sortOrder, setSortOrder] = useState("desc"); // 기본 정렬은 내림차순

  const handleSortChange = (sortOrders) => {
    setSortOrder(sortOrders);
    setCheckedRows([]);
    const sortedRows = [...rows].sort((a, b) => {
      const dateA = new Date(a.createdDate);
      const dateB = new Date(b.createdDate);
      return sortOrder === "asc" ? dateB - dateA : dateA - dateB;
    });

    setRows(sortedRows); // 정렬된 데이터를 상태로 업데이트
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
          nameSearch: nameRef.current.getValue(),
          page: currentPage,
        },
        id
      );
      setCheckedRows([]);
      setSortOrder("desc");
      setRows(response.data.dtoList);
      setSearchedData(response.data);
      setTotalPages(response.data.totalPage);
      setTotalCount(response.data.totalCount);
    } catch (error) {
      console.error("데이터 검색 중 오류 발생:", error);
    }
  };

  const handleTabChange = (tabCondition) => {
    nameRef.current.clear();
    setCurrentPage(1);
    setCondition(tabCondition);
    setSortOrder("desc");
    setCheckedRows([]);
    setSearchParam({
      nameSearch: "",
      tabCondition: condition,
      page: 1,
    });
  };

  // 각 버튼의 hover 상태관리
  const [isHovered, setIsHovered] = useState({
    add: false,
    excel: false,
    delete: false,
  });

  useEffect(() => {
    console.log("===========checkedRows : ", checkedRows);
  }, [checkedRows]);

  // 관리자 id 아니면 로그인 페이지로 이동
  useEffect(() => {
    if (!isLoggedIn || role !== "ADMIN") {
      if (role === "SUPER_ADMIN")
        navigate("/memberManagement", { replace: true });
      else navigate("/", { replace: true });
    }
  }, [isLoggedIn, role, navigate]);

  // 탭이나 검색어가 변경될 때마다 데이터를 새로 가져옴
  useEffect(() => {
    console.log("------fetch by useEffect------");
    fetchMemberList();
  }, [condition, currentPage]);

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
              setActiveTab={handleTabChange}
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
            onClick={openCreateWorkerModalComponent} // 회원 개별 등록 모달 열기
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
            onClick={openCreateWokerBulkModalComponent} // 회원 일괄 등록 모달 열기
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
            onClick={checkedRows.length === 0 ? null : openDeleteModal} // 0개일 때 클릭 이벤트 없음
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
          activeSort={sortOrder}
        />
        {rows && rows.length > 0 ? (
          <div className="">
            <TableComponent
              headers={headers}
              rows={rows}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              //onCheckChange={handleCheckChange} // checked개수
              onRowClick={openWorkerDetailModalComponent} // row 클릭 시 상세 모달 열기
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

      {/* 회원 상세 모달 */}
      {isWorkerDetailModalComponent && selectedMember && (
        <WorkerDetailModalComponent
          isOpen={isWorkerDetailModalComponent}
          onClose={closeWorkerDetailModalComponent}
          selectedMember={selectedMember} // 선택된 회원 정보 전달
        />
      )}

      {/* 회원 개별 등록 모달 */}
      {isCreateWorkerModalComponent && (
        <CreateWorkerModalComponent
          isOpen={isCreateWorkerModalComponent}
          onClose={closeCreateWorkerModalComponent}
          adminDpt={departmentInfo}
        />
      )}
      {/* 회원 일괄 등록 모달 */}
      {isCreateWokerBulkModalComponent && (
        <CreateBulkModalComponent
          onConfirm={handleCreateWorkerBulk}
          onCancel={closeCreateWokerBulkModalComponent}
          isOpen={isCreateWokerBulkModalComponent}
          target="worker"
        />
      )}
      {/* 회원삭제 모달 */}
      {isDeleteModalOpen && (
        <WebModal
          message={`선택하신 회원 ${
            checkedRows.length // 배열의 true 값 개수 세기
          }건을 삭제하시겠습니까?`}
          confirmText="삭제"
          cancelText="취소"
          onCancel={closeDeleteModal}
          onConfirm={handleDelete}
        />
      )}
    </SidebarLayout>
  );
};

export default WorkerManagementPage;
