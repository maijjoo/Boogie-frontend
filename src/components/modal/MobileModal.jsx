import React from "react";

const MobileModal = ({
  children,
  onClose,
  onConfirm,
  closeText = "취소",
  confirmText = "확인",
}) => {
  const handleClose = () => {
    onClose();
  };

  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center px-4">
      <div className="w-full bg-white px-4 py-6 rounded-lg border border-blue-700 flex flex-col justify-center gap-5">
        <div>{children}</div>
        <div className="w-full flex justify-between gap-3">
          <button
            className="w-1/2 py-1.5 border border-blue-700 rounded-lg text-blue-700"
            onClick={handleClose}
          >
            {closeText}
          </button>
          <button
            className="w-1/2 py-1.5 bg-blue-700 rounded-lg text-white"
            onClick={handleConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileModal;
