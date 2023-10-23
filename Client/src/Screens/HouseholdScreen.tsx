import { Dimensions, FlatList, StyleSheet, View } from "react-native";
import { Appbar, Button, Card, IconButton, Text } from "react-native-paper";

import { RootStackScreenProps } from "../../types";
import { Chore } from "../Data/Chore";
import { mockChores } from "../Data/MockData/ChoreMockData";
import { mockHousehold } from "../Data/MockData/HouseHoldMockData";
import { useEffect } from "react";
import s from "../utils/globalStyles";

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
      <View style={[s.bgColGrey, s.w10, s.h35, s.br10]}>
        <Text
          variant="labelLarge"
          style={[s.colWhite, s.textCenter]}
        >
          {daysSinceDone}
        </Text>
      </View>
    );
  } else {
    return (
      <View style={[s.bgColRed, s.w10, s.h35, s.br10]}>
        <Text
          variant="labelLarge"
          style={[s.colWhite, s.textCenter]}
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
      style={[s.mt16, {maxHeight: "50%"}]} // TODO lista ut vrf de finns så mycket mellanrum cards
      mode="outlined"
      onPress={() => console.log("Navigating to choreid: " + chore.id)}
    >
      <Card.Content style={[s.flex1, s.row,]}>
        <Card.Actions style={s.h40}>
          <IconButton
            icon="pencil"
            size={15}
            onPress={() => navigation.navigate("EditChore")}
          />
        </Card.Actions>

        <View style={[s.flex1, s.row, s.justifyBetween]}>
          <Text variant="labelLarge">{chore.name}</Text>
          <DisplayDaysSinceDone
            daysSinceDone={getDaysSinceLastDone(
              chore.deadline,
              chore.repeatInterval
            )}
            interval={chore.repeatInterval}
          />
        </View>
      </Card.Content>
    </Card>
  );
}

type props = RootStackScreenProps<"Household">;

const screenDimensions = Dimensions.get("screen");

export default function HouseholdScreen({ navigation, route }: props) {
  useEffect(() => {
    navigation.setOptions({
      title: mockHousehold.name,
    });
  }, []);

  return (
    <View style={s.flex1}>
      <HeaderBar />
      <FlatList
        data={mockChores}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ChoreView route={route} navigation={navigation} chore={item} />
        )}
      />
      <View style={s.alignCenter}>
        <Button
          mode="contained"
          icon="plus-circle-outline"
          onPress={() => navigation.navigate("AddChore")}
          style={[s.br20, s.p6, s.mb10]}
        >
          Lägg till
        </Button>
      </View>
    </View>
  );
}
