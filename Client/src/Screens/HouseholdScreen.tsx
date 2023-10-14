import { FlatList, StyleSheet, View } from "react-native";
import { Button, Card, List, Surface, Text } from "react-native-paper";
import { mockChores } from "../Data/MockData/ChoreMockData";
import { Chore } from "../Data/Chore";

const getDaysSinceLastDone = (deadline: Date, interval: number) => {
  // Setup lastDone
  const lastDone = new Date(deadline);
  lastDone.setDate(deadline.getDate() - interval);

  // Date now
  const dateNow = new Date();

  // Calculate time difference
  const timeDifference = dateNow.getTime() - lastDone.getTime();

  // Calculate days difference by dividing total milliseconds in a day
  const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

  return Math.floor(daysDifference); // Current day progress is not relevant?
};

function ChoreView(chore: Chore) {
  return (
    <Card
      mode="outlined"
      style={styles.card}
      onPress={() => console.log("Navigating to choreid: " + chore.id)}
    >
      <Card.Content style={styles.content}>
        <Text variant="displayLarge">{chore.name}</Text>
        <Text variant="displayLarge">
          {getDaysSinceLastDone(chore.deadline, chore.repeatInterval)}
        </Text>
      </Card.Content>
    </Card>
  );
}

export default function HouseholdScreen() {
  return (
    <View>
      <FlatList
        data={mockChores}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ChoreView {...item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  surface: {
    padding: 8,
    margin: 8,
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    margin: 8,
  },
  content: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
