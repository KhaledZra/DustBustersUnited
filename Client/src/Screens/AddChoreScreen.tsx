import { useController, useForm } from "react-hook-form";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Badge, Button, Card, TextInput } from "react-native-paper";
import IntervalSelector from "../Components/IntervalSelector";
import { Chore } from "../Data/Chore";
import { mockChores } from "../Data/MockData/ChoreMockData";
import { globalStyle } from "../utils/globalStyles";
import { getDaysSinceLastDone } from "./ChoreListScreen";

export default function AddChoreScreen() {
  const chore = mockChores[0];

  const { handleSubmit, register, control } = useForm<Chore>({
    defaultValues: chore
  })
  const { field: nameField } = useController({ control, name: 'name' })

  const saveChore = (chore: Chore) => {
    console.log(chore)
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TextInput
          style={[styles.textInput, globalStyle.boldText]}
          label="Titel"
          underlineColor="transparent"
          value={nameField.value}
          onChangeText={nameField.onChange}
          onBlur={nameField.onBlur}
        />
        <TextInput
          style={[styles.textInput, globalStyle.boldText]}
          underlineColor="transparent"
          label="Beskrivning"
          multiline
          {...register('description')}
        />

        <IntervalSelector
          name="repeatInterval"
          control={control}
        />

        <Card>
          <View style={[globalStyle.row, globalStyle.justifyBetween, globalStyle.alignCenter, globalStyle.p16]}>
            <Text style={globalStyle.boldText}>Värde:</Text>
            <Text>Hur energikrävande är sysslan?</Text>
            <View style={[globalStyle.row, globalStyle.gap2, globalStyle.alignCenter]}>
              <Badge style={styles.badeStyle}>
                {getDaysSinceLastDone(chore.deadline, chore.energy)}
              </Badge>
            </View>
          </View>
        </Card>

        <TextInput
          style={globalStyle.boldText}
          label="Tilldela till anvädare: "
          underlineColor="transparent"
        />
      </ScrollView>
      <View style={[globalStyle.row, globalStyle.gap1]}>
        <Button
          icon="plus-circle-outline"
          style={[globalStyle.flex1, globalStyle.radiusNone]}
          mode="contained"
          onPress={handleSubmit(saveChore)}
        >
          Skapa
        </Button>
        <Button
          icon="close-circle-outline"
          style={[globalStyle.flex1, globalStyle.radiusNone]}
          mode="contained"
        >
          Stäng
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingTop: 15,
    paddingHorizontal: 15,
    flex: 1,
    gap: 20,
  },
  textInput: {
    overflow: "hidden",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },

  badeStyle: {
    backgroundColor: "grey",
  },
});
