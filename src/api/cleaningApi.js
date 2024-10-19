import { API_SERVER_HOST } from "./commonApi";
import jwtAxios from "../util/jwtUtil";

const prefix = `${API_SERVER_HOST}/api/clean`;

export const postAdd = async (cleaningObj) => {
  const res = await jwtAxios.post(`${prefix}/`, cleaningObj, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  console.log("----------", res);

  return res.data;
};

export const getNameList = async (cleanerId) => {
  const res = await jwtAxios.get(`${prefix}/${cleanerId}`);
  // console.log("==========getNameList response : ", res);
  return res.data;
};

// 이미지 받아오기
export const getImageByFileName = async (filename) => {
  // console.log(
  //   "-----------clean get api called by: imageName( ",
  //   filename,
  //   " )"
  // );

  const res = await jwtAxios.get(`${prefix}/view/${filename}`, {
    responseType: "blob",
  });

  // console.log("-----------pickUp get api response: ", res);

  const url = URL.createObjectURL(res.data);

  // console.log("-----------file to blob: ", url);

  return url;
};
