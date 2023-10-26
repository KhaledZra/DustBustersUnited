import { useController, useForm } from "react-hook-form";
import { ScrollView, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import IntervalSelector from "../Components/IntervalSelector";
import { Chore, ChoreDto } from "../Data/Chore";
import s from "../utils/globalStyles";
import EnergySelector from "../Components/EnergySelector";
import { RootStackScreenProps } from "../../types";
import { useAppDispatch } from "../store";
import { updateChore } from "../store/choreSlice/thunks";

type Props = RootStackScreenProps<"EditChore">;

export default function AddChoreScreen({ route }: Props) {
  const { chore } = route.params;
  const choreDto: ChoreDto = {
    description: chore.description,
    energy: chore.energy,
    name: chore.name,
    repeatInterval: chore.repeatInterval,
    householdId: chore.household.id,
  };

  const dispatch = useAppDispatch();

  const { handleSubmit, register, control } = useForm<Chore>({
    defaultValues: chore,
  });

  const { field: nameField } = useController({ control, name: "name" });
  const { field: descriptionField } = useController({ control, name: "name" });

  const onSubmit = (chore: Chore) => {
    dispatch(updateChore(chore));
    console.log(choreDto);
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
        >
          Stäng
        </Button>
      </View>
    </View>
  );
}
