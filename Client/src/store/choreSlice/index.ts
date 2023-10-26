import { createSlice } from "@reduxjs/toolkit";
import { Chore } from "../../Data/Chore";
import { saveChoreToDb, updateChore } from "./thunks";

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
    setChore: (state, action) => {
      state.chores = action.payload;
    },
    updateChore: (state, action) => {},
  },

  extraReducers: (builder) => {
    builder.addCase(saveChoreToDb.fulfilled, (state, action) => {
      state.chores.push(action.payload);
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
  },
});

export default choreSlice.reducer;
