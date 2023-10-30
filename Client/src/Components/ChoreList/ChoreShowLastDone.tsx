import { View } from "react-native";
import { Text } from "react-native-paper";
import s from "../../utils/globalStyles";
import ChoreAvatarRenderer from "./ChoreAvatarRenderer";

interface displayDaysProps {
  daysSinceDone: number;
  interval: number;
}

export default function ChoreShowLastDone({ daysSinceDone, interval }: displayDaysProps) {
  if (daysSinceDone === 0) {
    console.log("render with avatar");
    return <ChoreAvatarRenderer />
  }
  else if (daysSinceDone < interval) {
    return (
      <View style={[s.bgColGrey, s.w10, s.h35, s.br10]}>
        <Text variant="labelLarge" style={[s.colWhite, s.textCenter]}>
          {daysSinceDone}
        </Text>
      </View>
    );
  } else {
    return (
      <View style={[s.bgColRed, s.w10, s.h35, s.br10]}>
        <Text variant="labelLarge" style={[s.colWhite, s.textCenter]}>
          {daysSinceDone}
        </Text>
      </View>
    );
  }
}
