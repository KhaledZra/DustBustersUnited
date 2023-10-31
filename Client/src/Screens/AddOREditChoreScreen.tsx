import { useController, useForm } from "react-hook-form";
import { Alert, ScrollView, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { RootStackScreenProps } from "../../types";
import EnergySelector from "../Components/EnergySelector";
import IntervalSelector from "../Components/IntervalSelector";
import { Chore } from "../Data/Chore";
import { useAppDispatch, useAppSelector } from "../store";
import {
  deleteChore,
  saveChoreToDb,
  updateChore,
} from "../store/choreSlice/thunks";
import { selectActiveHouseholdId } from "../store/householdSlice";
import s from "../utils/globalStyles";

type Props = RootStackScreenProps<"AddOrEditChore">;

export default function AddOrEditChoreScreen({ route, navigation }: Props) {
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

  const onSubmit = (chore: Chore) => {
    console.log(chore);
    if (isEdit) {
      dispatch(updateChore(chore));
    } else {
      const newChore = { ...chore, householdId };
      dispatch(saveChoreToDb(newChore));
    }
    navigation.pop();
  };

  return (
    <View style={s.flex1}>
      <ScrollView contentContainerStyle={[s.pt15, s.ph15, s.flex1, s.gap20]}>
        <TextInput
          style={[s.overflowHidden, s.br10, s.boldText]}
          label="Titel"
          underlineColor="transparent"
          multiline
          value={nameField.value}
          onChangeText={nameField.onChange}
        />
        <TextInput
          style={[s.overflowHidden, s.br10, s.boldText]}
          label="Beskrivning"
          underlineColor="transparent"
          multiline
          value={descriptionField.value}
          onChangeText={descriptionField.onChange}
          {...register("description")}
        />

        <IntervalSelector key="" name="repeatInterval" control={control} />

        <EnergySelector name="energy" control={control} />

        <TextInput
          style={s.boldText}
          label="Tilldela till anvädare: "
          underlineColor="transparent"
        />
        {isEdit && (
          <Button
            icon="trash-can-outline"
            mode="contained"
            buttonColor="red"
            onPress={() => {
              Alert.alert(
                "All statistik gällande sysslan kommer raderas. Vill du arkivera istället?",
                "Är du säker?",
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
                    style: "cancel",
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
