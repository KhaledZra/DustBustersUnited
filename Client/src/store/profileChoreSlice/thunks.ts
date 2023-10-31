import { createAsyncThunk } from "@reduxjs/toolkit";
import { Chore, ChoreCreateDto } from "../../Data/Chore";
import { apiFetch } from "../../utils/apiClient";
import { ProfileChore } from "../../Data/ProfileChore";

export interface ProfileChoreProps {
  householdId: number | undefined;
  startDate: String | undefined;
  endDate: String | undefined;
}

export const getprofileChoreByHouseholdToday = createAsyncThunk<
  ProfileChore[],
  ProfileChoreProps
>("profileChore/getByHouseholdToday", async (profileChoreProps) => {
  const response: Response = await apiFetch(
    `ChoreProfile/GetProfileChoresForHousehold/` +
      profileChoreProps.householdId +
      "?startDate=" +
      profileChoreProps.startDate,
    {},
    {
      method: "GET",
    }
  );
  return response.json() as Promise<ProfileChore[]>;
});
