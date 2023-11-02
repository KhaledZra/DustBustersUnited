import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk } from "@reduxjs/toolkit";

import type { RootState } from "..";
import type { JoinHouseholdDto } from "../../Data/Household";
import type { Profile } from "../../Data/Profile";
import type { User } from "../../Data/User";
import { storageKeys } from "../../constants";
import { apiFetch } from "../../utils/apiClient";

type LoginPayload = { username: string; password: string };
export const login = createAsyncThunk<User, LoginPayload>(
  "user/login",
  async (payload: LoginPayload, { dispatch, getState }) => {
    dispatch({ type: "user/setLoginError", payload: undefined });
    const response = await apiFetch("User/login", payload);
    let json = await response.json();
    if (json.status && json.status > 400) {
      dispatch({
        type: "user/setLoginError",
        payload: "Inloggningen misslyckades.",
      });
      return undefined;
    }
    const user = json as User;
    AsyncStorage.setItem(storageKeys.LOGGED_IN_USER, JSON.stringify(user));
    dispatch({ type: "user/setUser", payload: user });
    return json;
  }
);

export const logout = createAsyncThunk(
  "user/logout",
  async (_: void, { dispatch }) => {
    AsyncStorage.removeItem(storageKeys.LOGGED_IN_USER);
    AsyncStorage.removeItem(storageKeys.ACTIVE_PROFILE_ID);
    dispatch({ type: "user/setUser", payload: undefined });
    dispatch({ type: "user/setActiveProfile", payload: undefined });
  }
);

export const register = createAsyncThunk<User, LoginPayload>(
  "user/register",
  async (payload: LoginPayload) => {
    const response: Response = await apiFetch("User", payload);
    const user = (await response.json()) as User;
    AsyncStorage.setItem(storageKeys.LOGGED_IN_USER, JSON.stringify(user));
    return user;
  }
);

export const fetchProfiles = createAsyncThunk<Profile[]>(
  "user/fetchProfiles",
  async (_: void, { getState }) => {
    const user = (getState() as RootState).user.user;
    if (!user) return [];
    const response: Response = await apiFetch(`Profile/ByUser/${user.id}`);
    return response.json();
  }
);

export const joinHousehold = createAsyncThunk<
  Profile | undefined,
  JoinHouseholdDto
>(
  "user/joinHousehold",
  async (dto: JoinHouseholdDto, { dispatch, getState, rejectWithValue }) => {
    const user = (getState() as RootState).user.user;
    if (!user) return;

    dto.userId = user.id;

    const response: Response = await apiFetch(`Profile/linkToHousehold`, dto);

    if (response.status >= 400) {
      return rejectWithValue("Kunde inte gå med i hushållet.");
    }

    let profile = (await response.json()) as Profile;
    dispatch(fetchProfiles());
    dispatch({ type: "user/setActiveProfile", payload: profile.id });
    AsyncStorage.setItem(storageKeys.ACTIVE_PROFILE_ID, profile.id.toString());
    return profile;
  }
);
