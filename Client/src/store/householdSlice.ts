import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Household } from "../Data/Household";
import { apiFetch } from "../utils/apiClient";

export const fetchTransientHousehold = createAsyncThunk<Household, string>(
  "fetchTransientHousehold",
  async (code: string) => {
    const response: Response = await apiFetch(`Household/ByCode/${code}`);
    return response.json();
  }
);

export type Avatar = { id: number; avatar: string; color: string };
type HouseholdState = {
  households: Household[]; // All households the user is a member of
  transientHousehold: Household | undefined; // The household we are about to join
  avatars: Avatar[];
};

const householdSlice = createSlice({
  name: "household",
  initialState: {
    households: [],
    transientHousehold: undefined,
    avatars: [
      { id: 1, avatar: "🐱", color: "#ffb02e" },
      { id: 2, avatar: "🐶", color: "#ff7f50" },
      { id: 3, avatar: "🐭", color: "#ff6b81" },
      { id: 4, avatar: "🐹", color: "#ff4757" },
      { id: 5, avatar: "🐰", color: "#7bed9f" },
      { id: 6, avatar: "🦊", color: "#70a1ff" },
      { id: 7, avatar: "🐻", color: "#5352ed" },
      { id: 8, avatar: "🐼", color: "#2ed573" },
    ],
  } as HouseholdState,
  reducers: {
    clearTransientHousehold: (state) => {
      state.transientHousehold = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTransientHousehold.fulfilled, (state, action) => {
      state.transientHousehold = action.payload;
    });
  },
});

export const { clearTransientHousehold } = householdSlice.actions;
export default householdSlice.reducer;
