import { View } from "react-native";
import { Text } from "react-native-paper";
import s from "../../utils/globalStyles";
import ChoreAvatarRenderer from "./ChoreAvatarRenderer";
import { Chore } from "../../Data/Chore";

interface displayDaysProps {
  daysSinceDone: number;
  interval: number;
  chore: Chore;
}

export default function ChoreShowLastDone({
  daysSinceDone,
  interval,
  chore,
}: displayDaysProps) {
  if (daysSinceDone === 0) {
    return <ChoreAvatarRenderer {...chore} />;
  } else if (daysSinceDone < interval) {
    return (
      <View style={[s.bgColGrey, s.w10, s.br10]}>
        <Text variant="labelLarge" style={[s.colWhite, s.textCenter]}>
          {daysSinceDone}
        </Text>
      </View>
    );
  } else {
    return (
      <View style={[s.bgColRed, s.w10, s.br10]}>
        <Text variant="labelLarge" style={[s.colWhite, s.textCenter]}>
          {daysSinceDone}
        </Text>
      </View>
    );
  }
}
