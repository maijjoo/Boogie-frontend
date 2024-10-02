import { API_SERVER_HOST } from "./commonApi";
import jwtAxios from "../util/jwtUtil";

const prefix = `${API_SERVER_HOST}/api/research`;

export const postAdd = async (researchObj) => {
  const res = await jwtAxios.post(`${prefix}/`, researchObj, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};
