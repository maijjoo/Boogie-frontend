import React from "react";
import checked from "../../assets/icons/login/CheckedBox.svg";
import unchecked from "../../assets/icons/login/UncheckedBox.svg";

const CheckBox = ({ children }) => {
  return (
    <div className="flex items-center px-10 xl:px-0 mt-3">
      <input type="checkbox" className="me-1" />
      <label className="">{children}</label>
    </div>
  );
};

export default CheckBox;
