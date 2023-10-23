import { createSlice } from "@reduxjs/toolkit";

import { Profile } from "../../Data/Profile";
import { User } from "../../Data/User";
import { fetchProfiles, joinHousehold, login, register } from "./thunks";

type UserState = {
  user: User | undefined;
  profiles: Profile[];
  activeProfileId: number | undefined;
  isLoading: boolean;
  loginError: string | undefined;
  joinHouseholdError: string | undefined;
  isError: boolean;
};

const initialState: UserState = {
  user: undefined,
  profiles: [],
  activeProfileId: undefined,
  loginError: undefined,
  joinHouseholdError: undefined,
  isLoading: false,
  isError: false,
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
      state.profiles = action.payload;
    });
  },
});

export const { setUser, setActiveProfile, setLoginError } = userSlice.actions;
export default userSlice.reducer;