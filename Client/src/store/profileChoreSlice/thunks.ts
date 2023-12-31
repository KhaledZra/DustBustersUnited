import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiFetch } from "../../utils/apiClient";
import type { ProfileChore } from "../../Data/ProfileChore";
import { RootState } from "..";
import { selectActiveHouseholdId } from "../householdSlice/selectors";

export interface ProfileChoreProps {
  startDate: String | undefined;
  endDate: String | undefined;
}

export const getChoreCompletions = createAsyncThunk<
  ProfileChore[],
  ProfileChoreProps
>(
  "profileChore/getByHousehold",
  async ({ startDate, endDate }, { getState }) => {
    let endpoint = "ChoreProfile/GetProfileChoresForHousehold";

    let householdId = selectActiveHouseholdId(getState() as RootState);

    let query = startDate || endDate ? "?" : "";

    if (startDate) query += `startDate=${startDate}`;
    if (startDate && endDate) query += "&";
    if (endDate) query += `endDate=${endDate}`;

    const url = `${endpoint}/${householdId}${query}`;
    const response: Response = await apiFetch(url);

    return response.json();
  }
);
