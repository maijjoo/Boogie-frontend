import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setCookie, getCookie, removeCookie } from "../util/cookieUtil";
import { loginPost } from "../api/memberApi";

const initState = {
  email: "",
  username: "",
  roleNames: [],
  isLoading: false,
  error: null,
};

export const loadMemberCookie = () => {
  const memberInfo = getCookie("member");

  if (memberInfo && memberInfo.username) {
    memberInfo.username = decodeURIComponent(memberInfo.username);
  }
  return memberInfo || initState;
};

export const loginPostAsync = createAsyncThunk(
  "login/loginPost",
  async (param, { rejectWithValue }) => {
    try {
      const response = await loginPost(param);
      console.log(response);

      return response;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState: loadMemberCookie(),
  reducers: {
    login: (state, action) => {
      console.log("login.....");
      return { ...state, ...action.payload };
    },
    logout: (state) => {
      console.log("logout....");
      removeCookie("member");
      return { ...initState };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginPostAsync.fulfilled, (state, action) => {
        console.log("fulfilled...");

        const payload = action.payload;

        if (!payload.error) {
          setCookie("member", JSON.stringify(payload), 1);
        }
        return { ...state, isLoading: false, error: payload.error };
      })
      .addCase(loginPostAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        console.log("pending...");
      })
      .addCase(loginPostAsync.rejected, (state, action) => {
        console.log("rejected...");
        return { ...state, isLoading: false, error: action.payload };
      });
  },
});

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;
