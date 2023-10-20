import { Dimensions, FlatList, StyleSheet, View } from "react-native";
import { Appbar, Button, Card, IconButton, Text } from "react-native-paper";

import { RootStackScreenProps } from "../../types";
import { Chore } from "../Data/Chore";
import { mockChores } from "../Data/MockData/ChoreMockData";
import { s } from "../utils/globalStyles";

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

type ChoreViewProps = props & { chore: Chore };

function ChoreView({ navigation, chore }: ChoreViewProps) {
  return (
    <Card
      mode="outlined"
      style={styles.card}
      onPress={() => console.log("Navigating to choreid: " + chore.id)}
    >
      <Card.Content style={styles.contentStack}>
        <Card.Actions>
          <IconButton
            icon="pencil"
            size={15}
            onPress={() => navigation.navigate("EditChore")}
          />
        </Card.Actions>

        <Card.Content style={styles.content1}>
          <Text variant="labelLarge">{chore.name}</Text>
          <DisplayDaysSinceDone
            daysSinceDone={getDaysSinceLastDone(
              chore.deadline,
              chore.repeatInterval
            )}
            interval={chore.repeatInterval}
          />
        </Card.Content>
      </Card.Content>
    </Card>
  );
}

type props = RootStackScreenProps<"Household">;

const screenDimensions = Dimensions.get("screen");

export default function HouseholdScreen({ navigation, route }: props) {
  return (
    <View style={s.flex1}>
      <HeaderBar />
      <FlatList
        data={mockChores}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ChoreView route={route} navigation={navigation} chore={item} />}
      />
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          icon="plus-circle-outline"
          onPress={() => navigation.navigate("AddChore")}
          style={styles.button}
        >
          Lägg till
        </Button>
      </View>
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
    margin: 8,
    height: 50,
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
  button: {
    width: screenDimensions.width / 3,
    borderRadius: 20,
    padding: 5,
    marginTop: 400,
    alignItems: "center",
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10
  },
  contentStack: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    position: "relative",
  },
  content1: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    position: "absolute",
    top: 13,
    right: 0,
    width: 325,
  },
});
