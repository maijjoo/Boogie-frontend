import React from "react";

const AdminDetailModalComponent = ({ isOpen, onClose, selectedMember }) => {
  if (!isOpen) return null; // 모달이 열리지 않으면 렌더링하지 않음
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-white rounded-lg shadow p-10 w-[450px]">
        <div className="flex justify-between items-center mb-5">
          {/* 모달 제목 */}
          <h2 className="text-xl font-bold text-blue-700">회원 정보</h2>
        </div>

        <div className="space-y-4">
          {/* 이름 */}
          <div className="flex justify-between items-center mb-3">
            <label className="font-semibold">이름</label>
            <label className="w-56 text-right text-gray-800">
              {selectedMember.name}
            </label>
          </div>

          {/* 근무지 연락처 */}
          <div className="flex justify-between items-center mb-3">
            <label className="font-semibold">근무지 연락처</label>
            <label className="w-56 text-right text-gray-800">
              {selectedMember.contact}
            </label>
          </div>

          {/* 개인 연락처 */}
          <div className="flex justify-between items-center mb-3">
            <label className="font-semibold">개인 연락처</label>
            <label className="w-56 text-right text-gray-800">
              {selectedMember.phone}
            </label>
          </div>

          {/* 이메일 */}
          <div className="flex justify-between items-center mb-3">
            <label className="font-semibold">이메일</label>
            <label className="w-56 text-right text-gray-800">
              {selectedMember.email}
            </label>
          </div>

          {/* 근무처 */}
          <div className="flex justify-between items-center mb-3">
            <label className="font-semibold">근무처</label>
            <label className="w-56 text-right text-gray-800">
              {selectedMember.workCity}
              {/* 중간에 공백 추가 */}
            </label>
          </div>

          {/* 부서 및 직급 */}
          <div className="flex justify-between items-center mb-3">
            <label className="font-semibold">부서</label>
            <label className="w-56 text-right text-gray-800">
              {selectedMember.workGroup}
            </label>
          </div>
        </div>

        {/* 버튼 */}
        <div className="flex justify-between space-x-3 mt-10">
          <button
            onClick={onClose}
            className="w-full h-10 bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDetailModalComponent;
