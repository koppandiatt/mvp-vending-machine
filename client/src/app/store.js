import { configureStore } from "@reduxjs/toolkit";
import settingSlice from "../slices/settings/settingSlice";

export const store = configureStore({
  reducer: {
    settings: settingSlice,
  },
});
