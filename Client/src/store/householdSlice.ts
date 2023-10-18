import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Household } from "../Data/Household";
import { apiFetch } from "../utils/apiClient";

export const fetchTransientHousehold = createAsyncThunk<Household, string>(
  "fetchTransientHousehold",
  async (code: string) => {
    console.log("fetchTransientHousehold", code);
    const response: Response = await apiFetch(`Household/ByCode/${code}`);
    console.log("response:", response.status);
    let json = await response.json();
    console.log("response:", json);
    return json;
  }
);

const userSlice = createSlice({
  name: "household",
  initialState: {
    // All households the user is a member of
    households: [] as Household[],
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
  },
});

export const { clearTransientHousehold } = userSlice.actions;
export default userSlice.reducer;
