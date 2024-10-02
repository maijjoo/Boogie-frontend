import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setCookie, getCookie } from "../util/cookieUtil";
import { loginPost } from "../api/memberApi";

const initState = {
  email: "",
};

export const loadMemberCookie = () => {
  const memberInfo = getCookie("member");

  if (memberInfo && memberInfo.username) {
    memberInfo.username = decodeURIComponent(memberInfo.username);
  }
  return memberInfo;
};

export const loginPostAsync = createAsyncThunk("loginPostAsync", (param) => {
  return loginPost(param);
});

const loginSlice = createSlice({
  name: "loginSlice",
  initialState: loadMemberCookie() || initState,
  reducers: {
    login: (state, action) => {
      console.log("login.....");
      const data = action.payload;
      return { email: data.email };
    },
    logout: (state, action) => {
      console.log("logout....");
      return { ...initState };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginPostAsync.fulfilled, (state, action) => {
        console.log("fulfilled");

        const payload = action.payload;

        if (!payload.error) {
          setCookie("member", JSON.stringify(payload), 1);
        }
        return payload;
      })
      .addCase(loginPostAsync.pending, (state, action) => {
        console.log("pending");
      })
      .addCase(loginPostAsync.rejected, (state, action) => {
        console.log("rejected");
      });
  },
});

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;
