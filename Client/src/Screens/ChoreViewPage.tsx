import { View } from "react-native";
import { Button, Card, Text } from "react-native-paper";
import { mockChores } from "../Data/MockData/ChoreMockData";
import { getDaysSinceLastDone } from "./HouseholdScreen";
import { useNavigation } from "@react-navigation/native";

export default function ChoreViewPage() {
  const chore = mockChores[0];

  const test = useNavigation();
  test.setOptions({
    title: chore.name,
  });

  return (
    <View>
      <Card>
        <Card.Content>
          <Text variant="displayMedium">
            Beskrivning: {""}
            {chore.description}
          </Text>
        </Card.Content>
      </Card>
      <Card>
        <Card.Content>
          <Text variant="displayMedium">
            Sist Avklarat: {""}
            {getDaysSinceLastDone(chore.deadline, chore.repeatInterval)}
            {""} dagar sen
          </Text>
        </Card.Content>
      </Card>
      <Card>
        <Card.Content>
          <Text variant="displayMedium">
            Värde: {""}
            {getDaysSinceLastDone(chore.deadline, chore.energy)}
          </Text>
        </Card.Content>
      </Card>
      <View>
        <Button mode="contained" onPress={() => console.log("Avklarat")}>
          Avklarat
        </Button>
      </View>
    </View>
  );
}
