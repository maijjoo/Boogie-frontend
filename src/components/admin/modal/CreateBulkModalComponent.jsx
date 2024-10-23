import { useState } from "react";
import ExcelDownloader from "../excelFunc/ExcelDownloader";
import ExcelUploader from "../excelFunc/ExcelUploader";

const CreateBulkModalComponent = ({
  onConfirm, // 확인 버튼 클릭 시 동작
  onCancel, // 취소 버튼 클릭 시 동작
  target, // 관리자인지 작업자인지 "worker", "admin" 으로 넘김
}) => {
  // 엑셀 파일 다운로드 URL
  //const excelTemplateUrl = "https://ggoreb.com/util/z.zip"; // 실제 엑셀 파일의 URL로 변경하세요.
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");

  const handleFileSelect = (file) => {
    console.log("modal got file: ", file);

    setSelectedFile(file);
  };

  const handleRegisterClick = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("exel", selectedFile);

      for (let [key, value] of formData.entries()) {
        console.log("key: ", key, ", value: ", value); // FormData에 파일이 제대로 들어갔는지 확인
      }
      // 부모 컴포넌트로 FormData 전달
      onConfirm(formData);
    } else {
      setError("파일을 업로드 해 주세요");
      return;
    }
  };

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
            <ExcelDownloader tab={target} />
            {/* <a
              href={excelTemplateUrl}
              download
              className="text-blue-700 underline hover:text-blue-900"
            >
              엑셀 양식 다운로드
            </a> */}
            <ExcelUploader onFileSelect={handleFileSelect} />
            {error && <p className="text-red-600">{error}</p>}
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
            onClick={handleRegisterClick}
            className="w-1/2 h-10 bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition"
          >
            등록하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateBulkModalComponent;
