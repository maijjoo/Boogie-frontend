import { API_SERVER_HOST } from "./commonApi";
import jwtAxios from "../util/jwtUtil";

const prefix = `${API_SERVER_HOST}/api/admin`;

export const deleteMemberApi = async (ids) => {
  // ids가 제대로 전달되고 있는지 확인하는 로그
  console.log("--- 삭제할 id들의 배열값 ", ids);

  if (!Array.isArray(ids) || ids.length === 0) {
    console.error("ids 값이 올바르지 않거나 배열이 비어 있습니다.", ids);
    return; // ids 배열이 없거나 비어 있으면 API 호출 중단
  }

  try {
    const res = await jwtAxios({
      method: "delete",
      url: `${prefix}/delete/bulk`,
      data: { ids }, // 삭제할 회원의 ID 목록을 전송
    });

    // 성공적으로 삭제 후 반환된 응답 출력
    console.log("삭제 API 응답:", res);
    return res;
  } catch (error) {
    // 오류 발생 시 출력
    console.error("삭제 API 호출 중 오류 발생:", error);
    throw error; // 오류를 다시 던져 호출한 곳에서 처리 가능하게 함
  }
};
