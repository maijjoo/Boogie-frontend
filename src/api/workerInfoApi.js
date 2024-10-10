import { API_SERVER_HOST } from "./commonApi";
import jwtAxios from "../util/jwtUtil";

const prefix = `${API_SERVER_HOST}/api/member/my-page/worker`;

export const getUserInfo = async (workerId) => {
  const res = await jwtAxios.get(`${prefix}/${workerId}`);

  console.log("----------", res);

  return res.data;
};
