import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

import userSlice, { setActiveProfile, setUser } from "./userSlice";
import choreNavigationSlice from "./choreNavigationSlice";
import householdSlice from "./householdSlice";
import { storageKeys } from "../constants";
import choreSlice from "./choreSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    household: householdSlice,
    chore: choreSlice,
    choreNavigation: choreNavigationSlice,
  },
});

InitializeFromStorage();

async function InitializeFromStorage() {
  const profileId = await AsyncStorage.getItem(storageKeys.ACTIVE_PROFILE_ID);
  if (profileId) {
    store.dispatch(setActiveProfile(parseInt(profileId)));
  }

  let user = await AsyncStorage.getItem(storageKeys.LOGGED_IN_USER);
  if (user) {
    store.dispatch(setUser(JSON.parse(user)));
  }
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
