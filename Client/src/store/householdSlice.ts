import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { RootState } from ".";
import { Household } from "../Data/Household";
import { AddHouseholdDTO } from "../Data/Household";
import { Profile } from "../Data/Profile";
import { apiFetch } from "../utils/apiClient";
import { setActiveProfile } from "./userSlice";
import { fetchProfiles } from "./userSlice/thunks";

// Borde vara i en ny profile slice
export const getHouseholdProfiles = createAsyncThunk<Profile[], void>(
  "profile/getHouseholdProfiles",
  async (_, { getState }) => {
    const householdId = selectActiveHouseholdId(getState() as RootState);
    const response: Response = await apiFetch(
      `Profile/GetProfilesInHousehold/` + householdId
    );
    return response.json();
  }
);

export const fetchTransientHousehold = createAsyncThunk<Household, string>(
  "fetchTransientHousehold",
  async (code: string) => {
    const response: Response = await apiFetch(`Household/ByCode/${code}`);
    return response.json();
  }
);

export const setActiveStatus = createAsyncThunk<Profile[], number>(
  "setActiveStatus",
  async (profileId, { dispatch }) => {
    const response: Response = await apiFetch(
      `Profile/ToggleProfileActive?profileId=${profileId}`,
      {},
      { method: "PUT" }
    );
    dispatch(getHouseholdProfiles());
    let json = await response.json();
    return json;
  }
);

export const setAdminStatus = createAsyncThunk<Profile[], number>(
  "setAdminStatus",
  async (profileId, { dispatch }) => {
    const response: Response = await apiFetch(
      `Profile/ToggleProfileAdmin?profileId=${profileId}`,
      {},
      { method: "PUT" }
    );
    dispatch(getHouseholdProfiles());
    let json = await response.json();
    return json;
  }
);

export const deleteProfile = createAsyncThunk<Profile[]>(
  "deleteProfile",
  async (_: void, { getState, dispatch }) => {
    const profileId = (getState() as RootState).user.activeProfileId;
    const response: Response = await apiFetch(
      `Profile/DeleteHousehold`,
      { profileId },
      { method: "DELETE" }
    );
    dispatch(setActiveProfile(undefined));
    dispatch(getHouseholdProfiles());
    let json = await response.json();
    return json;
  }
);

export const adminDeleteProfile = createAsyncThunk<Profile[], number>(
  "adminDeleteProfile",
  async (profileId, { dispatch }) => {
    const response: Response = await apiFetch(
      `Profile/DeleteProfile/${profileId}`,
      {},
      { method: "DELETE" }
    );
    dispatch(setActiveProfile(undefined));
    dispatch(getHouseholdProfiles());
    let json = await response.json();
    return json;
  }
);

export const setRequestStatus = createAsyncThunk<Profile[], number>(
  "setRequestStatus",
  async (profileId, { dispatch }) => {
    const response: Response = await apiFetch(
      `Profile/ToggleProfileRequest?profileId=${profileId}`,
      {},
      { method: "PUT" }
    );
    dispatch(getHouseholdProfiles());
    let json = await response.json();
    console.log("setRequestStatus", json);
    return json;
  }
);

export const addHousehold = createAsyncThunk<Household, AddHouseholdDTO>(
  "createHousehold",

  async (payload: AddHouseholdDTO) => {
    const response = await apiFetch("Household", payload);
    const jsonResponse = await response.json();
    return jsonResponse;
  }
);

export const updateHouseholdName = createAsyncThunk<Household, Household>(
  "updateHouseholdName",
  async (payload, { dispatch }) => {
    const response: Response = await apiFetch(`Household/update`, payload, {
      method: "PUT",
    });
    dispatch(fetchProfiles());
    return response.json();
  }
);

export type Avatar = { id: number; avatar: string; color: string };
const householdSlice = createSlice({
  name: "household",
  initialState: {
    // All households the user is a member of
    households: [] as Household[],
    profilesInHousehold: [] as Profile[],
    // The household we are about to join
    transientHousehold: undefined as Household | undefined,
  },
  reducers: {
    clearTransientHousehold: (state) => {
      state.transientHousehold = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getHouseholdProfiles.fulfilled, (state, action) => {
      state.profilesInHousehold = action.payload;
    });
    builder.addCase(fetchTransientHousehold.fulfilled, (state, action) => {
      state.transientHousehold = action.payload;
    });
    builder.addCase(addHousehold.fulfilled, (state, action) => {
      state.households.push(action.payload);
    });
  },
});

export const { clearTransientHousehold } = householdSlice.actions;
export default householdSlice.reducer;

export const selectActiveHouseholdId = (state: RootState) =>
  state.user.profiles.find((p) => p.id === state.user.activeProfileId)
    ?.household.id!;

export const selectActiveHousehold = (state: RootState) =>
  state.user.profiles.find((p) => p.id === state.user.activeProfileId)
    ?.household;

export const selectHouseholdProfiles = (state: RootState) =>
  state.household.profilesInHousehold;

export const selectRequestProfiles = createSelector(
  (state: RootState) => state.household.profilesInHousehold,
  (profiles) => profiles.filter((p) => p.isRequest)
);

export const selectProfiles = createSelector(
  (state: RootState) => state.household.profilesInHousehold,
  (profiles) => profiles.filter((p) => !p.isRequest)
);
