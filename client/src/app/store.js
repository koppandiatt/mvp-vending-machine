import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../slices/auth/authSlice";
import checkoutSlice from "../slices/checkout/checkoutSlice";
import productSlice from "../slices/product/productSlice";
import settingSlice from "../slices/settings/settingSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    settings: settingSlice,
    product: productSlice,
    checkout: checkoutSlice,
  },
});
