import React, { useEffect } from "react";

const Toast = ({ setToast, text }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setToast(false);
    }, 1500);
    return () => {
      clearTimeout(timer);
    };
  }, [setToast]);

  return (
    <div className="border border-gray-700 rounded-lg px-4 py-2 bg-white text-sm">
      <p>{text}</p>
    </div>
  );
};

export default Toast;
