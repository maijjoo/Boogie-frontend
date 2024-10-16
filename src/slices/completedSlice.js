import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tabCondition: "조사",
  beachSearch: "",
  page: 1,
  size: 10,
  sort: "desc",
};

const completedSlice = createSlice({
  name: "completed",
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
    resetCompleted: (state) => {
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
  resetCompleted,
} = completedSlice.actions;

export default completedSlice.reducer;
