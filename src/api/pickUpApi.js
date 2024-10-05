import { API_SERVER_HOST } from "./commonApi";
import jwtAxios from "../util/jwtUtil";

const prefix = `${API_SERVER_HOST}/api/pick-up`;

export const postAdd = async (pickUpobj) => {
  console.log("-------" + pickUpobj.get("json"));

  const res = await jwtAxios.post(`${prefix}/`, pickUpobj, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};
