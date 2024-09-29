import React, { useRef, useState } from "react";

import Button from "../components/commons/Button";
import InputWithLabel from "../components/commons/InputWithLabel";
import logo from "../assets/images/logo_tr.png";
import wave from "../assets/images/wave.jpg";
import CheckboxWithLabel from "../components/commons/CheckboxWithLabel";
import { useNavigate } from "react-router-dom";

const Login = () => {
  // input 값 받아오는 ref
  // id.current.value 로 input 박스에 적혀있는 현재값 가져올수있음
  // 빈값 체크
  // const inputId = id.current.value;
  // if(inputId.trim()) => 빈칸이면 false
  const id = useRef();
  const password = useRef();
  const navigate = useNavigate();
  // 자동로그인 체크 후 로그인 성공시 쿠키?에 loginSuccess, user 정보 저장?
  const [loginSuccess, setLoginSuccess] = useState(undefined);

  // 체크용 함수
  // 기능개발땐 삭제
  const handleLogin = () => {
    const inputId = id.current.value;
    const inputPassword = password.current.value;
    if (inputId.trim() && inputPassword.trim()) {
      // security 로직
      // 유효 id / pw 체킹
      // 권한 체킹 후 각 메인으로 이동
      if (inputId === "user" && inputPassword === "1234") {
        setLoginSuccess(true);
        navigate("/workerMain");
      } else if (inputId === "admin" && inputPassword === "1234") {
        setLoginSuccess(true);
        navigate("/adminMain");
      } else {
        setLoginSuccess(false);
      }
    } else {
      setLoginSuccess(false);
      id.current.value = "";
      password.current.value = "";
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex items-center mt-3">
        <img className="w-52 xl:w-64" src={logo} alt="logo" />
      </div>

      <div className="w-full flex flex-col mt-9 px-4 items-center">
        <div className="w-full xl:w-1/5 flex flex-col items-start mb-4">
          <InputWithLabel
            className="w-full ps-2 py-2 md:text-base rounded-md"
            type="email"
            ref={id}
            placeholder="아이디를 입력해 주세요."
          >
            아이디
          </InputWithLabel>
        </div>
        <div className="w-full xl:w-1/5 flex flex-col items-start mb-4">
          <InputWithLabel
            className="w-full ps-2 py-2 md:text-base rounded-md"
            type="password"
            ref={password}
            placeholder="비밀번호를 입력해 주세요."
          >
            비밀번호
          </InputWithLabel>
        </div>
      </div>

      {loginSuccess !== undefined && !loginSuccess && (
        <div>
          <p className="text-red-500 text-sm">
            아이디 또는 비밀번호가 일치하지 않습니다.
          </p>
        </div>
      )}

      <div className="w-full xl:w-1/5 flex justify-between">
        <CheckboxWithLabel>아이디 저장</CheckboxWithLabel>
        <CheckboxWithLabel>자동 로그인</CheckboxWithLabel>
      </div>

      <div className="flex justify-center w-full mt-10">
        <Button
          className="w-full xl:w-1/5 m-4 px-10 py-2 md:text-base rounded-md"
          color="blue"
          onClick={handleLogin}
        >
          로그인
        </Button>
      </div>

      <div onClick={() => navigate("/findPassword")} className="cursor-pointer">
        <p>비밀번호 찾기</p>
      </div>

      <div className="flex items-center mt-4 justify-end">
        <img className="w-full" src={wave} alt="wave" />
      </div>
    </div>
  );
};

export default Login;
