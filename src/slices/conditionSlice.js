import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tabCondition: "조사 완료",
  beachSearch: "",
  page: 1,
  size: 10,
  sort: "desc",
};

const conditionSlice = createSlice({
  name: "condition",
  initialState,
  reducers: {
    setTabCondition: (state, action) => {
      state.tabCondition = action.payload;
    },
    setBeachSearch: (state, action) => {
      state.beachSearch = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setSize: (state, action) => {
      state.size = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    resetCondition: (state) => {
      return initialState;
    },
  },
});

export const {
  setTabCondition,
  setBeachSearch,
  setPage,
  setSize,
  setSort,
  resetCondition,
} = conditionSlice.actions;

export default conditionSlice.reducer;
