import { createAsyncThunk } from "@reduxjs/toolkit";
import { Chore, ChoreCreateDto } from "../../Data/Chore";
import { apiFetch } from "../../utils/apiClient";
import { ProfileChore } from "../../Data/ProfileChore";
import { RootState } from "..";
import { ProfileChoreProps, getProfileChoreByHousehold } from "../profileChoreSlice/thunks";
import todaysDateOnlyAsString from "../../Components/GetTodaysDateOnly";

export const saveChoreToDb = createAsyncThunk<Chore, ChoreCreateDto>(
  "user/addChore",
  async (choreDto) => {
    const response: Response = await apiFetch(`chore`, choreDto, {
      method: "POST",
    });
    return response.json() as Promise<Chore>;
  }
);

export const updateChore = createAsyncThunk<Chore, Chore>(
  "user/editChore",
  async (chore) => {
    const response: Response = await apiFetch(`chore`, chore, {
      method: "PUT",
    });
    return response.json() as Promise<Chore>;
  }
);

export const getChoresByHousehold = createAsyncThunk<Chore[], number>(
  "user/getChoresByHousehold",
  async (householdId: number) => {
    const response: Response = await apiFetch(
      `Chore/GetChoresByHousehold/` + householdId,
      {},
      {
        method: "GET",
      }
    );
    return response.json() as Promise<Chore[]>;
  }
);

export interface MarkChoreProps {
  choreId: number,
  householdId: number | undefined,
}

export const markChoreAsCompleted = createAsyncThunk<ProfileChore, MarkChoreProps>(
  "chore/markAsCompleted",
  async (markChoreProps, { dispatch, getState }) => {
    const response: Response = await apiFetch(
      "ChoreProfile/TriggerCompletedChoreEvent",
      {
        profileId: (getState() as RootState).user.activeProfileId,
        choreId: markChoreProps.choreId,
      },
      {
        method: "PUT",
      }
    );
    const pcProps: ProfileChoreProps = {
      householdId: markChoreProps.householdId,
      startDate: todaysDateOnlyAsString(),
      endDate: undefined
    };
    dispatch(getProfileChoreByHousehold(pcProps));
    dispatch(getChoresByHousehold(markChoreProps.householdId!));
    return response.json() as Promise<ProfileChore>;
  }
);
