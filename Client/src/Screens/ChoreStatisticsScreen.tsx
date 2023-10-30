import { View } from "react-native";
import { Text } from "react-native-paper";

import { RootStackScreenProps } from "../../types";
import s from "../utils/globalStyles";

type Props = RootStackScreenProps<"ChoreStatistics">;

export default function ChoreStatisticsScreen({ navigation, route }: Props) {
  return (
    <View style={s.flex1}>
      <Text>asdf</Text>
    </View>
  );
}
