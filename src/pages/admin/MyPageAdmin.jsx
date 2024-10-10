import React, { useState, useEffect } from "react";
import Button from "../../components/commons/Button.jsx";
import MyPageInput from "../../components/commons/MyPageInput"; // InputField 컴포넌트 임포트
import { useAuth } from "../../hooks/useAuth.js";
import classNames from "classnames";
import { getAdminInfo } from "../../api/adminInfoApi.js";
import circle from "../../assets/icons/write/Circle.svg";
import SidebarLayout from "../../layouts/SidebarLayout";

const MyPageAdmin = () => {
  const { memberInfo, isLoggedIn, id } = useAuth();

  const [adminInfo, setAdminInfo] = useState({
    name: "",
    contact: "",
    email: "",
    workPlace: "",
    department: "",
  });

  const [editMode, setEditMode] = useState(false); // 수정 가능 여부 상태 관리
  const [buttonText, setButtonText] = useState("내 정보 수정"); // 버튼 텍스트 상태 관리
  const [pbuttonText, setPButtonText] = useState("비밀번호 변경"); // 버튼 텍스트 상태 관리
  const [passwordChange, setPasswordChange] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPasswordError, setNewPasswordError] = useState(""); // 새로운 비밀번호 에러 메시지 상태
  const [confirmPasswordError, setConfirmPasswordError] = useState(""); // 비밀번호 확인 에러 메시지 상태
  const [successMessage, setSuccessMessage] = useState("");

  // useEffect를 사용하여 memberInfo가 업데이트될 때 userInfo 상태 업데이트
  useEffect(() => {
    if (isLoggedIn) {
      console.log(id);
      const userInfo = getAdminInfo(id);
      console.log("userInfo.data : ", userInfo);

      getAdminInfo(id).then((data) => {
        console.log("---------result----------: ", data);

        setAdminInfo({
          name: data.name || "",
          contact: data.phone || "",
          email: data.email || "",
          workPlace: data.workPlace || "",
          department: data.department || "",
        });
      });
    }
  }, [memberInfo, isLoggedIn]);

  console.log(memberInfo);

  // 입력 필드 변경 핸들러
  const handleInputChange = (e) => {
    if (!editMode) return;
    const { name, value } = e.target;
    setAdminInfo({ ...adminInfo, [name]: value });
  };

  // 새로고침 버튼 클릭 핸들러
  const handleRefresh = () => {
    window.location.reload(); // 페이지 새로고침
  };

  // 정보 수정 모드 토글
  const toggleEditMode = () => {
    setEditMode(!editMode); // editMode 상태를 반전시켜 수정 가능 여부를 토글
    setButtonText(editMode ? "내 정보 수정" : "저장하기"); // 버튼 텍스트 변경
  };

  const passwordToggleEditMode = () => {
    setPasswordChange(!passwordChange); // passwordChange 상태를 반전시켜 비밀번호 변경 렌더링 토글
    setPButtonText(passwordChange ? "비밀번호 변경" : "저장하기"); // 버튼 텍스트 변경
  };

  // 폼 제출 핸들러
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated User Info: ", adminInfo);
    // 여기서 업데이트 API 호출 등의 작업을 수행 가능
  };

  // 비밀번호 유효성 검사 함수
  const validatePassword = (password) => {
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
    return passwordPattern.test(password);
  };

  // 새로운 비밀번호 입력 핸들러
  const handleNewPasswordChange = (e) => {
    const value = e.target.value;
    setNewPassword(value);

    if (!validatePassword(value)) {
      setNewPasswordError(
        "새 비밀번호는 8~16자의 영문 대/소문자, 숫자, 특수문자를 포함해야 합니다."
      );
    } else {
      setNewPasswordError(""); // 유효한 비밀번호일 때 에러 메시지 초기화
    }
  };

  // 비밀번호 확인 입력 핸들러
  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);

    if (newPassword !== value) {
      setConfirmPasswordError(
        "새 비밀번호와 비밀번호 확인이 일치하지 않습니다."
      );
    } else {
      setConfirmPasswordError("");
    }
  };

  // 비밀번호폼 제출 핸들러
  const handlePasswordSubmit = (e) => {
    e.preventDefault();

    if (!validatePassword(newPassword)) {
      setNewPasswordError(
        "새 비밀번호는 8~16자의 영문 대/소문자, 숫자, 특수문자를 포함해야 합니다."
      );
      setSuccessMessage("");
      return;
    }

    if (newPassword !== confirmPassword) {
      setConfirmPasswordError(
        "새 비밀번호와 비밀번호 확인이 일치하지 않습니다."
      );
      setSuccessMessage("");
      return;
    }

    // 모든 조건이 맞으면 성공 메시지 출력
    setNewPasswordError("");
    setConfirmPasswordError("");
    setSuccessMessage("비밀번호가 성공적으로 변경되었습니다.");
  };

  const buttonClass = classNames(
    "w-full py-3 rounded-lg", // 기본 클래스
    {
      "opacity-50 cursor-not-allowed":
        passwordChange &&
        (!currentPassword ||
          !newPassword ||
          !confirmPassword ||
          newPasswordError ||
          confirmPasswordError),
      "bg-blue-600":
        passwordChange &&
        currentPassword &&
        newPassword &&
        confirmPassword &&
        !newPasswordError &&
        !confirmPasswordError,
    }
  );

  return (
    <SidebarLayout>
      <div className="min-h-screen bg-white py-8 px-44 ">
        <h1 className="text-xl font-bold mb-2 text-blue-700">마이페이지</h1>
        <div className="w-full bg-white border border-gray-200 shadow-2xl">
          <form onSubmit={handleSubmit}>
            {/* 사용자 이름 필드 */}
            {!passwordChange && (
              <div className="px-44 pt-20 mb-[16px] gap-4 flex flex-col">
                <div>
                  <div className="font-bold">
                    <img src={circle} alt="dot" className="w-1 me-2 inline" />
                    이름
                  </div>
                  <div
                    className={`border border-gray-400 rounded-md p-1 ${
                      !editMode ? "bg-white" : "bg-gray-100"
                    }`}
                  >
                    {adminInfo.name}
                  </div>
                </div>

                {/* 이메일 필드*/}
                <MyPageInput
                  label="Email"
                  name="email"
                  type="email"
                  value={adminInfo.email}
                  onChange={handleInputChange}
                  readOnly={!editMode} // 수정 모드가 아닐 때는 readOnly 상태 유지
                  editMode={editMode}
                />

                {/* 연락처 필드*/}
                <MyPageInput
                  label="연락처"
                  name="tel"
                  type="tel"
                  value={adminInfo.contact}
                  onChange={handleInputChange}
                  readOnly={!editMode} // 수정 모드가 아닐 때는 readOnly 상태 유지
                  editMode={editMode}
                />

                {/* 근무처 필드*/}
                <MyPageInput
                  label="근무처"
                  name="workPlace"
                  type="text"
                  value={adminInfo.workPlace}
                  onChange={handleInputChange}
                  readOnly={!editMode} // 수정 모드가 아닐 때는 readOnly 상태 유지
                  editMode={editMode}
                />

                {/* 부서 필드 */}
                <div>
                  <div className="font-bold">부서</div>
                  <div
                    className={`border border-gray-400 rounded-md p-1 ${
                      !editMode ? "bg-white" : "bg-gray-100"
                    }`}
                  >
                    {adminInfo.department}
                  </div>
                </div>
              </div>
            )}

            {/* 비밀번호 변경 탭 */}
            {passwordChange && (
              <div className="px-44 pt-20 mb-[16px] gap-4 flex flex-col ">
                <form className="flex flex-col" onSubmit={handlePasswordSubmit}>
                  {/* 현재 비밀번호 */}
                  <MyPageInput
                    className="mb-4"
                    label="현재 비밀번호"
                    id="currentPassword"
                    name="currentPassword"
                    type="password"
                    value={currentPassword}
                    placeholder="현재 비밀번호를 입력하세요"
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                  />

                  {/* 새로운 비밀번호*/}
                  <MyPageInput
                    label="새로운 비밀번호"
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    value={newPassword}
                    placeholder="새로운 비밀번호를 입력하세요"
                    onChange={handleNewPasswordChange}
                    required
                  />
                  {/* 새로운 비밀번호 에러 메시지 출력 */}
                  {newPasswordError && (
                    <p className="text-red-500 text-sm font-medium mb-4">
                      {newPasswordError}
                    </p>
                  )}

                  {/* 비밀번호 확인*/}
                  <MyPageInput
                    className={!newPasswordError ? "mt-4 mb-3" : ""}
                    label="비밀번호 확인"
                    id="newPasswordConfirm"
                    name="newPasswordConfirm"
                    type="password"
                    value={confirmPassword}
                    placeholder="비밀번호를 다시 입력하세요"
                    onChange={handleConfirmPasswordChange}
                    required
                  />
                  {/* 비밀번호 확인 에러 메시지 출력 */}
                  {confirmPasswordError && (
                    <p className="text-red-500 text-sm font-medium">
                      {confirmPasswordError}
                    </p>
                  )}
                  {/* 성공 메시지 출력 */}
                  {successMessage && (
                    <div className="text-green-500 text-sm font-medium">
                      {successMessage}
                    </div>
                  )}
                </form>
              </div>
            )}

            <div className="w-full mt-3 flex flex-col justify-center">
              <div className="w-full bg-white flex flex-col justify-center gap-2">
                <div className="w-full flex mb-20 px-44 gap-2">
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
                        className={buttonClass}
                        disabled={
                          passwordChange &&
                          (!currentPassword ||
                            !newPassword ||
                            !confirmPassword ||
                            newPasswordError ||
                            confirmPasswordError)
                        }
                        color="emptyBlue"
                        type={passwordChange ? "submit" : ""}
                        onClick={
                          !passwordChange
                            ? passwordToggleEditMode
                            : handleRefresh
                        }
                      >
                        {pbuttonText} {/* 버튼 텍스트 변경 */}
                      </Button>
                    </div>
                  )}

                  {!passwordChange && (
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
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default MyPageAdmin;
