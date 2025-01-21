import axios from "axios";
import { API_SERVER_HOST } from "../api/commonApi";
import { getCookie, setCookie } from "./cookieUtil.js";

const jwtAxios = axios.create();

const refreshJWT = async (accessToken, refreshToken) => {
  console.log("============refreshToken executed============");

  const host = API_SERVER_HOST;
  const header = { headers: { Authorization: `Bearer ${accessToken}` } };
  const res = await axios.get(
    `${host}/api/member/refresh?refreshToken=${refreshToken}`,
    header
  );
  console.log("---------------------");
  console.log(res.data);

  return res.data;
};

//before request
const beforeReq = (config) => {
  // console.log("before request.............");
  // console.log(config);

  const memberInfo = getCookie("member");

  if (!memberInfo) {
    console.log("Member NOT FOUND");
    return Promise.reject({ response: { data: { error: "REQUIRE_LOGIN" } } });
  }
  const { accessToken } = memberInfo;

  // Authorization 헤더 처리
  config.headers.Authorization = `Bearer ${accessToken}`;

  // console.log("after inject header.............");
  // console.log(config);

  return config;
};

//fail request
const requestFail = (err) => {
  console.log("request error............");
  console.log("err: ", err);

  return Promise.reject(err);
};

//before return response
const beforeRes = async (res) => {
  console.log("before return response...........");
  return res;
};

//fail response
const responseFail = async (err) => {
  console.log("response fail error.............");
  console.log("err: ", err);

  // 401 에러 처리
  if (err.response && err.response.status === 401) {
    console.log("AccessToken 만료, RefreshToken으로 갱신 시도...");
    const memberCookieValue = getCookie("member");

    if (memberCookieValue) {
      try {
        // RefreshToken으로 새 AccessToken 발급
        const result = await refreshJWT(
          memberCookieValue.accessToken,
          memberCookieValue.refreshToken
        );

        // 새로운 AccessToken 및 RefreshToken 쿠키에 저장
        memberCookieValue.accessToken = result.accessToken;
        memberCookieValue.refreshToken = result.refreshToken;
        setCookie("member", JSON.stringify(memberCookieValue), 1);

        // 원래 요청 다시 시도
        const originalRequest = err.config;
        originalRequest.headers.Authorization = `Bearer ${result.accessToken}`;
        return await axios(originalRequest);
      } catch (refreshError) {
        console.error("토큰 갱신 실패:", refreshError);
        return Promise.reject(refreshError);
      }
    }
  }

  return Promise.reject(err);
};

jwtAxios.interceptors.request.use(beforeReq, requestFail);

jwtAxios.interceptors.response.use(beforeRes, responseFail);

export default jwtAxios;
