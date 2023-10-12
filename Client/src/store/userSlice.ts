import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { apiFetch } from "../utils/apiClient";

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
    users: [] as any[],
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
      state.users = [...action.payload];
    });
    builder.addCase(fetchUsers.rejected, (state) => {
      state.isError = true;
    });
  },
});

export default userSlice.reducer;
