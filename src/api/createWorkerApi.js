import { API_SERVER_HOST } from "./commonApi";
import jwtAxios from "../util/jwtUtil";
import { useAuth } from "../hooks/useAuth";

export const createWorkerApi = async (
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
  const { isLoggedIn, role, id } = useAuth(); // 로그인한 관리자의 부서 정보
  const prefix = `${API_SERVER_HOST}/api/admin`;
  try {
    const res = await jwtAxios.post(`${prefix}/create/worker/${id}`, {
      name,
      phone,
      birth,
      email,
      vehicleCapacity,
      address,
      addressDetail,
      startDate,
      endDate,
    });
    return res.data; // 필요한 데이터만 반환 (res.data로 수정)
  } catch (error) {
    console.error(`---/create/worker/${adminId} API 호출 오류:`, error);
    throw error; // 에러를 상위 로직에서 처리하도록 던짐
  }
};
