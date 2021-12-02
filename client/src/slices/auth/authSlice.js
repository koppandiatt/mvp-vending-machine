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

export const makeDeposit = createAsyncThunk("auth/Deposit", async (coin) => {
  const response = await authApi.deposit(coin);
  return response.data;
});

export const resetDepositToZero = createAsyncThunk(
  "auth/ResetDeposit",
  async () => {
    const response = await authApi.reset_deposit();
    return response.data;
  }
);

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
    resetDeposit: (state) => {
      state.currentUser = { ...state.currentUser, deposit: 0 };
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
      })
      .addCase(makeDeposit.pending, (state) => {
        state.loading = true;
      })
      .addCase(makeDeposit.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.currentUser = { ...state.currentUser, deposit: payload.deposit };
      });
  },
});

export const { loginWithJWT, logout, resetDeposit } = authSlice.actions;

export const authState = (state) => state.auth;

export default authSlice.reducer;
