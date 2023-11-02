import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

import userSlice, { setActiveProfile, setUser } from "./userSlice";
import choreNavigationSlice from "./choreNavigationSlice";
import householdSlice from "./householdSlice";
import { storageKeys } from "../constants";
import choreSlice from "./choreSlice";
import profileChoreSlice from "./profileChoreSlice";
import { User } from "../Data/User";

const store = configureStore({
  reducer: {
    user: userSlice,
    household: householdSlice,
    chore: choreSlice,
    choreNavigation: choreNavigationSlice,
    profileChore: profileChoreSlice,
  },
});

InitializeFromStorage();

async function InitializeFromStorage() {
  const profileId = await AsyncStorage.getItem(storageKeys.ACTIVE_PROFILE_ID);
  if (profileId) {
    store.dispatch(setActiveProfile(parseInt(profileId)));
  }

  let userStr = await AsyncStorage.getItem(storageKeys.LOGGED_IN_USER);
  if (!userStr) return;

  // We take extra steps to ensure we have a valid user in storage
  let user = JSON.parse(userStr) as User;
  if (user && user.id && Number.isInteger(user.id)) {
    store.dispatch(setUser(user));
  } else {
    AsyncStorage.removeItem(storageKeys.LOGGED_IN_USER);
  }
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
