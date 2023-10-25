import { useController, useForm } from "react-hook-form";
import { ScrollView, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import IntervalSelector from "../Components/IntervalSelector";
import { Chore } from "../Data/Chore";
import { mockChores } from "../Data/MockData/ChoreMockData";
import s from "../utils/globalStyles";
import EnergySelector from "../Components/EnergySelector";

export default function AddChoreScreen() {
  const chore = mockChores[0];

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
          // value={nameField.value}
          onChangeText={nameField.onChange}
          onBlur={nameField.onBlur}
        />
        <TextInput
          style={[s.overflowHidden, s.br10, s.boldText]}
          label="Beskrivning"
          underlineColor="transparent"
          multiline
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
