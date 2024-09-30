import React from "react";
import write from "../../assets/icons/nav/Hand With Pen.svg";
import myPage from "../../assets/icons/nav/User.svg";
import home from "../../assets/icons/nav/Home.svg";
import { useNavigate } from "react-router-dom";

const MobileFooter = ({ homeroot, writeroot }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full flex border-t-2 border-t-slate-200 justify-center">
      <div className="w-1/3 flex justify-center p-3">
        <img src={myPage} alt="my Page" onClick={() => {}} />
      </div>
      <div
        className="w-1/3 flex justify-center p-3 cursor-pointer"
        onClick={() => navigate(homeroot)}
      >
        <img src={home} alt="go home" />
      </div>
      <div className="w-1/3 flex justify-center p-3">
        <img src={write} alt="write" onClick={() => {}} />
      </div>
    </div>
  );
};

export default MobileFooter;
