import { API_SERVER_HOST } from "./commonApi";
import jwtAxios from "../util/jwtUtil";

const prefix = `${API_SERVER_HOST}/api/pick-up`;

//completed/id(작업 최종완료)/added-Route(경로에 추가)

export const getSpot = async (adminId) => {
  console.log("--------getSpot----------");

  const res = await jwtAxios.get(`${prefix}/${adminId}`);

  return res.data;
};

export const setSpotState = async (pickUpId) => {
  console.log("--------post-------");

  const res = await jwtAxios.patch(`${prefix}/`, pickUpId);

  return res.data;
};
