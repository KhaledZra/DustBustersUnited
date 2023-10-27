import React from "react";
import { View } from "react-native";
import { Card, IconButton, Text } from "react-native-paper";
import { Chore } from "../../Data/Chore";
import { getDaysSinceLastDone } from "./GetDaysSinceLastDone";
import s from "../../utils/globalStyles";
import { RootStackScreenProps } from "../../../types";
import ChoreShowLastDone from "./ChoreShowLastDone";

type props = RootStackScreenProps<"ChoreList">;
type ChoreViewProps = props & { chore: Chore };

export default function ChoreView({ navigation, chore }: ChoreViewProps) {
  return (
    <Card
      style={[s.mt16, { maxHeight: "50%" }]} // TODO lista ut vrf de finns så mycket mellanrum cards
      mode="outlined"
      onPress={() => navigation.push('ChoreView', {chore: chore})}
    >
      <Card.Content style={[s.flex1, s.row]}>
        <Card.Actions style={s.h40}>
          <IconButton
            icon="pencil"
            size={15}
            onPress={() => navigation.navigate("AddOrEditChore", { chore })}
          />
        </Card.Actions>

        <View style={[s.flex1, s.row, s.justifyBetween]}>
          <Text variant="labelLarge">{chore.name}</Text>
          <ChoreShowLastDone
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