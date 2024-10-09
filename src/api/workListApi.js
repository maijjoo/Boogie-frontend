import { API_SERVER_HOST } from "./commonApi";
import jwtAxios from "../util/jwtUtil";

const prefix = `${API_SERVER_HOST}/api/admin`;

export const getWorkList = async (searchParam) => {
  console.log(
    "---completed-tasks get api called with: {tabCondition: ",
    searchParam.tabCondition,
    ", beachName: ",
    searchParam.beachName,
    "}---"
  );

  const res = await jwtAxios.get(`${prefix}/completed-tasks/{adminId}`, {
    params: searchParam, // 쿼리 파라미터로 전달
  });

  console.log("-----------completed-tasks get api response: ", res);

  return res;
};
