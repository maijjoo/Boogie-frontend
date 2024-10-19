import { API_SERVER_HOST } from "./commonApi";
import jwtAxios from "../util/jwtUtil";

// workerId와 startDate, endDate를 받는 함수로 수정
const updateWorkPeriodApi = async (workerId, startDate, endDate) => {
  const prefix = `${API_SERVER_HOST}/api/admin`;
  try {
    // startDate와 endDate를 yyyy-MM-dd 형식으로 변환 (LocalDate와 호환)
    const formattedStartDate = startDate.toISOString().split("T")[0];
    const formattedEndDate = endDate.toISOString().split("T")[0];
    // PATCH 요청으로 workerId에 해당하는 업무 기간을 업데이트 (객체 형태로 전송)
    const res = await jwtAxios.patch(
      `${prefix}/member-inquiry/worker/update/${workerId}`,
      { startDate: formattedStartDate, endDate: formattedEndDate } // 객체로 startDate와 endDate를 전송
    );
    console.log(`---/member-inquiry/worker/update/${workerId} API 응답:`, res);

    return res.data; // 필요한 데이터만 반환
  } catch (error) {
    console.error(
      `---/member-inquiry/worker/update/${workerId} API 호출 오류:`,
      error
    );
    throw error; // 에러를 상위 로직에서 처리하도록 던짐
  }
};

export default updateWorkPeriodApi;
