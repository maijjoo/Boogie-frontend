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
  imgClassName,
  disabled,
}) => {
  return (
    <div
      className={`form-group ${className} ${
        editMode ? "" : "caret-transparent"
      }`}
    >
      <label className={`font-bold mb-2`} htmlFor={id}>
        <img
          src={circle}
          alt="dot"
          className={`w-1 me-2 inline ${imgClassName} `}
        />
        {label}
      </label>
      <input
        className={`block p-2 border-solid border border-gray-400 rounded-md ${className} w-full  ${
          editMode
            ? "bg-white text-black"
            : " text-black focus:outline-none focus:border-solid border border-gray-400"
        }`}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        readOnly={!editMode}
        disabled={disabled}
      />
    </div>
  );
};

export default MyPageInput;
