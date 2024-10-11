import { API_SERVER_HOST } from "./commonApi";
import jwtAxios from "../util/jwtUtil";

const prefix = `${API_SERVER_HOST}/api/member/my-page/worker`;

export const getUserInfo = async (workerId) => {
  const res = await jwtAxios.get(`${prefix}/${workerId}`);

  console.log("----------", res);

  return res.data;
};

export const updateUserInfo = async (workerId, info) => {
  try {
    const res = await jwtAxios.put(`${prefix}/${workerId}`, info); // body 필드 제거
    return res.data;
  } catch (error) {
    console.error(
      "사용자 정보 업데이트 실패:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
