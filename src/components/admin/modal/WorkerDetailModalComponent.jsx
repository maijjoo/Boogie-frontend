import React, { useRef, useEffect, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import WorkerDetailModal from "../../modal/WebDetailModal";
import DateRangePicker from "../../commons/DateRangePicker";
import updateWorkPeriodApi from "../../../api/updateWorkPeriodApi";

const WorkerDetailModalComponent = ({ isOpen, onClose, selectedMember }) => {
  const { workPlace, department } = useAuth(); // 로그인한 관리자의 부서 정보
  const [startDate, setStartDate] = useState(
    new Date(selectedMember.startDate)
  ); // 업무 시작일
  const [endDate, setEndDate] = useState(new Date(selectedMember.endDate)); // 업무 종료일
  const [isEditable, setIsEditable] = useState(false); // 수정 가능 상태 관리
  const dateRangePickerRef = useRef(null); // DateRangePicker에 포커스를 주기 위한 ref

  const handleEditClick = () => {
    setIsEditable(true); // 수정 가능 상태로 변경
    if (dateRangePickerRef.current) {
      // 수정 가능 상태로 변경되면 DateRangePicker에 포커스
      dateRangePickerRef.current.focus();
    }
  };
  const handleConfirm = async () => {
    try {
      // updateWorkPeriodApi 함수 호출 시 startDate와 endDate를 그대로 전달
      await updateWorkPeriodApi(selectedMember.id, startDate, endDate);

      // 수정 완료 후 상태를 다시 읽기 전용으로 변경
      setIsEditable(false);
    } catch (error) {
      console.error("업무기간 수정 중 오류 발생:", error);
      alert("업무기간 수정 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  if (!isOpen) return null; // 모달이 열리지 않으면 렌더링하지 않음

  return (
    <WorkerDetailModal
      title="회원 정보"
      confirmText={isEditable ? "수정완료" : "수정하기"}
      cancelText={isEditable ? "취소" : "닫기"}
      onConfirm={isEditable ? handleConfirm : handleEditClick}
      onCancel={onClose}
    >
      <div className="space-y-2">
        <div className="flex justify-between items-center mb-3 ">
          <label className="font-semibold">이름</label>
          <input
            type="text"
            className={`w-56 text-right focus:outline-none focus:ring-0 ${
              isEditable ? "text-gray-500" : "text-gray-800"
            }`}
            value={selectedMember.name}
            readOnly
          />
        </div>
        <div className="flex justify-between items-center mb-3 ">
          <label className="font-semibold">아이디</label>
          <input
            type="text"
            className={`w-56 text-right focus:outline-none focus:ring-0 ${
              isEditable ? "text-gray-500" : "text-gray-800"
            }`}
            value={selectedMember.username}
            readOnly
          />
        </div>
        <div className="flex justify-between items-center mb-3 ">
          <label className="font-semibold">연락처</label>
          <input
            type="text"
            className={`w-56 text-right focus:outline-none focus:ring-0 ${
              isEditable ? "text-gray-500" : "text-gray-800"
            }`}
            value={selectedMember.phone}
            readOnly
          />
        </div>
        <div className="flex justify-between items-center mb-3 ">
          <label className="font-semibold">생년월일</label>
          <input
            type="text"
            className={`w-56 text-right focus:outline-none focus:ring-0 ${
              isEditable ? "text-gray-500" : "text-gray-800"
            }`}
            value={selectedMember.birth}
            readOnly
          />
        </div>
        <div className="flex justify-between items-center mb-3 focus:outline-none focus:ring-0">
          <label className="font-semibold">이메일</label>
          <input
            type="email"
            className={`w-56 text-right focus:outline-none focus:ring-0 ${
              isEditable ? "text-gray-500" : "text-gray-800"
            }`}
            value={selectedMember.email}
            readOnly
          />
        </div>
        <div className="flex justify-between items-center mb-3 ">
          <label className="font-semibold">차량 적재량(t)</label>
          <input
            type="text"
            className={`w-56 text-right focus:outline-none focus:ring-0 ${
              isEditable ? "text-gray-500" : "text-gray-800"
            }`}
            value={selectedMember.vehicleCapacity}
            readOnly
          />
        </div>
        <div className="flex flex-col mb-3">
          <label className="font-semibold mb-2">주소</label>
          <div className="flex justify-between ">
            <input
              type="text"
              className={`w-full text-left focus:outline-none focus:ring-0 ${
                isEditable ? "text-gray-500" : "text-gray-800"
              }`}
              value={selectedMember.address}
              readOnly
            />
          </div>
          <input
            type="text"
            className={`w-full text-left focus:outline-none focus:ring-0 ${
              isEditable ? "text-gray-500" : "text-gray-800"
            }`}
            value={selectedMember.addressDetail}
            readOnly
          />
        </div>
        <div className="flex justify-between items-center mb-3 ">
          <label className="font-semibold">소속</label>
          <input
            type="text"
            className={`w-56 text-right focus:outline-none focus:ring-0 ${
              isEditable ? "text-gray-500" : "text-gray-800"
            }`}
            value={`${workPlace} ${department}과`}
            readOnly
          />
        </div>
        <div className="flex justify-between items-center">
          <label className="font-semibold">업무기간</label>
          {/* DateRangePicker에서 선택한 값을 상태로 업데이트 */}
          <DateRangePicker
            startDate={startDate} // 부모 컴포넌트의 상태를 전달
            endDate={endDate}
            onChange={({ startDate, endDate }) => {
              setStartDate(startDate);
              setEndDate(endDate);
            }}
            isEditable={isEditable} // 수정 가능 여부 전달
            className={`${
              isEditable
                ? "border-b border-b-gray-300 text-black"
                : "border-none text-gray-800"
            }`}
            ref={dateRangePickerRef}
          />
        </div>
      </div>
    </WorkerDetailModal>
  );
};

export default WorkerDetailModalComponent;
