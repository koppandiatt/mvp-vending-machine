import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showCheckout: false,
  showLogin: false,
  showNewProductForm: false,
  showDepositModal: false,
};

export const settingSlice = createSlice({
  name: "settings",
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
    showNewProductForm: (state) => {
      state.showNewProductForm = true;
    },
    hideNewProductForm: (state) => {
      state.showNewProductForm = false;
    },
    showDepositModal: (state) => {
      state.showDepositModal = true;
    },
    hideDepositModal: (state) => {
      state.showDepositModal = false;
    },
  },
});

export const {
  showCheckout,
  hideCheckout,
  showLogin,
  hideLogin,
  showNewProductForm,
  hideNewProductForm,
  showDepositModal,
  hideDepositModal,
} = settingSlice.actions;

export const settingsState = (state) => state.settings;

export default settingSlice.reducer;
