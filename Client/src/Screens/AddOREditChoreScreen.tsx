import { useController, useForm } from "react-hook-form";
import { Alert, ScrollView, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { RootStackScreenProps } from "../../types";
import EnergySelector from "../Components/EnergySelector";
import IntervalSelector from "../Components/IntervalSelector";
import { Chore } from "../Data/Chore";
import { useAppDispatch, useAppSelector } from "../store";
import {
  archiveChore,
  deleteChore,
  saveChoreToDb,
  saveChoreWithAudioToDb,
  saveChoreWithFilesToDb,
  saveChoreWithImageToDb,
  updateChore,
} from "../store/choreSlice/thunks";
import { selectActiveHouseholdId } from "../store/householdSlice";
import s from "../utils/globalStyles";
import ImageSelector from "../Components/ImageSelector";
import { useState } from "react";
import { ImagePickerAsset } from "expo-image-picker";
import AudioHandler from "../Components/AudioHandler";
import { Audio } from "expo-av";

type Props = RootStackScreenProps<"AddOrEditChore">;

export default function AddOrEditChoreScreen({ route, navigation }: Props) {
  const [image, setImage] = useState<ImagePickerAsset>();
  const [recordingUri, setRecordingUri] = useState<string>();
  const householdId = useAppSelector(selectActiveHouseholdId);
  const { chore } = route.params;
  const isEdit = Boolean(chore);
  const dispatch = useAppDispatch();
  const { handleSubmit, register, control } = useForm<Chore>({
    defaultValues: chore || {
      description: "",
      energy: 2,
      name: "",
      repeatInterval: 1,
      householdId,
    },
  });

  const { field: nameField } = useController({ control, name: "name" });
  const { field: descriptionField } = useController({
    control,
    name: "description",
  });

  const handleDeleteChore = () => dispatch(deleteChore(chore!));
  const handleArchiveChore = () => dispatch(archiveChore(chore!));

  const onSubmit = (chore: Chore) => {
    if (isEdit) {
      dispatch(updateChore(chore));
    } else {
      const newChore = { ...chore, householdId };
      if (image && recordingUri) {
        dispatch(saveChoreWithFilesToDb({ choreDto: newChore, image: image, audioUri: recordingUri}));
      } else if (image) {
        dispatch(saveChoreWithImageToDb({ choreDto: newChore, image}));
      } else if (recordingUri) {
        dispatch(saveChoreWithAudioToDb({ choreDto: newChore, audioUri: recordingUri}));
      } 
      else {
        dispatch(saveChoreToDb(newChore));
      }
    }
    navigation.pop();
  };

  return (
    <View style={s.flex1}>
      <ScrollView
        contentContainerStyle={[s.pt15, s.ph15, s.flex1, s.gap20, s.mb10]}
      >
        <TextInput
          style={[s.overflowHidden, s.br10, s.boldText]}
          label="Titel"
          underlineColor="transparent"
          multiline
          value={nameField.value}
          onChangeText={nameField.onChange}
          {...register("name", { required: true })}
        />
        <TextInput
          style={[s.overflowHidden, s.br10, s.boldText]}
          label="Beskrivning"
          underlineColor="transparent"
          multiline
          value={descriptionField.value}
          onChangeText={descriptionField.onChange}
          {...register("description", { required: true })}
        />

        <IntervalSelector key="" name="repeatInterval" control={control} />

        <EnergySelector name="energy" control={control} />

        <ImageSelector onImageSelected={(img) => setImage(img)} />

        <AudioHandler onAudioSelected={(audioUri) => setRecordingUri(audioUri)} />

        {isEdit && (
          <Button
            icon="trash-can-outline"
            mode="contained"
            onPress={() => {
              Alert.alert(
                "Är du säker?",
                "All statistik gällande sysslan kommer raderas. Vill du arkivera istället?",
                [
                  {
                    text: "Radera",
                    onPress: () => {
                      handleDeleteChore();
                      navigation.pop();
                    },
                  },
                  {
                    text: "Arkivera",
                    onPress: () => {
                      handleArchiveChore();
                      navigation.pop();
                    },
                  },
                  {
                    text: "Avbryt",
                    style: "cancel",
                  },
                ]
              );
            }}
          >
            Ta bort
          </Button>
        )}
      </ScrollView>
      <View style={[s.row, s.gap1]}>
        <Button
          icon="check-outline"
          style={[s.flex1, s.radiusNone]}
          mode="contained"
          onPress={handleSubmit(onSubmit)}
          disabled={!nameField.value || !descriptionField.value}
        >
          Spara
        </Button>
        <Button
          icon="close-circle-outline"
          style={[s.flex1, s.radiusNone]}
          mode="contained"
          onPress={() => navigation.pop()}
        >
          Stäng
        </Button>
      </View>
    </View>
  );
}
