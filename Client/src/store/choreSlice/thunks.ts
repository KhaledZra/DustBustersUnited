import { createAsyncThunk } from "@reduxjs/toolkit";
import { Chore, ChoreCreateDto } from "../../Data/Chore";
import { apiFetch } from "../../utils/apiClient";

export const saveChoreToDb = createAsyncThunk<Chore, ChoreCreateDto>(
  "user/addChore",
  async (choreDto) => {
    const response: Response = await apiFetch(`chore/PostChore`, choreDto);
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
