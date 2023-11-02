import { createSlice } from "@reduxjs/toolkit";
import type { ProfileChore } from "../../Data/ProfileChore";
import { getChoreCompletions } from "./thunks";

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
    clearChoreProfiles: (state) => {
      state.profileChores = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getChoreCompletions.fulfilled, (state, action) => {
      state.profileChores = action.payload;
    });
  },
});

export const { clearChoreProfiles } = choreSlice.actions;
export default choreSlice.reducer;
