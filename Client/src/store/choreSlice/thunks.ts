import { PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Chore, ChoreCreateDto } from "../../Data/Chore";
import { apiFetch, apiSendAudio, apiSendImage } from "../../utils/apiClient";
import { ProfileChore } from "../../Data/ProfileChore";
import { RootState } from "..";
import { getChoreCompletions } from "../profileChoreSlice/thunks";
import todaysDateOnlyAsString from "../../Components/GetTodaysDateOnly";
import { ImagePickerAsset } from "expo-image-picker";

export const saveChoreToDb = createAsyncThunk<Chore, ChoreCreateDto>(
  "user/addChore",
  async (choreDto) => {
    const response: Response = await apiFetch(`chore`, choreDto, {
      method: "POST",
    });
    return response.json() as Promise<Chore>;
  }
);

type ChoreFilesProps = { choreDto: ChoreCreateDto; image: ImagePickerAsset, audioUri: string };
export const saveChoreWithFilesToDb = createAsyncThunk<Chore, ChoreFilesProps>(
  "user/addChoreWithFiles",
  async ({ choreDto, image, audioUri }, { dispatch }) => {
    // Save to Db, retrieve Id
    const { payload: chore } = (await dispatch(
      saveChoreToDb(choreDto)
    )) as PayloadAction<Chore>;

    // Handle image
    const imageResponse: Response = await apiSendImage(
      `Chore/SaveChoreMedia/images/${chore.id}`,
      image
    );
    console.log("response.status", imageResponse.status);
    let imageJson = await imageResponse.json();
    console.log("imageJson", imageJson);

    // Handle Audio
    const audioResponse: Response = await apiSendAudio(
      `Chore/SaveChoreMedia/audio/${chore.id}`,
      audioUri
    );
    console.log("response.status", audioResponse.status);
    let audioJson = await audioResponse.json();
    console.log("audioJson", audioJson);

    return chore;
  }
);

type ChoreImageProps = { choreDto: ChoreCreateDto; image: ImagePickerAsset };
export const saveChoreWithImageToDb = createAsyncThunk<Chore, ChoreImageProps>(
  "user/addChoreWithImage",
  async ({ choreDto, image }, { dispatch }) => {
    // Save to Db, retrieve Id
    const { payload: chore } = (await dispatch(
      saveChoreToDb(choreDto)
    )) as PayloadAction<Chore>;

    // Handle image
    const imageResponse: Response = await apiSendImage(
      `Chore/SaveChoreMedia/images/${chore.id}`,
      image
    );
    console.log("response.status", imageResponse.status);
    let imageJson = await imageResponse.json();
    console.log("imageJson", imageJson);

    return chore;
  }
);

type ChoreAudioProps = { choreDto: ChoreCreateDto; audioUri: string };
export const saveChoreWithAudioToDb = createAsyncThunk<Chore, ChoreAudioProps>(
  "user/addChoreWithAudio",
  async ({ choreDto, audioUri }, { dispatch }) => {
    // Save to Db, retrieve Id
    const { payload: chore } = (await dispatch(
      saveChoreToDb(choreDto)
    )) as PayloadAction<Chore>;

    const response: Response = await apiSendAudio(
      `Chore/SaveChoreMedia/audio/${chore.id}`,
      audioUri
    );

    console.log("response.status", response.status);

    let json = await response.json();
    console.log("json", json);

    return chore;
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
      `Chore/GetChoresByHousehold/` + householdId
    );
    return response.json();
  }
);

export interface MarkChoreProps {
  choreId: number;
  householdId: number | undefined;
}

export const markChoreAsCompleted = createAsyncThunk<
  ProfileChore,
  MarkChoreProps
>("chore/markAsCompleted", async (markChoreProps, { dispatch, getState }) => {
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
  dispatch(
    getChoreCompletions({
      startDate: todaysDateOnlyAsString(),
      endDate: undefined,
    })
  );
  dispatch(getChoresByHousehold(markChoreProps.householdId!));
  return response.json();
});

export const deleteChore = createAsyncThunk<number, Chore>(
  "chore/removeChore",
  async (chore) => {
    const response: Response = await apiFetch(
      "chore?choreId=" + chore.id,
      {},
      { method: "DELETE" }
    );
    return chore.id;
  }
);

export const archiveChore = createAsyncThunk<Chore, Chore>(
  "chore/archiveChore",
  async (chore) => {
    const response: Response = await apiFetch(
      "Chore/ToggleActivity?choreId=" + chore.id,
      {},
      { method: "PUT" }
    );
    return response.json();
  }
);
