import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Badge, Button, Card, TextInput } from "react-native-paper";
import { mockChores } from "../Data/MockData/ChoreMockData";
import { s } from "../utils/globalStyles";
import { getDaysSinceLastDone } from "./HouseholdScreen";

export default function AddChoreScreen() {
  const chore = mockChores[0];
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TextInput
          style={[styles.textInput, s.boldText]}
          label="Titel"
          underlineColor="transparent"
        />
        <TextInput
          style={[styles.textInput, s.boldText]}
          underlineColor="transparent"
          label="Beskrivning"
          multiline
        />

        <Card>
          <View style={[s.row, s.justifyBetween, s.alignCenter, s.p16]}>
            <Text style={s.boldText}>Återkommer:</Text>
            <View style={[s.row, s.gap2, s.alignCenter]}>
              <Text>var</Text>
              <Badge style={s.boldText}>
                {getDaysSinceLastDone(chore.deadline, chore.repeatInterval)}
              </Badge>
              <Text>dag</Text>
            </View>
          </View>
        </Card>

        <Card>
          <View style={[s.row, s.justifyBetween, s.alignCenter, s.p16]}>
            <Text style={s.boldText}>Värde:</Text>
            <Text>Hur energikrävande är sysslan?</Text>
            <View style={[s.row, s.gap2, s.alignCenter]}>
              <Badge style={styles.badeStyle}>
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
