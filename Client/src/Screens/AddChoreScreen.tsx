import { useController, useForm } from "react-hook-form";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Badge, Button, Card, TextInput } from "react-native-paper";
import IntervalSelector from "../Components/IntervalSelector";
import { Chore } from "../Data/Chore";
import { mockChores } from "../Data/MockData/ChoreMockData";
import s from "../utils/globalStyles";
import { getDaysSinceLastDone } from "./ChoreListScreen";

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
          value={nameField.value}
          onChangeText={nameField.onChange}
          onBlur={nameField.onBlur}
        />
        <TextInput
          style={[s.overflowHidden, s.br10, s.boldText]}
          underlineColor="transparent"
          label="Beskrivning"
          multiline
          {...register("description")}
        />

        <IntervalSelector name="repeatInterval" control={control} />

        <Card>
          <View style={[s.row, s.justifyBetween, s.alignCenter, s.p16]}>
            <Text style={s.boldText}>Värde:</Text>
            <Text>Hur energikrävande är sysslan?</Text>
            <View style={[s.row, s.gap2, s.alignCenter]}>
              <Badge style={s.bgColGrey}>
                {getDaysSinceLastDone(chore.deadline, chore.energy)}
              </Badge>
            </View>
          </View>
        </Card>

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
