import React, { useState } from "react";
import back from "../assets/icons/nav/Back.svg";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import InputWithLabel from "../components/commons/InputWithLabel";
import Button from "../components/commons/Button";

const FindPasswordPage = () => {
  const navigate = useNavigate();
  const inputId = useRef();
  const inputName = useRef();

  // undefined = 처음 비번찾기 페이지 접속시,
  // false = 입력한 이메일, 이름이 DB에 없을때,
  // 경고 메세지 출력을 위해 undefined 와 구분해야함
  // true = 등록된 회원임을 확인 후 이메일로 인증코드가 전송된 상태
  const [isEmailSent, setIsEmailSent] = useState(undefined);

  // 인증코드 입력시 맞는지 아닌지 리렌더링해야 함
  const [inputCode, setInputCode] = useState("");

  // 인증코드 일치시, 비밀번호 재설정 input 렌더링
  const [isCodeValid, setIsCodeValid] = useState(undefined);

  // 비밀번호, 비밀번호 확인 state
  const [newPassword, setNewPassword] = useState();
  const [newPasswordCheck, setNewPasswordCheck] = useState();

  // 일치하는 이메일, 이름 있는지 user search
  // 있으면 이메일 보내기
  const handleVerifyUser = async () => {
    const email = inputId.current.value;
    const name = inputName.current.value;
    if (email && name) {
      // try {
      // 서버에 사용자 정보 확인 요청
      //   const response = await fetch("/api/verifyUser", {
      //     method: "POST",
      //     body: JSON.stringify({ email, name }),
      //     headers: { "Content-Type": "application/json" },
      //   });

      //   if (response.ok) {
      //     setIsSendEmail(true);
      //     sendVerificationEmail(); // 이 함수는 별도로 구현해야 합니다
      //   } else {
      //     setIsSendEmail(false);
      //     alert("사용자 정보를 확인할 수 없습니다.");
      //   }
      // } catch (error) {
      //   console.error("Error verifying user:", error);
      //   setIsSendEmail(false);
      //   alert("사용자 확인 중 오류가 발생했습니다.");
      // }
      setIsEmailSent(true);
    } else {
      setIsEmailSent(false);
      alert("이메일과 이름을 모두 입력해주세요.");
      return;
    }
  };

  // 인증 이메일 발송 / 재발송
  const sendVerificationEmail = async () => {
    // 인증 이메일 발송 로직
    // try {
    //   // 서버에 인증 이메일 발송 요청
    //   const response = await fetch("/api/sendVerificationEmail", {
    //     method: "POST",
    //     body: JSON.stringify({ email }),
    //     headers: { "Content-Type": "application/json" },
    //   });

    //   if (response.ok) {
    //     setIsEmailSent(true);
    //     alert("인증 이메일이 발송되었습니다. 이메일을 확인해주세요.");
    //   } else {
    //     alert("인증 이메일 발송에 실패했습니다.");
    //   }
    // } catch (error) {
    //   console.error("Error sending verification email:", error);
    //   alert("인증 이메일 발송 중 오류가 발생했습니다.");
    // }
    setIsEmailSent(true);
  };

  // 인증코드 맞는지 확인
  const verifyEmailCode = async () => {
    // try {
    //   // 서버에 인증 코드 확인 요청
    //   const response = await fetch("/api/verifyEmailCode", {
    //     method: "POST",
    //     body: JSON.stringify({ email, verificationCode }),
    //     headers: { "Content-Type": "application/json" },
    //   });

    //   if (response.ok) {
    //     setIsCodeValid(true);
    //     alert("이메일 인증이 완료되었습니다.");
    //   } else {
    //     alert("잘못된 인증 코드입니다.");
    //   }
    // } catch (error) {
    //   console.error("Error verifying email code:", error);
    //   alert("인증 코드 확인 중 오류가 발생했습니다.");
    // }
    setIsCodeValid(true);
  };

  const handlePasswordStrength = () => {
    // 비밀번호 강도
  };

  const handlePasswordChange = () => {
    // 바뀐 비밀번호 저장
    // 위에서 강도체크랑 일치 체크 했으니 저장만 하면됨
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full border-b border-b-slate-400 flex">
        <button onClick={() => navigate(-1)} className="p-3">
          <img src={back} alt="back" />
        </button>
        <p className="py-3">비밀번호 찾기</p>
      </div>

      <div className="w-full flex flex-col mt-3 px-4 items-center">
        <div className="w-full xl:w-1/5 flex flex-col items-start mb-4">
          <InputWithLabel
            className="w-full ps-2 py-2 md:text-base rounded-md"
            type="email"
            ref={inputId}
            placeholder="아이디를 입력해 주세요."
            disabled={isEmailSent}
          >
            아이디
          </InputWithLabel>
        </div>
        <div className="w-full xl:w-1/5 flex flex-col items-start mb-4">
          <InputWithLabel
            className="w-full ps-2 py-2 md:text-base rounded-md"
            type="text"
            ref={inputName}
            placeholder="이름을 입력해 주세요."
            disabled={isEmailSent}
          >
            이름
          </InputWithLabel>
        </div>

        {isEmailSent !== undefined && isEmailSent && (
          <div className="w-full xl:w-1/5 flex flex-col items-start mb-4">
            <InputWithLabel
              className="w-full ps-2 py-2 md:text-base rounded-md"
              type="text"
              value={inputCode}
              placeholder="인증번호를 입력해 주세요."
              onChange={(e) => setInputCode(e.target.value)}
              disabled={isCodeValid}
            >
              인증번호 입력
            </InputWithLabel>
          </div>
        )}

        {isEmailSent && isCodeValid !== undefined && (
          <div className="w-full xl:w-1/5">
            {isCodeValid ? (
              <p className="text-blue-500 text-sm">인증되었습니다.</p>
            ) : (
              <p className="text-red-500 text-sm">
                인증번호가 일치하지 않습니다.
              </p>
            )}
          </div>
        )}

        {isEmailSent !== undefined && !isEmailSent && (
          <div className="w-full xl:w-1/5">
            <p className="text-red-500 text-sm">
              일치하는 이메일 또는 이름이 없습니다.
            </p>
          </div>
        )}
      </div>

      {isCodeValid && (
        <div className="w-full flex flex-col mt-3 px-4 items-center">
          <div className="w-full xl:w-1/5 flex flex-col items-start mb-4">
            <InputWithLabel
              className="w-full ps-2 py-2 md:text-base rounded-md"
              type="password"
              value={newPassword}
              placeholder="새로운 비밀번호를 입력하세요."
              onChange={(e) => setNewPassword(e.target.value)}
            >
              비밀번호 재설정
            </InputWithLabel>
          </div>
          <div className="w-full xl:w-1/5">
            <p className="text-red-500 text-sm">비밀번호 유효성 검사 메세지</p>
          </div>
          <div className="w-full xl:w-1/5 flex flex-col items-start mb-4">
            <InputWithLabel
              className="w-full ps-2 py-2 md:text-base rounded-md"
              type="password"
              value={newPasswordCheck}
              placeholder="비밀번호를 다시 입력하세요."
              onChange={(e) => setNewPasswordCheck(e.target.value)}
            >
              비밀번호 확인
            </InputWithLabel>
          </div>
          <div className="w-full xl:w-1/5">
            <p className="text-red-500 text-sm">비밀번호 일치 메세지</p>
          </div>
        </div>
      )}

      <div className="flex justify-center w-full mt-10">
        {isEmailSent === undefined || isEmailSent === false ? (
          <Button
            className="w-full xl:w-1/5 m-4 px-10 py-2 md:text-base rounded-md"
            color="blue"
            onClick={handleVerifyUser}
          >
            인증번호 요청
          </Button>
        ) : isCodeValid === undefined ? (
          <div className="w-full xl:w-1/4 flex flex-row">
            <Button
              className="w-full m-4 px-5 py-2 rounded-md xl:text-sm"
              color="white"
              onClick={sendVerificationEmail}
            >
              인증번호 재요청
            </Button>
            <Button
              className="w-full m-4 px-5 py-2 rounded-md xl:text-sm"
              color="blue"
              onClick={verifyEmailCode}
            >
              확인
            </Button>
          </div>
        ) : isCodeValid ? (
          <Button
            className="w-full xl:w-1/5 m-4 px-10 py-2 md:text-base rounded-md"
            color="blue"
            onClick={handlePasswordChange}
          >
            확인
          </Button>
        ) : null}
      </div>
    </div>
  );
};

export default FindPasswordPage;
