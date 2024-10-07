import React from "react";
import checked from "../../assets/icons/login/CheckedBox.svg";
import unchecked from "../../assets/icons/login/UncheckedBox.svg";

const CheckBoxWithLabel = ({ children, ...props }) => {
  return (
    <div className="flex items-center mt-1">
      <input type="checkbox" className="me-1" {...props} />
      <label className="">{children}</label>
    </div>
  );
};

export default CheckBoxWithLabel;
