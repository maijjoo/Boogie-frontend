import { API_SERVER_HOST } from "./commonApi";
import jwtAxios from "../util/jwtUtil";

const prefix = `${API_SERVER_HOST}/api/research`;

export const postAdd = async (researchObj) => {
  console.log("-------" + researchObj.get("json"));
  const res = await jwtAxios.post(`${prefix}/`, researchObj, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  console.log("----------res.header: ", res.headers);

  return res.data;
};
