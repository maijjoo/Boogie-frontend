import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import logo from "../../assets/images/logoOnly.png";
import dataMenu from "../../assets/icons/sidebar/Combo Chart.svg";
import onDataMenu from "../../assets/icons/sidebar/Combo Chart-1.svg";
import workMenu from "../../assets/icons/sidebar/Todo List.svg";
import onWorkMenu from "../../assets/icons/sidebar/Todo List-1.svg";
import memberMenu from "../../assets/icons/sidebar/User Settings.svg";
import onMemberMenu from "../../assets/icons/sidebar/User Settings-1.svg";
import { useAuth } from "../../hooks/useAuth";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // 현재 경로 가져오기
  const { logout, department, workPlace, name, username } = useAuth(); // username 추가

  const [activeMenu, setActiveMenu] = useState(""); // 클릭된 메뉴 상태 관리
  const [hoverMenu, setHoverMenu] = useState(""); // hover 상태 관리
  const [activeSubMenu, setActiveSubMenu] = useState(""); // 하위 메뉴 클릭 상태 관리

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  const handleNavigation = (path) => {
    if (location.pathname === path) {
      window.location.reload(); // 같은 페이지 클릭 시 새로고침
    } else {
      navigate(path);
    }
  };

  const getMemberManagementPath = () => {
    const usernameString = String(username); // username을 문자열로 변환
    if (usernameString.startsWith("S")) {
      return "/MemberManagement";
    } else if (usernameString.startsWith("A")) {
      return "/WorkerManagement";
    }
    return "#"; // 기본값
  };

  return (
    <div
      className="w-64 bg-[#014EB6] text-white h-screen flex flex-col justify-between p-4 
    shadow-[0_5px_20px_5px_rgba(0,0,0,0.5)] rounded-r-2xl"
    >
      {/* 상단 로고 및 사용자 정보 */}
      <div className="text-center border-b border-b-white px-1 py-5 mb-5">
        <div className="flex items-start mb-4">
          <Link to={"/adminMain"}>
            <img src={logo} className="w-12 h-12" alt="Logo" />
          </Link>
          <div className="ml-4 text-left justify-between">
            <span className="text-[12pt] font-semibold">{name}</span>
            <span className="text-[10pt] ">님</span>
            <div className="text-[10pt]">
              {workPlace.replace(" ", "").trim() +
                " " +
                department.replace(" ", "").trim() +
                "과"}
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center mb-4">
          <div
            className="text-white mr-4 text-[10pt] cursor-pointer"
            onClick={() => handleNavigation("/myPageAdmin")}
          >
            마이페이지
          </div>
          <div className="text-sm mr-4 text-[10pt]">|</div>
          <div
            onClick={handleLogout}
            className="text-white text-[10pt] cursor-pointer"
          >
            로그아웃
          </div>
        </div>
      </div>

      {/* 메뉴 섹션 */}
      <div className="flex-grow flex flex-col items-center">
        {/* 데이터 분석 메뉴 */}
        <div
          className={`flex flex-col items-start w-52 mb-4 p-5 cursor-pointer ${
            activeMenu === "data" || hoverMenu === "data"
              ? "bg-white rounded-md text-[#014EB6]"
              : "text-[#C5CCD2]"
          } hover:bg-white hover:rounded-md hover:text-[#014EB6]`}
          onClick={() => setActiveMenu("data")}
          onMouseEnter={() => setHoverMenu("data")}
          onMouseLeave={() => setHoverMenu("")}
        >
          <Link to={"/mainTrashDistribution"} className="flex items-center">
            <img
              src={
                activeMenu === "data" || hoverMenu === "data"
                  ? onDataMenu
                  : dataMenu
              }
              className="w-8 h-9 mr-2"
              alt="data menu"
            />
            <h3 className="text-[14pt] mb-0 font-semibold">데이터 분석</h3>
          </Link>
        </div>

        {/* 작업 관리 메뉴 */}
        <div
          className={`flex flex-col items-start w-52 mb-4 p-5 cursor-pointer ${
            activeMenu === "work" || hoverMenu === "work"
              ? "bg-white rounded-md text-[#014EB6]"
              : "text-[#C5CCD2]"
          } hover:bg-white hover:rounded-md hover:text-[#014EB6]`}
          onClick={() => setActiveMenu("work")}
          onMouseEnter={() => setHoverMenu("work")}
          onMouseLeave={() => setHoverMenu("")}
        >
          <Link to={"/newWorks"} className="flex items-center">
            <img
              src={
                activeMenu === "work" || hoverMenu === "work"
                  ? onWorkMenu
                  : workMenu
              }
              className="w-8 h-9 mr-2"
              alt="work menu"
            />
            <div className="text-[14pt] mb-0 font-semibold">작업 관리</div>
          </Link>
        </div>

        {/* 회원 관리 메뉴 */}
        <Link
          to={getMemberManagementPath()}
          className={`flex items-center w-52 mb-4 p-5 cursor-pointer ${
            activeMenu === "member" || hoverMenu === "member"
              ? "bg-white rounded-md text-[#014EB6]"
              : "text-[#C5CCD2]"
          } hover:bg-white hover:rounded-md hover:text-[#014EB6]`}
          onClick={() => setActiveMenu("member")}
          onMouseEnter={() => setHoverMenu("member")}
          onMouseLeave={() => setHoverMenu("")}
        >
          <img
            src={
              activeMenu === "member" || hoverMenu === "member"
                ? onMemberMenu
                : memberMenu
            }
            className="w-8 h-8 mr-2"
            alt="member menu"
          />
          <h3 className="text-[14pt] mb-0 font-semibold">회원 관리</h3>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
