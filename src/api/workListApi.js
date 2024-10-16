import { API_SERVER_HOST } from "./commonApi";
import jwtAxios from "../util/jwtUtil";

const prefix = `${API_SERVER_HOST}/api/admin`;

// 작업조회 리스트
export const getCompletedWorks = async (id, searchParam) => {
  console.log(
    "---completed-tasks get api called with: {tabCondition: ",
    searchParam.tabCondition,
    ", beachName: ",
    searchParam.beachName,
    "}---"
  );

  const res = await jwtAxios.get(`${prefix}/completed-tasks/${id}`, {
    params: searchParam, // 쿼리 파라미터로 전달
  });

  console.log("-----------completed-tasks get api response: ", res);

  return res;
};

// 작업조회 디테일
export const getCompletedWorksDetail = async (id, condition) => {
  const apiPath =
    condition === "조사"
      ? "research"
      : condition === "청소"
      ? "clean"
      : "pick-up";

  const res = await jwtAxios.get(`${prefix}/completed-tasks/${apiPath}/${id}`);

  return res;
};
