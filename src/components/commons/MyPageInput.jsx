import React from "react";

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
    <div className={`form-group ${className}`}>
      <label className="font-bold" htmlFor={id}>
        {label}
      </label>
      <input
        className={`block p-1 border-solid border border-gray-400 rounded-md w-full ${
          editMode
            ? "bg-white text-black"
            : " text-black focus:outline-none caret-transparent focus:border-solid border border-gray-400"
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
