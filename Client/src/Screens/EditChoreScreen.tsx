import { useController, useForm } from "react-hook-form";
import { ScrollView, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import IntervalSelector from "../Components/IntervalSelector";
import { Chore } from "../Data/Chore";
import s from "../utils/globalStyles";
import EnergySelector from "../Components/EnergySelector";
import { RootStackScreenProps } from "../../types";

type Props = RootStackScreenProps<"EditChore">;

export default function AddChoreScreen({ route }: Props) {
  const { chore } = route.params;

  const { handleSubmit, register, control } = useForm<Chore>({
    defaultValues: chore,
  });

  const { field: nameField } = useController({ control, name: "name" });

  const saveChore = (chore: Chore) => {
    console.log(chore);
  };

  return (
    <View style={s.flex1}>
      <ScrollView contentContainerStyle={[s.pt15, s.ph15, s.flex1, s.gap20]}>
        <TextInput
          style={[s.overflowHidden, s.br10, s.boldText]}
          label="Titel"
          underlineColor="transparent"
          multiline
          value={chore.name}
          onChangeText={nameField.onChange}
        />
        <TextInput
          style={[s.overflowHidden, s.br10, s.boldText]}
          label="Beskrivning"
          underlineColor="transparent"
          multiline
          value={chore.description}
          onChangeText={nameField.onChange}
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
          onPress={handleSubmit(saveChore)}
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
