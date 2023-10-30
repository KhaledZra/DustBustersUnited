import { createSlice } from "@reduxjs/toolkit";
import { ProfileChore } from "../../Data/ProfileChore";
import { getProfileChoreByHousehold } from "./thunks";
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
    builder.addCase(getProfileChoreByHousehold.fulfilled, (state, action) => {
        state.profileChores = action.payload;
      });
  },
});

export default choreSlice.reducer;

export const selectProfileChores = (state: RootState) => state.profileChore.profileChores;
