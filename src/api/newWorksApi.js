import { API_SERVER_HOST } from "./commonApi";
import jwtAxios from "../util/jwtUtil";

const prefix = `${API_SERVER_HOST}/api/admin/new-tasks`;

export const getNewWorks = async (id, searchParam) => {
  const res = await jwtAxios.get(`${prefix}/${id}`, {
    params: searchParam, // 쿼리 파라미터로 전달
  });

  console.log("-----------new-tasks get api response: ", res);

  return res;
};

export const getNewWorksDetail = async (researchId) => {
  const res = await jwtAxios.get(`${prefix}/research/${researchId}`);

  return res;
};

export const getNewWorksClean = async (cleanId) => {
  const res = await jwtAxios.get(`${prefix}/clean/${cleanId}`);

  return res;
};
