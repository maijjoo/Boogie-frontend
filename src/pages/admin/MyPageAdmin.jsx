import React, { useState, useEffect } from "react";
import Button from "../../components/commons/Button.jsx";
import MyPageInput from "../../components/commons/MyPageInput"; // InputField 컴포넌트 임포트
import { useAuth } from "../../hooks/useAuth.js";
import classNames from "classnames";
import { getAdminInfo, updateAdminInfo } from "../../api/adminInfoApi.js";
import circle from "../../assets/icons/write/Circle.svg";
import SidebarLayout from "../../layouts/SidebarLayout";
import useConfirm from "../../hooks/UseConfirm.jsx";
import { useResetConditions } from "../../hooks/useResetConditions.js";
import { useNavigate } from "react-router-dom";

const MyPageAdmin = () => {
  useResetConditions("all");

  const { isLoggedIn, role, id } = useAuth();
  const navigate = useNavigate();
  const [adminInfo, setAdminInfo] = useState({
    name: "",
    phone: "",
    email: "",
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
  // 비밀번호 변경 컨펌
  const savingPassword = () => console.log("저장중...");
  const abort = () => console.log("취소됨.");
  const confirmSave = useConfirm("저장하시겠습니까?", savingPassword, abort);

  //개인정보 수정 컨펌
  const updateInfo = () => {
    console.log("수정중...");
    handleSubmit();
  };
  const cancelUpdate = () => console.log("취소됨.");
  const confirmUpdate = useConfirm(
    "수정하시겠습니까?",
    updateInfo,
    cancelUpdate
  );

  // useEffect를 사용하여 memberInfo가 업데이트될 때 userInfo 상태 업데이트
  useEffect(() => {
    if (!isLoggedIn || role === "WORKER") {
      navigate("/", { replace: true });
    } else {
      getAdminInfo(id).then((data) => {
        setAdminInfo({
          name: data.name || "",
          phone: data.phone || "",
          email: data.email || "",
          workPlace: data.workPlace || "",
          department: data.department || "",
          contact: data.contact || "",
          position: data.position || "",
          address: data.address || "",
          addressDetail: data.addressDetail || "",
        });
      });
    }
  }, [id, isLoggedIn, role, navigate]);

  // 입력 필드 변경 핸들러
  const handleInputChange = (e) => {
    if (!editMode) return;
    const { name, value } = e.target;

    setAdminInfo((prev) => ({
      ...prev,
      [name]: value, // 빈 문자열도 그대로 유지하도록 설정
    }));
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
    e && e.preventDefault();

    const updatedData = {
      name: adminInfo.name,
      phone: adminInfo.phone,
      email: adminInfo.email,
      address: adminInfo.address,
      addressDetail: adminInfo.addressDetail,
      department: adminInfo.department,
      position: adminInfo.position,
      contact: adminInfo.contact,
    };

    console.log("업데이트할 데이터:", updatedData); // 데이터가 올바른지 확인

    // 사용자 정보 업데이트 API 호출
    updateAdminInfo(id, adminInfo)
      .then((response) => {
        console.log("사용자 정보 업데이트 성공:", response);
        setSuccessMessage("사용자 정보가 성공적으로 업데이트되었습니다.");
      })
      .catch((error) => {
        console.error("사용자 정보 업데이트 실패:", error);
        setSuccessMessage("사용자 정보 업데이트에 실패했습니다.");
      });

    setEditMode(false);
    setButtonText("내 정보 수정");
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
              <div
                className="px-10 2xl:px-44 xl:px-20 pt-20 mb-[16px] gap-4 flex flex-col transition-all duration-500
              sm:text-sm text-[10px]"
              >
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
                  name="phone"
                  type="tel"
                  value={adminInfo.phone}
                  onChange={handleInputChange}
                  readOnly={!editMode} // 수정 모드가 아닐 때는 readOnly 상태 유지
                  editMode={editMode}
                />

                {/* 근무처 필드 */}
                <div>
                  <div className="font-bold">
                    <img src={circle} alt="dot" className="w-1 me-2 inline" />
                    근무처
                  </div>
                  <div
                    className={`border border-gray-400 rounded-md p-1 ${
                      !editMode ? "bg-white" : "bg-gray-100"
                    }`}
                  >
                    {adminInfo.workPlace}
                  </div>
                </div>

                {/* 부서 필드*/}
                <MyPageInput
                  label="부서"
                  name="department"
                  type="text"
                  value={adminInfo.department}
                  onChange={handleInputChange}
                  readOnly={!editMode} // 수정 모드가 아닐 때는 readOnly 상태 유지
                  editMode={editMode}
                />
              </div>
            )}

            {/* 비밀번호 변경 탭 */}
            {passwordChange && (
              <div className="px-10 2xl:px-44 xl:px-20 pt-20 mb-[16px] gap-4 flex flex-col transition-all duration-500 sm:text-sm text-[10px]">
                <form className="flex flex-col" onSubmit={handlePasswordSubmit}>
                  {/* 현재 비밀번호 */}
                  <MyPageInput
                    className="mb-4 caret-black"
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
                    className={`mb-4 caret-black ${
                      newPasswordError ? "mb-4" : ""
                    }`}
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
                    className={`caret-black ${
                      !confirmPasswordError ? "mb-[131.2px]" : ""
                    }`}
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
                    <p className="text-red-500 text-sm font-medium mb-[131.2px]">
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

            <div className="w-full mt-12 flex flex-col justify-center">
              <div className="w-full bg-white flex flex-col justify-center gap-2">
                <div
                  className="w-full flex flex-col sm:flex sm:flex-row-reverse sm:justify-center mb-20 px-10 2xl:px-44 xl:px-20 gap-2 transition-all duration-500
                sm:text-sm text-[10px]"
                >
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
                          !passwordChange ? passwordToggleEditMode : confirmSave
                        }
                      >
                        {pbuttonText} {/* 버튼 텍스트 변경 */}
                      </Button>
                    </div>
                  )}

                  {!passwordChange ? (
                    <div
                      className={`inline-block w-full ${
                        editMode ? "" : "hidden"
                      }`}
                    >
                      {/* 취소 버튼 */}
                      <Button
                        className="
                    w-full py-3 rounded-lg"
                        color="emptyBlue"
                        type="button"
                        onClick={toggleEditMode} // 정보 수정 모드 토글
                      >
                        취소
                      </Button>
                    </div>
                  ) : (
                    <div
                      className={`inline-block w-full ${
                        passwordChange ? "" : "hidden"
                      }`}
                    >
                      {/* 취소 버튼 */}
                      <Button
                        className="
                    w-full py-3 rounded-lg"
                        color="emptyBlue"
                        type="button"
                        onClick={passwordToggleEditMode} // 비밀번호 변경 모드 토글
                      >
                        취소
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
                        className="w-full py-3 rounded-lg"
                        color="blue"
                        type="button"
                        onClick={!editMode ? toggleEditMode : confirmUpdate} // 정보 수정 모드 토글
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
