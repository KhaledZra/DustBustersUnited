import { View, StyleSheet, Text, ScrollView } from "react-native";
import { Badge, Button, Card, List, TextInput } from "react-native-paper";
import { getDaysSinceLastDone } from "./HouseholdScreen";
import { mockChores } from "../Data/MockData/ChoreMockData";
import { globalStyle } from "../utils/globalStyles";

export default function EditChoreScreen() {
  const chore = mockChores[0];
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TextInput
          style={[styles.textInput, globalStyle.boldText]}
          label="Titel"
          underlineColor="transparent"
        />
        <TextInput
          style={[styles.textInput, globalStyle.boldText]}
          underlineColor="transparent"
          label="Beskrivning"
          multiline
        />

        <Card>
          <View style={[globalStyle.row, globalStyle.justifyBetween, globalStyle.alignCenter, globalStyle.p16]}>
            <Text style={globalStyle.boldText}>Återkommer:</Text>
            <View style={[globalStyle.row, globalStyle.gap2, globalStyle.alignCenter]}>
              <Text>var</Text>
              <Badge style={globalStyle.boldText}>
                {getDaysSinceLastDone(chore.deadline, chore.repeatInterval)}
              </Badge>
              <Text>dag</Text>
            </View>
          </View>
        </Card>

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
          icon="check-outline"
          style={[globalStyle.flex1, globalStyle.radiusNone]}
          mode="contained"
        >
          Spara
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
