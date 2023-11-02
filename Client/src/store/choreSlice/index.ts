import { createSlice } from "@reduxjs/toolkit";
import { Chore } from "../../Data/Chore";
import {
  archiveChore,
  deleteChore,
  getChoresByHousehold,
  saveChoreToDb,
  updateChore,
} from "./thunks";

type UserState = {
  chores: Chore[];
};

const initialState: UserState = {
  chores: [],
};

const choreSlice = createSlice({
  name: "chore",
  initialState,
  reducers: {
    clearChores: (state) => {
      state.chores = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(saveChoreToDb.fulfilled, (state, action) => {
      const chore = action.payload;
      const choreIndex = state.chores.findIndex(
        (chore) => chore.id === action.payload.id
      );
      if (choreIndex === -1) {
        state.chores.push(chore);
      }
    });
    builder.addCase(getChoresByHousehold.fulfilled, (state, action) => {
      state.chores = action.payload;
    });
    builder.addCase(updateChore.fulfilled, (state, action) => {
      const updatedChore = action.payload;
      const choreIndex = state.chores.findIndex(
        (chore) => chore.id === updatedChore.id
      );
      if (choreIndex !== -1) {
        state.chores[choreIndex] = updatedChore;
      }
    });
    builder.addCase(deleteChore.fulfilled, (state, action) => {
      state.chores = state.chores.filter(
        (chore) => chore.id !== action.payload
      );
    });
    builder.addCase(archiveChore.fulfilled, (state, action) => {
      state.chores = state.chores.filter(
        (chore) => chore.id !== action.payload.id
      );
    });
  },
});

export const { clearChores } = choreSlice.actions;
export default choreSlice.reducer;
