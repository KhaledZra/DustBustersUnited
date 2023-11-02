import { createSlice } from "@reduxjs/toolkit";
import { ProfileChore } from "../../Data/ProfileChore";
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
    setChore: (state, action) => {},
    updateChore: (state, action) => {},
  },

  extraReducers: (builder) => {
    builder.addCase(getChoreCompletions.fulfilled, (state, action) => {
      state.profileChores = action.payload;
    });
  },
});

export default choreSlice.reducer;
