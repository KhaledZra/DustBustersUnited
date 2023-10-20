import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { Household } from "../Data/Household";
import { mockHousehold } from "../Data/MockData/HouseHoldMockData";
import { User } from "../Data/User";
import { apiFetch } from "../utils/apiClient";

type Payload = { userName: string; password: string };
/**
 * As an example I added a list of users to the state, since we already have that endpoint
 * Todo: remove this and "users" when it's no longer needed
 */
export const loginUser = createAsyncThunk<User, Payload>(
  "loginUser",

  async (payload: Payload) => {
    const response = await apiFetch("User/login", payload); //Ändrade från "/login"
    return response.json();
  }
);

export const registerUser = createAsyncThunk<User, Payload>(
  "registerUser",

  async (payload: Payload) => {
    const response = await apiFetch("User", payload); 
    return response.json();
  }
);

/**
 * Slice to handle "user" state
 */
const userSlice = createSlice({
  name: "user",
  initialState: {
    user: undefined as User | undefined,
    households: [mockHousehold] as Household[],
    isLoading: false,
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(loginUser.rejected, (state) => {
      state.isError = true;
    });

    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    });

    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });

    builder.addCase(registerUser.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default userSlice.reducer;
