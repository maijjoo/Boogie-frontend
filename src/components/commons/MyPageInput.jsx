import React from "react";
import circle from "../../assets/icons/write/Circle.svg";

// 공통 입력 필드 컴포넌트
const MyPageInput = ({
  label,
  id,
  name,
  value,
  onChange,
  type,
  placeholder,
  editMode,
  className,
}) => {
  return (
    <div
      className={`form-group ${className} ${
        editMode ? "" : "caret-transparent"
      }`}
    >
      <label className="font-bold" htmlFor={id}>
        <img src={circle} alt="dot" className="w-1 me-2 inline" />
        {label}
      </label>
      <input
        className={`block p-1 border-solid border border-gray-400 rounded-md w-full ${
          editMode
            ? "bg-white text-black"
            : " text-black focus:outline-none focus:border-solid border border-gray-400"
        }`}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

export default MyPageInput;
