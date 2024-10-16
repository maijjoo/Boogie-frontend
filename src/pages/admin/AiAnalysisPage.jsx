import React, { useEffect } from "react";
import { resetCondition } from "../../slices/conditionSlice";
import { useDispatch } from "react-redux";

function AiAnalysisPage(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetCondition()); // 페이지를 벗어날 때 상태 초기화
    };
  }, [dispatch]);

  return <div>개발중</div>;
}

export default AiAnalysisPage;
