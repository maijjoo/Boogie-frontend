import { API_SERVER_HOST } from "./commonApi";
import jwtAxios from "../util/jwtUtil";

const prefix = `${API_SERVER_HOST}/api/research`;

export const postAdd = async (researchObj) => {
  // console.log("-------" + researchObj.get("json"));
  const res = await jwtAxios.post(`${prefix}/`, researchObj, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  // console.log("----------res.header: ", res.headers);

  return res.data;
};

export const getNameList = async (researcherId) => {
  const res = await jwtAxios.get(`${prefix}/${researcherId}`);
  // console.log("==========getNameList response : ", res);
  return res.data;
};

// 이미지 받아오기
export const getImageByFileName = async (filename) => {
  // console.log(
  //   "-----------research get api called by: imageName( ",
  //   filename,
  //   " )"
  // );

  const res = await jwtAxios.get(`${prefix}/view/${filename}`, {
    responseType: "blob",
  });

  // console.log("-----------research get api response: ", res);

  const url = URL.createObjectURL(res.data);

  // console.log("-----------file to blob: ", url);

  return url;
};
