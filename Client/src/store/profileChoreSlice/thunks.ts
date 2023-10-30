import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiFetch } from "../../utils/apiClient";
import { ProfileChore } from "../../Data/ProfileChore";

export interface ProfileChoreProps {
  householdId: number | undefined;
  startDate: String | undefined;
  endDate: String | undefined;
}

export const getProfileChoreByHousehold = createAsyncThunk<
  ProfileChore[],
  ProfileChoreProps
>(
  "profileChore/getByHousehold",
  async ({ startDate, endDate, householdId }) => {
    let endpoint = "ChoreProfile/GetProfileChoresForHousehold";

    let query = startDate || endDate ? "?" : "";
    if (startDate) query += `startDate=${startDate}`;
    if (endDate) query += `endDate=${endDate}`;

    const url = `${endpoint}/${householdId}${query}`;
    const response: Response = await apiFetch(url);
    return response.json() as Promise<ProfileChore[]>;
  }
);
