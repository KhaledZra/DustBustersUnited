import { View } from "react-native";
import { Text } from "react-native-paper";
import s from "../../utils/globalStyles";
import ChoreAvatarRenderer from "./ChoreAvatarRenderer";
import { Chore } from "../../Data/Chore";
import { useThemeContext } from "../../themes/ThemeContext";

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
  const { theme } = useThemeContext();
  if (daysSinceDone === 0) {
    return <ChoreAvatarRenderer {...chore} />;
  } else if (daysSinceDone < interval) {
    return (
      <View style={[s.bgColFigmaGrey, s.w10, s.br10]}>
        <Text variant="labelLarge" style={[s.textCenter, s.colBlack]}>
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
