import { View, StyleSheet, Text, ScrollView } from "react-native";
import { Badge, Button, Card, List, TextInput } from "react-native-paper";
import { getDaysSinceLastDone } from "./HouseholdScreen";
import { mockChores } from "../Data/MockData/ChoreMockData";
import { SafeAreaView } from "react-native-safe-area-context";
import { s } from "../utils/globalStyles";

export default function EditChoreScreen() {
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
          icon="check-outline"
          style={[s.flex1, s.radiusNone]}
          mode="contained"
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
