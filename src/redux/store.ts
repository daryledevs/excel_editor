import { configureStore } from "@reduxjs/toolkit";
import uploadReducer from "./uploadFileSlice";
const store = configureStore({
  reducer: {
    upload: uploadReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
