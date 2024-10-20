import React from "react";

// 파일 위치 component/worker/modal/ConfirmModalComponent

// //가져다 쓸 페이지에 추가---------------------------------------------------------------------------------------
//   const [isConfirmModalComponent, setIsConfirmModalComponent] = useState(false); // 모달 상태
//   const openConfirmModalComponent = () => {
//     setIsConfirmModalComponent(true); // 모달 열기 상태로 변경
//   };
//   const closeConfirmModalComponent = () => {
//     setIsConfirmModalComponent(false); // 모달 닫기 상태로 변경
//   };
//   const handleModal = async () => {
//     setIsConfirmModalComponent(false);
//     fetch 필요한 내용(); //
//   };

//   //모달 작동하는 곳에(클릭)-------------------------------------------
// onClick={openConfirmModalComponent}

//   //return문 안에 추가(message, confirmText, cancelText는 예시로 작성해 둠)-------------------------------------------
//   {/* 모달 message가 너무 길면 줄바꿈, 안 길면 한줄로 부탁*/}
//   {isConfirmModalComponent && (
//     <ConfirmModalComponent
//       message={`'${
//         beachName
//       }'을\n 삭제하시겠습니까?`}
//       confirmText="삭제"
//       cancelText="취소"
//       onCancel={closeConfirmModalComponent}
//       onConfirm={handleModal}
//     />
//   )}
const ConfirmModalComponent = ({
  message,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-white rounded-lg shadow p-6 w-5/6 max-w-sm">
        <p className="text-center mb-4 font-bold whitespace-pre-line">
          {message}
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={onCancel}
            className="w-6/12 h-10 bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="w-6/12 h-10 bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModalComponent;
