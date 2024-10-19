import React from "react";
import { AiOutlineClose } from "react-icons/ai";

const WebDetailModal = ({
  title, // 제목
  fields, // 각 입력 필드
  confirmText, // 확인 버튼 텍스트
  cancelText, // 취소 버튼 텍스트
  onConfirm, // 확인 버튼 클릭 시 동작
  onCancel, // 취소 버튼 클릭 시 동작
  onFieldChange, // 필드 값이 변경될 때 호출할 핸들러
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-white rounded-lg shadow p-10 w-[400px]">
        <div className="flex justify-between items-center mb-5">
          {/* 모달 제목 */}
          <h2 className="text-xl font-bold text-blue-700">{title}</h2>
          <button onClick={onCancel}>
            <AiOutlineClose style={{ color: "black", fontSize: "20px" }} />
          </button>
        </div>
        <div className="space-y-2">
          {fields.map((field, index) => (
            <div key={index}>
              {field.layout === "horizontal" ? (
                // 가로로 나란히 배치하는 경우
                <div className="flex justify-between items-center mb-3 ">
                  <label className="font-semibold ">{field.label}</label>
                  <input
                    type="text"
                    className={`w-2/3 border-none focus:outline-none focus:ring-0 text-gray-600 ${
                      field.textAlign === "right" ? "text-right" : "text-left"
                    }`} // textAlign 속성에 따라 정렬
                    value={field.value}
                    readOnly={field.readOnly}
                  />
                </div>
              ) : (
                // 기존 세로 레이아웃 (줄바꿈)
                <div className="mb-3">
                  <label className="font-semibold">{field.label}</label>
                  <div
                    className={`w-full border-none focus:outline-none focus:ring-0 text-gray-600 ${
                      field.textAlign === "right" ? "text-right" : "text-left"
                    }`}
                    readOnly={field.readOnly}
                  >
                    {field.value.split("\n").map((line, index) => (
                      <span key={index}>
                        {line}
                        <br />
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

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
