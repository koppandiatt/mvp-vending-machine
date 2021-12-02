import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authHelper from "../../helpers/auth.helper";
import authApi from "./authApi";

const initialState = {
  currentUser: {},
  isAuthenticated: false,
  error: null,
  loading: false,
};

export const doLogin = createAsyncThunk("auth/Login", async (credentials) => {
  const response = await authApi.login(credentials);
  authHelper.saveJWT(response.data);
  return authHelper.getUserData();
});

export const doRegister = createAsyncThunk("auth/Register", async (user) => {
  const response = await authApi.register(user);
  authHelper.saveJWT(response.data);
  return authHelper.getUserData();
});

export const refreshUser = createAsyncThunk("auth/RefreshUser", async () => {
  const response = await authApi.profile();
  return response.data;
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginWithJWT: (state, { payload }) => {
      state.isAuthenticated = true;
      state.currentUser = payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.currentUser = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(doLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(doLogin.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.currentUser = payload;
      })
      .addCase(doLogin.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = "Incorrect username or password!";
      })
      .addCase(refreshUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(refreshUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.currentUser = payload;
      })
      .addCase(refreshUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = "Incorrect username or password!";
      })
      .addCase(doRegister.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(doRegister.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.currentUser = payload;
      });
  },
});

export const { loginWithJWT, logout } = authSlice.actions;

export const authState = (state) => state.auth;

export default authSlice.reducer;
