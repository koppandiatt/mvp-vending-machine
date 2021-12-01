import { configureStore } from "@reduxjs/toolkit";
import productSlice from "../slices/product/productSlice";
import settingSlice from "../slices/settings/settingSlice";

export const store = configureStore({
  reducer: {
    settings: settingSlice,
    product: productSlice,
  },
});
