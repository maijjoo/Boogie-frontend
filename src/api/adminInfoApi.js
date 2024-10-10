import { API_SERVER_HOST } from "./commonApi";
import jwtAxios from "../util/jwtUtil";

const prefix = `${API_SERVER_HOST}/api/member/my-page/admin`;

export const getAdminInfo = async (adminId) => {
  const res = await jwtAxios.get(`${prefix}/${adminId}`);

  console.log("----------", res);

  return res.data;
};
