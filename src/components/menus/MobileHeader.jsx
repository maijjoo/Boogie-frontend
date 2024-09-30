import React from "react";
import back from "../../assets/icons/nav/Back.svg";
import { useNavigate } from "react-router-dom";

const MobileHeader = ({ children }) => {
  const navigate = useNavigate();
  return (
    <div className="w-full border-b-2 border-b-slate-200 flex">
      <button onClick={() => navigate(-1)} className="p-3">
        <img src={back} alt="back" />
      </button>
      <p className="py-3">{children}</p>
    </div>
  );
};

export default MobileHeader;
