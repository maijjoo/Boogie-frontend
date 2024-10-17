import { API_SERVER_HOST } from "./commonApi";
import jwtAxios from "../util/jwtUtil";

const prefix = `${API_SERVER_HOST}/api/admin`;

// 뉴작업 리스트
export const getNewWorks = async (id, searchParam) => {
  // console.log("-------------searchParam : ", searchParam);
  // console.log(
  //   "=======newTasks get api called by: ",
  //   id,
  //   ", param: ",
  //   searchParam
  // );

  const res = await jwtAxios.get(`${prefix}/new-tasks/${id}`, {
    params: searchParam, // 쿼리 파라미터로 전달
  });

  // console.log("-----------new-tasks get api response: ", res);

  return res;
};

// 합친버전 뉴작업 디테일
export const getNewWorksDetail = async (id, condition) => {
  const apiPath = condition === "조사 완료" ? "research" : "clean";
  // console.log("-----------요청경로 : ", `${prefix}/${apiPath}/${id}`);

  const res = await jwtAxios.get(`${prefix}/new-tasks/${apiPath}/${id}`);

  return res;
};

// 합친버전 뉴작업 배정
export const completeNewWorks = async (id, condition) => {
  const apiPath = condition === "조사 완료" ? "research" : "clean";
  const res = await jwtAxios.patch(
    `${prefix}/new-tasks/${apiPath}/completed/${id}`
  );

  return res;
};

// 이미지파일 받아오기
export const getImageByFileName = async (filename) => {
  // console.log("-----------get api called by: imageName( ", filename, " )");

  const res = await jwtAxios.get(
    `${API_SERVER_HOST}/api/admin/view/${filename}`,
    {
      responseType: "blob",
    }
  );

  // console.log("-----------get api response: ", res);

  const url = URL.createObjectURL(res.data);

  // console.log("-----------file to blob: ", url);

  return url;
};
