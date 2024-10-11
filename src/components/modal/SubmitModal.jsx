import React from "react";

const SubmitModal = ({
  message,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-white rounded-lg shadow p-6 w-96">
        {" "}
        {/* 너비를 w-96으로 설정 */}
        <p className="text-center mb-4 font-bold whitespace-pre-line">
          {message}
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={onCancel}
            className="w-24 h-10 bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="w-24 h-10 bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubmitModal;
