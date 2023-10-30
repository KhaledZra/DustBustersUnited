import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";
import { Household } from "../Data/Household";
import { AddHouseholdDTO } from "../Data/Household";
import { Profile } from "../Data/Profile";
import { apiFetch } from "../utils/apiClient";
import { setActiveProfile } from "./userSlice";
import { fetchProfiles } from "./userSlice/thunks";

export const fetchTransientHousehold = createAsyncThunk<Household, string>(
  "fetchTransientHousehold",
  async (code: string) => {
    const response: Response = await apiFetch(`Household/ByCode/${code}`);
    return response.json();
  }
);

export const setActiveStatus = createAsyncThunk<Profile[]>(
  "setActiveStatus",
  async (_: void, { getState, dispatch }) => {
    const profileId = (getState() as RootState).user.activeProfileId;
    const response: Response = await apiFetch(
      `Profile/ToggleProfileActive`,
      { profileId },
      { method: "PUT" }
    );
    dispatch(fetchProfiles());
    let json = await response.json();
    console.log(json);
    return json;
  }
);

export const setAdminStatus = createAsyncThunk<Profile[]>(
  "setAdminStatus",
  async (_: void, { getState, dispatch }) => {
    const profileId = (getState() as RootState).user.activeProfileId;
    const response: Response = await apiFetch(
      `Profile/ToggleProfileAdmin`,
      { profileId },
      { method: "PUT" }
    );
    dispatch(fetchProfiles());
    let json = await response.json();
    console.log(json);
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
    dispatch(fetchProfiles());
    let json = await response.json();
    return json;
  }
);

export const addHousehold = createAsyncThunk<Household, AddHouseholdDTO>(
  "createHousehold",

  async (payload: AddHouseholdDTO) => {
    console.log("DTO ", payload);
    const response = await apiFetch("Household", payload);
    const jsonResponse = await response.json();
    console.log("response", jsonResponse);

    return jsonResponse;
  }
);

export type Avatar = { id: number; avatar: string; color: string };
const householdSlice = createSlice({
  name: "household",
  initialState: {
    // All households the user is a member of
    households: [] as Household[],
    profiles: [] as Profile[],
    // The household we are about to join
    transientHousehold: undefined as Household | undefined,
    avatars: Object.freeze([
      { id: 1, avatar: "🐱", color: "#ffb02e" },
      { id: 2, avatar: "🐶", color: "#ff7f50" },
      { id: 3, avatar: "🐭", color: "#ff6b81" },
      { id: 4, avatar: "🐹", color: "#ff4757" },
      { id: 5, avatar: "🐰", color: "#7bed9f" },
      { id: 6, avatar: "🦊", color: "#70a1ff" },
      { id: 7, avatar: "🐻", color: "#5352ed" },
      { id: 8, avatar: "🐼", color: "#2ed573" },
    ]),
  },
  reducers: {
    clearTransientHousehold: (state) => {
      state.transientHousehold = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTransientHousehold.fulfilled, (state, action) => {
      state.transientHousehold = action.payload;
    });
    builder.addCase(fetchProfiles.fulfilled, (state, action) => {
      state.profiles = action.payload;
    });
    builder.addCase(addHousehold.fulfilled, (state, action) => {
      state.households.push(action.payload);
    });
  },
});

export const { clearTransientHousehold } = householdSlice.actions;
export default householdSlice.reducer;

export const selectActiveHousehold = (state: RootState) =>
  state.user.profiles.find((p) => p.id === state.user.activeProfileId)
    ?.household.id!;

export const selectHouseholdProfiles = (state: RootState) =>
  state.household.profiles;
