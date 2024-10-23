import React, { useRef, useState } from "react";
import XLSX from "xlsx-js-style";

const ExcelUploader = ({ onFileSelect }) => {
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setError("");

    if (!file) {
      setFileName("");
      return;
    }

    const fileExtension = file.name.split(".").pop().toLowerCase();
    const validExtensions = ["xlsx", "xls"];

    if (!validExtensions.includes(fileExtension)) {
      setError("엑셀 파일(.xlsx, .xls) 파일만 업로드 가능합니다.");
      setFileName("");
      event.target.value = null;
      return;
    }

    setFileName(file.name);

    onFileSelect(file);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const file = event.dataTransfer.files[0];
    if (file) {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      fileInputRef.current.files = dataTransfer.files;

      handleFileUpload({ target: { files: [file] } });
    }
  };

  return (
    <div className="w-full max-w-md">
      <div
        className="mt-6 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 transition-colors"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".xlsx,.xls,.csv"
          onChange={handleFileUpload}
          className="hidden"
        />

        {fileName ? (
          <div className="space-y-2">
            <p className="text-sm text-gray-600">선택된 파일:</p>
            <p className="font-medium text-blue-600">{fileName}</p>
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-gray-600">
              클릭하여 파일을 선택하거나
              <br />
              파일을 이곳에 드래그하세요
            </p>
            <p className="text-sm text-gray-500">(.xlsx, .xls 파일 지원)</p>
          </div>
        )}
      </div>

      {/* 에러 메시지 */}
      {error && (
        <p className="mt-2 text-sm text-red-600 font-semibold">{error}</p>
      )}
    </div>
  );
};

export default ExcelUploader;
