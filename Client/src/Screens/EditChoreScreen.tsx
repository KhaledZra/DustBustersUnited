import { View, StyleSheet, Text, ScrollView } from "react-native";
import { Badge, Button, Card, List, TextInput } from "react-native-paper";
import { getDaysSinceLastDone } from "./ChoreListScreen";
import { mockChores } from "../Data/MockData/ChoreMockData";
import s from "../utils/globalStyles";

export default function EditChoreScreen() {
  const chore = mockChores[0];
  return (
    <View style={s.flex1}>
      <Card style={s.flex1}>
        <Card.Content style={s.gap10}>
          <TextInput
            style={[
              s.btlr10,
              s.btrr10,
              s.bblr10,
              s.bbrr10,
              s.overflowHidden,
              s.boldText,
            ]}
            label="Titel"
            underlineColor="transparent"
          />
          <TextInput
            style={[s.btlr10, s.btrr10, s.bblr10, s.bbrr10, s.boldText]}
            underlineColor="transparent"
            label="Beskrivning"
            multiline
          />
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
          <View style={[s.row, s.justifyBetween, s.alignCenter, s.p16]}>
            <Text style={s.boldText}>Värde:</Text>
            <Text>Hur energikrävande är sysslan?</Text>
            <View style={[s.row, s.gap2, s.alignCenter]}>
              <Badge style={s.bgColGrey}>
                {getDaysSinceLastDone(chore.deadline, chore.energy)}
              </Badge>
            </View>
          </View>
          <TextInput
            style={[s.boldText]}
            label="Tilldela till anvädare: "
            underlineColor="transparent"
          />
        </Card.Content>
      </Card>

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