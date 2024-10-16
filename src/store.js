import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./slices/loginSlice";
import conditionReducer from "./slices/conditionSlice";
import completedReducer from "./slices/completedSlice";

export default configureStore({
  reducer: {
    login: loginSlice,
    condition: conditionReducer,
    completed: completedReducer,
  },
});
