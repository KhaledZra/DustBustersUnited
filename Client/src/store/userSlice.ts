import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { apiFetch } from "../utils/apiClient";
import { mockHousehold } from "../Data/MockData/HouseHoldMockData";
import { User } from "../Data/User";
import { Household } from "../Data/Household";

/**
 * As an example I added a list of users to the state, since we already have that endpoint
 * Todo: remove this and "users" when it's no longer needed
 */
export const fetchUsers = createAsyncThunk("fetchUsers", async () => {
  const response = await apiFetch("/user");
  return response.json();
  // The stuff we return here will become the action.payload
});

/**
 * Slice to handle "user" state
 */
const userSlice = createSlice({
  name: "user",
  initialState: {
    households: [mockHousehold] as Household[],
    isLoading: false,
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.households = [...action.payload];
    });
    builder.addCase(fetchUsers.rejected, (state) => {
      state.isError = true;
    });
  },
});

export default userSlice.reducer;
