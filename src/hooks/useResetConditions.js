import { resetCondition } from "../slices/conditionSlice";
import { resetCompleted } from "../slices/completedSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

export const useResetConditions = (resetWhich) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (resetWhich === "all") {
      dispatch(resetCondition());
      dispatch(resetCompleted());
    } else if (resetWhich === "new") {
      return () => {
        dispatch(resetCondition());
      };
    } else if (resetWhich === "old") {
      return () => {
        dispatch(resetCompleted());
      };
    }
  }, [dispatch, resetWhich]);
};
