import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showCheckout: false,
  showLogin: false,
};

export const settingSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    showCheckout: (state) => {
      state.showCheckout = true;
    },
    hideCheckout: (state) => {
      state.showCheckout = false;
    },
    showLogin: (state) => {
      state.showLogin = true;
    },
    hideLogin: (state) => {
      state.showLogin = false;
    },
  },
});

export const { showCheckout, hideCheckout, showLogin, hideLogin } =
  settingSlice.actions;

export default settingSlice.reducer;
