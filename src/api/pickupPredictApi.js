import { API_SERVER_HOST } from "./commonApi";
import jwtAxios from "../util/jwtUtil";

const prefix = `${API_SERVER_HOST}/api/admin`;

export const getPredicted = async (searchParam) => {
  console.log(
    "---trash distribution get api called with: {year: ",
    searchParam.year,
    ", month: ",
    searchParam.month,
    ", start: ",
    searchParam.startDate,
    ", end: ",
    searchParam.endDate,
    "}---"
  );

  const res = await jwtAxios.get(`${prefix}/collect-prediction`, {
    params: searchParam,
  });

  console.log("-----------pickup predict get api response: ", res);

  return res;
};
