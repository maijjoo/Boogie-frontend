import React, { useEffect, useRef, useState } from "react";

import Button from "../components/commons/Button";
import InputWithLabel from "../components/commons/InputWithLabel";
import logo from "../assets/images/logo_tr.png";
import wave from "../assets/images/wave.jpg";
import CheckboxWithLabel from "../components/commons/CheckboxWithLabel";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginPostAsync } from "../slices/loginSlice";
import { useAuth } from "../hooks/useAuth";
import { getCookie, removeCookie, setCookie } from "../util/cookieUtil";

const Login = () => {
  // input 값 받아오는 ref
  // id.current.value 로 input 박스에 적혀있는 현재값 가져올수있음
  const id = useRef();
  const password = useRef();
  const navigate = useNavigate();
  // 오류메세지 출력용
  const [loginSuccess, setLoginSuccess] = useState(undefined);

  const { isLoggedIn, role } = useAuth();
  const dispatch = useDispatch();

  const autoLoginRef = useRef();
  const saveIdRef = useRef();

  useEffect(() => {
    const saveId = getCookie("saveId");
    if (saveId) {
      id.current.value = saveId;
      saveIdRef.current.checked = true;
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      role === "ADMIN"
        ? navigate("/adminMain", { replace: true })
        : navigate("/workerMain", { replace: true });
    }
  }, [isLoggedIn, role, navigate]);

  // input값 빈칸 체킹 후 api 호출
  // 응답 성공일 시 redux 상태
  const handleLogin = async () => {
    const inputId = id.current.value;
    const inputPassword = password.current.value;
    const isAutoLogin = autoLoginRef.current.checked;
    const isSaveId = saveIdRef.current.checked;

    if (inputId.trim() && inputPassword.trim()) {
      try {
        const data = await dispatch(
          loginPostAsync({
            username: inputId,
            password: inputPassword,
            autoLogin: isAutoLogin,
          })
        ).unwrap();

        if (isSaveId) {
          setCookie("saveId", inputId, 30);
        } else {
          removeCookie("saveId");
        }
      } catch (error) {
        alert("id 혹은 비밀번호를 다시 확인해주세요.");
        console.log("Login Error: ", error);
      }
    } else {
      setLoginSuccess(false);
      id.current.value = "";
      password.current.value = "";
      alert("id 혹은 비밀번호를 입력해주세요.");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLogin(); // 엔터키를 누르면 검색 실행
    }
  };

  return (
    <div className="w-full h-screen mb-0 mt-0 flex flex-col items-center relative overflow-hidden">
      {/* Wave 이미지 - 배경으로 설정 */}
      <div className="fixed bottom-0 left-0 w-full z-0">
        <img className="w-full block" src={wave} alt="wave" />
      </div>

      {/* 로그인 폼 */}
      <div className="z-10 w-full max-w-md p-6 sm:p-8 bg-white rounded-lg lg:shadow-lg flex flex-col items-center">
        <div className="flex items-center mb-4">
          <img className="w-44 xl:w-64" src={logo} alt="logo" />
        </div>

        <div className="w-full flex flex-col mt-4 items-center">
          <div className="w-full flex flex-col items-start mb-4">
            <InputWithLabel
              className="w-full mt-1 px-2 py-2 md:text-base rounded-md"
              type="text"
              ref={id}
              placeholder="아이디를 입력해 주세요."
              onKeyDown={handleKeyDown}
            >
              아이디
            </InputWithLabel>
          </div>
          <div className="w-full flex flex-col items-start mb-1">
            <InputWithLabel
              className="w-full mt-1 px-2 py-2 md:text-base rounded-md"
              type="password"
              ref={password}
              placeholder="비밀번호를 입력해 주세요."
              onKeyDown={handleKeyDown}
            >
              비밀번호
            </InputWithLabel>
          </div>
        </div>

        {loginSuccess !== undefined && !loginSuccess && (
          <div className="text-red-500 text-sm mt-2">
            <p>아이디 또는 비밀번호가 일치하지 않습니다.</p>
          </div>
        )}

        <div className="w-full flex justify-between">
          <CheckboxWithLabel ref={saveIdRef}>아이디 저장</CheckboxWithLabel>
          <CheckboxWithLabel ref={autoLoginRef}>자동 로그인</CheckboxWithLabel>
        </div>

        <div className="flex justify-center w-full mt-6">
          <Button
            className="w-full m-4 px-10 py-2 md:text-base rounded-md"
            color="blue"
            onClick={handleLogin}
          >
            로그인
          </Button>
        </div>

        <div
          onClick={() => navigate("/findPassword")}
          className="cursor-pointer text-blue-500 mb-4"
        >
          <p>비밀번호 찾기</p>
        </div>
      </div>
    </div>
  );
};
export default Login;
