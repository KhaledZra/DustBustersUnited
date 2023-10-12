import { combineReducers, configureStore } from "@reduxjs/toolkit";

import userSlice from "./userSlice";

export const rootReducer = combineReducers({
  user: userSlice,
});

const store = configureStore({ reducer: rootReducer });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
