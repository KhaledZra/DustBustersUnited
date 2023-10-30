import { createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { Chore } from "../../Data/Chore";
import { Profile } from "../../Data/Profile";
import { User } from "../../Data/User";
import { avatars } from "../../constants";
import { fetchProfiles, joinHousehold, login, register } from "./thunks";

type UserState = {
  user: User | undefined;
  profiles: Profile[];
  activeProfileId: number | undefined;
  isLoading: boolean;
  loginError: string | undefined;
  joinHouseholdError: string | undefined;
  isError: boolean;
  chores: Chore[];
};

const initialState: UserState = {
  user: undefined,
  profiles: [],
  activeProfileId: undefined,
  loginError: undefined,
  joinHouseholdError: undefined,
  isLoading: false,
  isError: false,
  chores: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setActiveProfile: (state, action: { payload: number | undefined }) => {
      state.activeProfileId = action.payload;
    },
    setLoginError: (state, action) => {
      state.loginError = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Login
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(login.rejected, (state) => {
      state.isError = true;
    });
    // Register
    builder.addCase(register.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    });
    builder.addCase(register.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(register.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
    // household/profiles
    builder.addCase(joinHousehold.fulfilled, (state, action) => {
      let profile = action.payload as Profile;
      setActiveProfile(profile.id);
    });
    builder.addCase(joinHousehold.pending, (state, action) => {
      state.joinHouseholdError = undefined;
    });
    builder.addCase(joinHousehold.rejected, (state, action) => {
      state.joinHouseholdError = action.payload as string;
    });
    builder.addCase(fetchProfiles.fulfilled, (state, action) => {
      console.log("action.payload", action.payload );
      state.profiles = action.payload;
    });
  },
});

export const selectRequestProfiles = createSelector(
  (state: RootState) => state.user.profiles,
  (profiles) => profiles.filter((p) => p.isRequest)
);

export const selectProfiles = createSelector(
  (state: RootState) => state.user.profiles,
  (profiles) => profiles.filter((p) => !p.isRequest)
);

export const selectActiveProfile = (state: RootState) =>
  state.user.profiles.find((p) => p.id === state.user.activeProfileId);

export const selectActiveAvatar = (state: RootState) => {
  const profile = state.user.profiles.find(
    (p) => p.id === state.user.activeProfileId
  );
  return avatars.find((a) => a.id === profile?.avatar);
};

export const { setUser, setActiveProfile, setLoginError } = userSlice.actions;
export default userSlice.reducer;