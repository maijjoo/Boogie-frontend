import { API_SERVER_HOST } from "./commonApi";
import jwtAxios from "../util/jwtUtil";

const prefix = `${API_SERVER_HOST}/api/admin/new-tasks`;

export const getNewWorks = async (id, searchParam) => {
  console.log("-------------searchParam : ", searchParam);

  const res = await jwtAxios.get(`${prefix}/${id}`, {
    params: searchParam, // 쿼리 파라미터로 전달
  });

  console.log("-----------new-tasks get api response: ", res);

  return res;
};

// 조사 뉴작업 디테일
export const getNewWorksResearch = async (researchId) => {
  const res = await jwtAxios.get(`${prefix}/research/${researchId}`);

  return res;
};

// 조사 뉴작업 배정
export const completeNewWorksResearch = async (researchId) => {
  const res = await jwtAxios.patch(
    `${prefix}/research/completed/${researchId}`
  );

  return res;
};

// 청소 뉴작업 디테일
export const getNewWorksClean = async (cleanId) => {
  const res = await jwtAxios.get(`${prefix}/clean/${cleanId}`);

  return res;
};

// 청소 뉴작업 배정
export const completeNewWorksClean = async (cleanId) => {
  const res = await jwtAxios.patch(`${prefix}/clean/completed/${cleanId}`);

  return res;
};

// 합친버전 뉴작업 디테일
export const getNewWorksDetail = async (id, condition) => {
  const apiPath = condition === "조사 완료" ? "research" : "clean";
  console.log("-----------요청경로 : ", `${prefix}/${apiPath}/${id}`);

  const res = await jwtAxios.get(`${prefix}/${apiPath}/${id}`);

  return res;
};

// 합친버전 뉴작업 배정
export const completeNewWorks = async (id, condition) => {
  const apiPath = condition === "조사 완료" ? "research" : "clean";
  const res = await jwtAxios.patch(`${prefix}/${apiPath}/completed/${id}`);

  return res;
};

// 이미지파일 받아오기
export const getImageByFileName = async (filename) => {
  console.log("-----------get api called by: imageName( ", filename, " )");

  const res = await jwtAxios.get(
    `${API_SERVER_HOST}/api/admin/view/${filename}`,
    {
      responseType: "blob",
    }
  );

  console.log("-----------get api response: ", res);

  const url = URL.createObjectURL(res.data);

  console.log("-----------file to blob: ", url);

  return url;
};
