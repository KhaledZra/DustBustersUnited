import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";
import { Household, uppdateHouseholdDTO } from "../Data/Household";
import { AddHouseholdDTO } from "../Data/Household";
import { Profile } from "../Data/Profile";
import { apiFetch } from "../utils/apiClient";
import { setActiveProfile } from "./userSlice";
import { fetchProfiles } from "./userSlice/thunks";

// Borde vara i en ny profile slice
export const getHouseholdProfiles = createAsyncThunk<Profile[], number>(
  "profile/getHouseholdProfiles",
  async (householdId: number) => {
    const response: Response = await apiFetch(
      `Profile/GetProfilesInHousehold/` + householdId
    );
    return response.json() as Promise<Profile[]>;
  }
);

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

export const setRequestStatus = createAsyncThunk<Profile[]>(
  "setRequestStatus",
  async (_: void, { getState, dispatch }) => {
    const profileId = (getState() as RootState).user.activeProfileId;
    const response: Response = await apiFetch(
      `Profile/ToggleProfileRequest`,
      { profileId },
      { method: "PUT" }
    );
    dispatch(fetchProfiles());
    let json = await response.json();
    console.log(json);
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

export const updateHouseholdName = createAsyncThunk<Household, uppdateHouseholdDTO>(
  "updateHouseholdName",

  async (payload) => {
    const response: Response = await apiFetch(`Household/update`, payload, {
      method: 'PUT',
    });
    const jsonResponse = await response.json();
    console.log("update payload:", payload)
    console.log("update json:", jsonResponse)
    return jsonResponse as Promise<Household>;
  }
)

export type Avatar = { id: number; avatar: string; color: string };
const householdSlice = createSlice({
  name: "household",
  initialState: {
    // All households the user is a member of
    households: [] as Household[],
    profiles: [] as Profile[],
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
    builder.addCase(fetchProfiles.fulfilled, (state, action) => {
      state.profiles = action.payload;
    });
    builder.addCase(addHousehold.fulfilled, (state, action) => {
      state.households.push(action.payload);
    });
    builder.addCase(updateHouseholdName.fulfilled, (state, action) => {
      const updatedHousehold = action.payload;
      const index = updatedHousehold.id
      state.households[index] = updatedHousehold;
    })
  },
});

export const { clearTransientHousehold } = householdSlice.actions;
export default householdSlice.reducer;

export const selectActiveHouseholdId = (state: RootState) =>
  state.user.profiles.find((p) => p.id === state.user.activeProfileId)
    ?.household.id!;

export const selectHouseholdProfiles = (state: RootState) =>
  state.household.profilesInHousehold;
