import { createSlice } from "@reduxjs/toolkit";
import { ProfileChore } from "../../Data/ProfileChore";
import { getprofileChoreByHouseholdToday } from "./thunks";
import { RootState } from "..";

type ProfileChoreState = {
  profileChores: ProfileChore[];
};

const initialState: ProfileChoreState = {
  profileChores: [],
};

const choreSlice = createSlice({
  name: "chore",
  initialState,
  reducers: {
    setChore: (state, action) => {},
    updateChore: (state, action) => {},
  },

  extraReducers: (builder) => {
    builder.addCase(getprofileChoreByHouseholdToday.fulfilled, (state, action) => {
        state.profileChores = action.payload;
      });
  },
});

export default choreSlice.reducer;

export const selectProfileChores = (state: RootState) => state.profileChore.profileChores;
