import React, { useState, useEffect } from "react";
import MobileHeader from "../../components/menus/MobileHeader";
import MobileFooter from "../../components/menus/MobileFooter";
import Button from "../../components/commons/Button.jsx";
import MyPageInput from "../../components/commons/MyPageInput"; // InputField 컴포넌트 임포트
import { useAuth } from "../../hooks/useAuth.js";

const MyPageWorker = () => {
  const { memberInfo, isLoggedIn, logout } = useAuth();

  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    workPlace: "",
    isDriver: "",
  });

  const [editMode, setEditMode] = useState(false); // 수정 가능 여부 상태 관리
  const [buttonText, setButtonText] = useState("내 정보 수정"); // 버튼 텍스트 상태 관리
  const [pbuttonText, setPButtonText] = useState("비밀번호 변경"); // 버튼 텍스트 상태 관리
  const [passwordChange, setPasswordChange] = useState(false);

  // useEffect를 사용하여 memberInfo가 업데이트될 때 userInfo 상태 업데이트
  useEffect(() => {
    if (isLoggedIn) {
      setUserInfo({
        name: memberInfo.name || "",
        email: memberInfo.email || "",
        workPlace: memberInfo.workPlace || "",
        isDriver: memberInfo.vehicleCapacity || "",
      });
    }
  }, [memberInfo, isLoggedIn]);

  // 입력 필드 변경 핸들러
  const handleInputChange = (e) => {
    if (!editMode) return;
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  // 정보 수정 모드 토글
  const toggleEditMode = () => {
    setEditMode(!editMode); // editMode 상태를 반전시켜 수정 가능 여부를 토글
    setButtonText(editMode ? "내 정보 수정" : "저장하기"); // 버튼 텍스트 변경
  };

  const passwordToggleEditMode = () => {
    setPasswordChange(!passwordChange); // passwordChange 상태를 반전시켜 수정 가능 여부를 토글
    setPButtonText(passwordChange ? "비밀번호 변경" : "저장하기"); // 버튼 텍스트 변경
  };

  // 폼 제출 핸들러
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated User Info: ", userInfo);
    // 여기서 업데이트 API 호출 등의 작업을 수행 가능
  };

  return (
    <div className="w-full flex flex-col items-center bg-gray-50">
      <MobileHeader className="fixed top-0 z-50">마이페이지</MobileHeader>
      <div className="w-full px-5 p-3 mt-12 mb-24 bg-gray-50">
        <form onSubmit={handleSubmit}>
          {/* 사용자 이름 필드 */}
          {!passwordChange && (
            <div>
              <MyPageInput
                label="이름"
                name="name"
                value={userInfo.name}
                onChange={handleInputChange}
                readOnly={!editMode} // 수정 모드가 아닐 때는 readOnly 상태 유지
                editMode={editMode}
              />

              {/* 이메일 필드*/}
              <MyPageInput
                label="Email"
                name="email"
                type="email"
                value={userInfo.email}
                onChange={handleInputChange}
                readOnly={!editMode} // 수정 모드가 아닐 때는 readOnly 상태 유지
                editMode={editMode}
              />

              {/* 소속 필드 */}
              <MyPageInput
                label="소속"
                name="workPlace"
                value={userInfo.workPlace}
                onChange={handleInputChange}
                readOnly={!editMode} // 수정 모드가 아닐 때는 readOnly 상태 유지
                editMode={editMode}
              />

              {/* 수거차량 적재량 필드 */}
              <MyPageInput
                label="수거차량 적재량 (t)"
                name="isDriver"
                type="number"
                value={userInfo.isDriver}
                onChange={handleInputChange}
                readOnly={!editMode} // 수정 모드가 아닐 때는 readOnly 상태 유지
                editMode={editMode}
              />
            </div>
          )}

          <div className="w-full xl:w-1/3 mt-3 flex flex-col justify-center">
            <div className="border-t-2 fixed bottom-0 z-50 bg-white w-full flex flex-col justify-center gap-2">
              <div className="flex mt-2 px-2 gap-2">
                {!editMode && (
                  <div
                    className={
                      passwordChange
                        ? "inline-block w-full"
                        : "inline-block w-1/2"
                    }
                  >
                    {/* 비밀번호 변경 버튼 */}
                    <Button
                      className="w-full py-3 rounded-lg"
                      color="emptyBlue"
                      type={passwordChange ? "submit" : ""}
                      onClick={passwordToggleEditMode}
                    >
                      {pbuttonText} {/* 버튼 텍스트 변경 */}
                    </Button>
                  </div>
                )}

                <div
                  className={
                    editMode ? "inline-block w-full" : "inline-block w-1/2"
                  }
                >
                  {/* 내 정보 수정 버튼 */}
                  <Button
                    className="
                    w-full py-3 rounded-lg"
                    color="blue"
                    type={editMode ? "submit" : ""}
                    onClick={toggleEditMode} // 정보 수정 모드 토글
                  >
                    {buttonText} {/* 버튼 텍스트 변경 */}
                  </Button>
                </div>
              </div>
              <div className="flex justify-center">
                <span
                  className="cursor-pointer font-extrabold"
                  onClick={() => {
                    logout();
                  }}
                >
                  로그아웃
                </span>
              </div>
              <MobileFooter homeroot="/workerMain" />
            </div>
          </div>
        </form>
        {/* 비밀번호 변경 탭 */}
        {passwordChange && (
          <div>
            <form onSubmit={handleSubmit}>
              {/* 현재 비밀번호 */}
              <MyPageInput
                label="이름"
                name="name"
                value={userInfo.name}
                onChange={handleInputChange}
              />

              {/* 새로운 비밀번호*/}
              <MyPageInput
                label="Email"
                name="email"
                type="email"
                value={userInfo.email}
                onChange={handleInputChange}
              />

              {/* 비밀번호 확인*/}
              <MyPageInput
                label="Email"
                name="email"
                type="email"
                value={userInfo.email}
                onChange={handleInputChange}
              />
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPageWorker;
