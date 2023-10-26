import { useController, useForm } from "react-hook-form";
import { ScrollView, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import IntervalSelector from "../Components/IntervalSelector";
import { ChoreDto } from "../Data/Chore";
import s from "../utils/globalStyles";
import EnergySelector from "../Components/EnergySelector";
import { useAppDispatch, useAppSelector } from "../store";
import { saveChoreToDb } from "../store/userSlice/thunks";
import { RootStackScreenProps } from "../../types";

type Props = RootStackScreenProps<"AddChore">;

export default function AddChoreScreen({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const userSlice = useAppSelector((state) => state.user);

  const activeProfile = userSlice.profiles.find(
    (u) => (u.id = userSlice.activeProfileId!)
  );

  const choreDto: ChoreDto = {
    description: "",
    energy: 0,
    name: "",
    repeatInterval: 0,
    householdId: activeProfile!.household.id,
  };

  const { handleSubmit, register, control } = useForm<ChoreDto>({
    defaultValues: choreDto,
  });
  const { field: nameField } = useController({ control, name: "name" });
  const { field: descriptionField } = useController({
    control,
    name: "description",
  });

  const saveChore = (choreDto: ChoreDto) => {
    dispatch(saveChoreToDb(choreDto));

    if (navigation.canGoBack()) navigation.goBack();
    else navigation.navigate("ChoreList");
  };

  return (
    <View style={s.flex1}>
      <ScrollView contentContainerStyle={[s.pt15, s.ph15, s.flex1, s.gap20]}>
        <TextInput
          style={[s.overflowHidden, s.br10, s.boldText]}
          label="Titel"
          underlineColor="transparent"
          multiline
          // value={nameField.value}
          onChangeText={nameField.onChange}
          onBlur={nameField.onBlur}
        />
        <TextInput
          style={[s.overflowHidden, s.br10, s.boldText]}
          label="Beskrivning"
          underlineColor="transparent"
          multiline
          onChangeText={descriptionField.onChange}
        />

        <IntervalSelector name="repeatInterval" control={control} />

        <EnergySelector name="energy" control={control} />

        <TextInput
          style={s.boldText}
          label="Tilldela till anvädare: "
          underlineColor="transparent"
        />
      </ScrollView>
      <View style={[s.row, s.gap1]}>
        <Button
          icon="plus-circle-outline"
          style={[s.flex1, s.radiusNone]}
          mode="contained"
          onPress={handleSubmit(saveChore)}
        >
          Skapa
        </Button>
        <Button
          icon="close-circle-outline"
          style={[s.flex1, s.radiusNone]}
          mode="contained"
        >
          Stäng
        </Button>
      </View>
    </View>
  );
}
