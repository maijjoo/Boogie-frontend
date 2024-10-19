import React from "react";
import { AiOutlineClose } from "react-icons/ai";

const WebDetailModal = ({
  title, // 제목
  confirmText, // 확인 버튼 텍스트
  cancelText, // 취소 버튼 텍스트
  onConfirm, // 확인 버튼 클릭 시 동작
  onCancel, // 취소 버튼 클릭 시 동작
  children, // 제목과 버튼 사이에 넣을 콘텐츠
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-white rounded-lg shadow p-10 w-[450px]">
        <div className="flex justify-between items-center mb-5">
          {/* 모달 제목 */}
          <h2 className="text-xl font-bold text-blue-700">{title}</h2>
          <button onClick={onCancel}>
            {/* <AiOutlineClose style={{ color: "black", fontSize: "20px" }} /> */}
          </button>
        </div>

        {/* children prop을 통해 전달된 콘텐츠를 여기에 표시 */}
        <div>{children}</div>

        <div className="flex justify-between space-x-3 mt-10">
          <button
            onClick={onCancel}
            className="w-1/2 h-10 bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="w-1/2 h-10 bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WebDetailModal;
