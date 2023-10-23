import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Badge, Button, Card, TextInput } from "react-native-paper";
import { mockChores } from "../Data/MockData/ChoreMockData";
import s from "../utils/globalStyles";
import { getDaysSinceLastDone } from "./HouseholdScreen";

export default function AddChoreScreen() {
  const chore = mockChores[0];
  return (
    <View style={s.flex1}>
      <ScrollView contentContainerStyle={[s.pt15, s.ph15, s.flex1, s.gap20]}>
        <TextInput
          style={[s.overflowHidden, s.br10, s.boldText]}
          label="Titel"
          underlineColor="transparent"
        />
        <TextInput
          style={[s.overflowHidden, s.br10, s.boldText]}
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
