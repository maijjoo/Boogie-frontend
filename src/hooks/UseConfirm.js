import React from "react";

// 새로고침 버튼 클릭 핸들러
const handleRefresh = () => {
  window.location.reload(); // 페이지 새로고침
};

const useConfirm = (message = "", onConfirm, onCancel) => {
  if (!onConfirm || typeof onConfirm !== "function") {
    return;
  }
  if (onCancel && typeof onCancel !== "function") {
    return;
  }
  const confirmAction = () => {
    if (window.confirm(message)) {
      onConfirm();
      handleRefresh(); // onConfirm 후 새로고침 실행
    } else {
      onCancel();
    }
  };
  return confirmAction;
};

export default useConfirm;
