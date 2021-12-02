import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showCheckout: false,
  showLogin: false,
  showProductForm: false,
  showDeposit: false,
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
      state.showProductForm = true;
    },
    hideNewProductForm: (state) => {
      state.showProductForm = false;
    },
    showDepositModal: (state) => {
      state.showDeposit = true;
    },
    hideDepositModal: (state) => {
      state.showDeposit = false;
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
