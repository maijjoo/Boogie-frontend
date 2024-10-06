import React from "react";
import back from "../../assets/icons/nav/Back.svg";
import { useNavigate } from "react-router-dom";

const MobileHeader = ({ children }) => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-12 xl:h-14 z-10 border-b-2 bg-white border-b-slate-200 flex items-center">
      <button onClick={() => navigate(-1)} className="p-3">
        <img src={back} alt="back" />
      </button>
      <p className="py-3">{children}</p>
    </div>
  );
};

export default MobileHeader;
