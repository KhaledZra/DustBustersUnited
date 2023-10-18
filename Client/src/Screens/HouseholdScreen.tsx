import { FlatList, StyleSheet, View } from "react-native";
import { Appbar, Card, Text } from "react-native-paper";

import { Chore } from "../Data/Chore";
import { mockChores } from "../Data/MockData/ChoreMockData";

// TODO Remove this comment later:
// alternative soluton if appbar causes issues - https://www.npmjs.com/package/react-native-pager-view

export const getDaysSinceLastDone = (deadline: Date, interval: number) => {
  // Setup lastDone
  const lastDone = new Date(deadline);
  lastDone.setDate(deadline.getDate() - interval);

  // Date now
  const dateNow = new Date(); // in the future use this to adjust the date so calender can be supported

  // Calculate time difference
  const timeDifference = dateNow.getTime() - lastDone.getTime();

  // Calculate days difference by dividing total milliseconds in a day
  const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

  return Math.floor(daysDifference); // Current day progress is not relevant?
};

function HeaderBar() {
  return (
    <Appbar.Header statusBarHeight={0}>
      <Appbar.BackAction
        onPress={() => {
          console.log("day before navigation");
        }}
      />
      <Appbar.Content
        title="Day-Placeholder"
        titleStyle={{ textAlign: "center" }}
      />
      <Appbar.Action
        icon="arrow-right"
        onPress={() => {
          console.log("day after navigation");
        }}
      />
    </Appbar.Header>
  );
}

interface displayDaysProps {
  daysSinceDone: number;
  interval: number;
}

function DisplayDaysSinceDone({ daysSinceDone, interval }: displayDaysProps) {
  if (daysSinceDone < interval) {
    return (
      <View style={styles.circle}>
        <Text
          variant="labelLarge"
          style={{ color: "white", textAlign: "center" }}
        >
          {daysSinceDone}
        </Text>
      </View>
    );
  } else {
    return (
      <View style={styles.errorCircle}>
        <Text
          variant="labelLarge"
          style={{ color: "white", textAlign: "center" }}
        >
          {daysSinceDone}
        </Text>
      </View>
    );
  }
}

function ChoreView(chore: Chore) {
  return (
    <Card
      mode="outlined"
      style={styles.card}
      onPress={() => console.log("Navigating to choreid: " + chore.id)}
    >
      <Card.Content style={styles.content}>
        <Text variant="labelLarge">{chore.name}</Text>
        <DisplayDaysSinceDone
          daysSinceDone={getDaysSinceLastDone(
            chore.deadline,
            chore.repeatInterval
          )}
          interval={chore.repeatInterval}
        />
      </Card.Content>
    </Card>
  );
}

export default function HouseholdScreen() {
  return (
    <View>
      <HeaderBar />
      <FlatList
        data={mockChores}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ChoreView {...item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  surface: {
    padding: 8,
    margin: 8,
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    margin: 8
  },
  content: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  circle: {
    backgroundColor: "grey",
    width: 25,
    height: 22,
    borderRadius: 50,
  },
  errorCircle: {
    backgroundColor: "red",
    width: 25,
    height: 22,
    borderRadius: 50,
  },
});
