import { createAsyncThunk } from "@reduxjs/toolkit";
import { Chore, ChoreCreateDto } from "../../Data/Chore";
import { apiFetch } from "../../utils/apiClient";
import { ProfileChore } from "../../Data/ProfileChore";
import { RootState } from "..";

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

export const getChores = createAsyncThunk<Chore[], void>(
  "user/getChore",
  async () => {
    const response: Response = await apiFetch(
      `chore`,
      {},
      {
        method: "GET",
      }
    );
    return response.json() as Promise<Chore[]>;
  }
);

export const markChoreAsCompleted = createAsyncThunk<ProfileChore, number>(
  "chore/markAsCompleted",
  async (choreId, { dispatch, getState }) => {
    const response: Response = await apiFetch(
      "ChoreProfile/TriggerCompletedChoreEvent",
      {
        profileId: (getState() as RootState).user.activeProfileId,
        choreId: choreId,
      },
      {
        method: "PUT",
      }
    );
    dispatch(getChores());
    return response.json() as Promise<ProfileChore>;
  }
);
