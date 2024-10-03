import { API_SERVER_HOST } from "./commonApi";
import jwtAxios from "../util/jwtUtil";

const prefix = `${API_SERVER_HOST}/api/pickUp`;

export const getPickUpsByManagerId = async (managerId) => {
  console.log("------------" + managerId);

  const res = await jwtAxios.get(`${prefix}/`, managerId, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};
