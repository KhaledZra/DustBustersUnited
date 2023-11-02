import React from "react";
import { Pressable, View } from "react-native";
import { Card, IconButton, Surface, Text } from "react-native-paper";
import { Chore } from "../../Data/Chore";
import { getDaysSinceLastDone } from "./GetDaysSinceLastDone";
import s from "../../utils/globalStyles";
import { RootStackScreenProps } from "../../../types";
import ChoreShowLastDone from "./ChoreShowLastDone";
import { useAppSelector } from "../../store";
import { selectIsAdmin } from "../../store/userSlice";
import { useThemeContext } from "../../themes/ThemeContext";

type props = RootStackScreenProps<"ChoreList">;
type ChoreViewProps = props & { chore: Chore };

export default function ChoreView({ navigation, chore }: ChoreViewProps) {
  const isAdmin = useAppSelector(selectIsAdmin);
  const {theme} = useThemeContext()

  return (
    <Pressable onPress={() => navigation.push("ChoreView", { chore })}>
      <Surface
        style={[s.mh10, s.mt6, s.mb2, s.p12, s.row, s.alignCenter, s.justifyBetween, {backgroundColor: theme.colors?.surface}]}
      >
        <View style={[s.row, s.alignCenter]}>
          {isAdmin && (
            <IconButton
              icon="pencil"
              size={20}
              style={[s.m0, {marginRight: 6}]}
              onPress={() => navigation.navigate("AddOrEditChore", { chore })}
            />
          )}
          <Text variant="labelLarge" style={s.boldText}>{chore.name}</Text>
        </View>
        <ChoreShowLastDone
          daysSinceDone={getDaysSinceLastDone(
            chore.deadline,
            chore.repeatInterval
          )}
          interval={chore.repeatInterval}
          chore={chore}
        />
      </Surface>
    </Pressable>
  );
}
