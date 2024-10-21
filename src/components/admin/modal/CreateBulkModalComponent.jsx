import React from "react";

export const CreateWokerBulkModalComponent = ({
  onConfirm, // 확인 버튼 클릭 시 동작
  onCancel, // 취소 버튼 클릭 시 동작
}) => {
  // 엑셀 파일 다운로드 URL
  const excelTemplateUrl = "http://ggoreb.com/util/z.zip"; // 실제 엑셀 파일의 URL로 변경하세요.

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-white rounded-lg shadow p-10 w-[450px]">
        <div className="flex justify-between items-center mb-5">
          {/* 모달 제목 */}
          <h2 className="text-xl font-bold text-blue-700">회원 일괄 등록</h2>
          <button onClick={onCancel}>
            {/* <AiOutlineClose style={{ color: "black", fontSize: "20px" }} /> */}
          </button>
        </div>
        <div>
          <div>Excel 파일로 등록 시 양식을 지켜주세요</div>
          {/* 엑셀 파일 다운로드 버튼 추가 */}
          <div className="mt-4">
            <a
              href={excelTemplateUrl}
              download
              className="text-blue-700 underline hover:text-blue-900"
            >
              엑셀 양식 다운로드
            </a>
          </div>
        </div>

        <div className="flex justify-between space-x-3 mt-10">
          <button
            onClick={onCancel}
            className="w-1/2 h-10 bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition"
          >
            취소
          </button>
          <button
            onClick={onConfirm}
            className="w-1/2 h-10 bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition"
          >
            등록하기
          </button>
        </div>
      </div>
    </div>
  );
};
