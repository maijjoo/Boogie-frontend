import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth.js";
import { useNavigate } from "react-router-dom";
import { getUserInfo, updateUserInfo } from "../../api/workerInfoApi.js";
import MobileHeader from "../../components/menus/MobileHeader";
import MobileFooter from "../../components/menus/MobileFooter";
import Button from "../../components/commons/Button.jsx";
import MyPageInput from "../../components/commons/MyPageInput"; // InputField 컴포넌트 임포트
import classNames from "classnames";
import circle from "../../assets/icons/write/Circle.svg";
import useConfirm from "../../components/commons/UseConfirm.jsx";

const MyPageWorker = () => {
  const { isLoggedIn, id, role } = useAuth();
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    email: "",
    phone: "",
    vehicleCapacity: "",
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
    if (isLoggedIn || role === "WORKER") {
      getUserInfo(id).then((data) => {
        setUserInfo({
          name: data.name || "",
          email: data.email || "",
          workGroup: data.address || "",
          addressDetail: data.addressDetail || "",
          vehicleCapacity: data.vehicleCapacity > 0 ? data.vehicleCapacity : "",
          phone: data.phone || "",
          managerContact: data.managerContact || "",
          managerName: data.managerName || "",
          assignmentAreaList: data.assignmentAreaList || "",
          managerDepartment: data.managerDepartment || "",
        });
      });
    } else if (!isLoggedIn || role !== "WORKER") {
      navigate("/", { replace: true });
    }
  }, [id, isLoggedIn, role, navigate]);

  // 입력 필드 변경 핸들러
  const handleInputChange = (e) => {
    if (!editMode) return;
    const { name, value } = e.target;

    setUserInfo((prev) => ({
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
      email: userInfo.email,
      phone: userInfo.phone,
      vehicleCapacity:
        userInfo.vehicleCapacity === ""
          ? null
          : parseFloat(userInfo.vehicleCapacity),
    };

    console.log("업데이트할 데이터:", updatedData); // 데이터가 올바른지 확인

    // 사용자 정보 업데이트 API 호출
    updateUserInfo(id, userInfo)
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
    <div className="w-full h-lvh flex flex-col items-center bg-white">
      <MobileHeader className="fixed top-0 z-50">마이페이지</MobileHeader>
      <div className="w-full mt-16 mb-24 bg-white">
        <form onSubmit={handleSubmit}>
          {/* 사용자 이름 필드 */}
          {!passwordChange && (
            <div className="px-5 gap-4 flex flex-col mb-24">
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
                  {userInfo.name}
                </div>
              </div>

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

              {/* 연락처 필드*/}
              <MyPageInput
                label="연락처"
                name="phone"
                type="tel"
                value={userInfo.phone}
                onChange={handleInputChange}
                readOnly={!editMode} // 수정 모드가 아닐 때는 readOnly 상태 유지
                editMode={editMode}
              />

              {/* 주소 필드 */}
              <div>
                <div className="font-bold">
                  <img src={circle} alt="dot" className="w-1 me-2 inline" />
                  주소
                </div>
                <div
                  className={`border border-gray-400 rounded-md p-1 ${
                    !editMode ? "bg-white" : "bg-gray-100"
                  }`}
                >
                  {userInfo.workGroup + " " + userInfo.addressDetail}
                </div>
              </div>

              {/* 소속 필드 */}
              <div>
                <div className="font-bold">
                  <img src={circle} alt="dot" className="w-1 me-2 inline" />
                  소속
                </div>
                <div
                  className={`border border-gray-400 rounded-md p-1 ${
                    !editMode ? "bg-white" : "bg-gray-100"
                  }`}
                >
                  {userInfo.workGroup} {userInfo.managerDepartment}과
                </div>
              </div>

              {/* 매니저 전화번호 필드 */}
              <div>
                <div className="font-bold">
                  <img src={circle} alt="dot" className="w-1 me-2 inline" />
                  관리자 연락처
                </div>
                <div
                  className={`border border-gray-400 rounded-md p-1 ${
                    !editMode ? "bg-white" : "bg-gray-100"
                  }`}
                >
                  {userInfo.managerContact}
                </div>
              </div>

              {/* 수거차량 적재량 필드 */}
              <MyPageInput
                label="수거차량 적재량 (t)"
                name="vehicleCapacity"
                type=""
                value={userInfo.vehicleCapacity}
                onChange={handleInputChange}
                readOnly={!editMode} // 수정 모드가 아닐 때는 readOnly 상태 유지
                editMode={editMode}
              />
            </div>
          )}

          <div className="w-full xl:w-1/3 mt-3 flex flex-col justify-center">
            <div className="fixed bottom-0 z-50 bg-white w-full flex flex-col justify-center gap-2">
              <div className="flex px-2 gap-2">
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
                      type="button"
                      onClick={
                        !passwordChange ? passwordToggleEditMode : confirmSave
                      }
                    >
                      {pbuttonText} {/* 버튼 텍스트 변경 */}
                    </Button>
                  </div>
                )}
                <div
                  className={`inline-block w-1/2 ${editMode ? "" : "hidden"}`}
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

                {!passwordChange && (
                  <div className="inline-block w-1/2">
                    {/* 내 정보 수정 버튼 */}
                    <Button
                      className="
                    w-full py-3 rounded-lg"
                      color="blue"
                      type="button"
                      onClick={!editMode ? toggleEditMode : confirmUpdate} // 정보 수정 모드 토글
                    >
                      {buttonText} {/* 버튼 텍스트 변경 */}
                    </Button>
                  </div>
                )}
              </div>

              <MobileFooter homeroot="/workerMain" />
            </div>
          </div>
        </form>

        {/* 비밀번호 변경 탭 */}
        {passwordChange && (
          <div className="px-3 ">
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
                className={`mb-4${newPasswordError ? "mb-4" : ""}`}
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
            </form>
          </div>
        )}

        {/* 성공 메시지 출력 */}
        {successMessage && (
          <div className="text-green-500 text-sm font-medium">
            {successMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPageWorker;
