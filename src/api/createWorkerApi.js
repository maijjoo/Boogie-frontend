import { API_SERVER_HOST } from "./commonApi";
import jwtAxios from "../util/jwtUtil";

const prefix = `${API_SERVER_HOST}/api/admin`;

// createWorkerApi 함수
export const createWorkerApi = async (
  adminId, // 로그인한 관리자의 ID
  name,
  phone,
  birth,
  email,
  vehicleCapacity,
  address,
  addressDetail,
  startDate,
  endDate
) => {
  try {
    // 로컬 스토리지 또는 다른 경로에서 JWT 토큰 가져오기
    const token = localStorage.getItem("accessToken");

    // 서버로 POST 요청 보내기
    const res = await jwtAxios.post(
      `${prefix}/create/worker/${adminId}`,
      {
        name: name,
        phone: phone,
        birth: birth,
        email: email,
        vehicleCapacity: vehicleCapacity,
        address: address,
        addressDetail: addressDetail,
        startDate: startDate,
        endDate: endDate,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // JWT 토큰을 Authorization 헤더에 추가
        },
      }
    );

    return res.data; // 응답 데이터 반환
  } catch (error) {
    console.error(`---/create/worker/${adminId} API 호출 오류:`, error);
    throw error; // 오류 처리
  }
};
