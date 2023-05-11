import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    registerStart: (state) => {
      state.isFetching = true;
    },
    registerSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    registerFailure: (state) => {
      1;
      state.isFetching = false;
      state.error = true;
    },
    logoutStart: (state) => {
      state.currentUser = null;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logoutStart,
  registerStart,
  registerSuccess,
  registerFailure,
} = userSlice.actions;
export default userSlice.reducer;
