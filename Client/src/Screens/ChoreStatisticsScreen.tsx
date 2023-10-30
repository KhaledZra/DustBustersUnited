import { View } from "react-native";
import { RootStackScreenProps } from "../../types";
import s from "../utils/globalStyles";
import { Surface, Text } from "react-native-paper";
import PieChart from "react-native-pie-chart";

type Props = RootStackScreenProps<"ChoreStatistics">;

export default function ChoreStatisticsScreen({ navigation, route }: Props) {
  const widthAndHeight = 250;
  const series = [10,10,10,10];
  const degrees = [0, 0, 0, 0, 0];
  const sliceColor = ["#fbd203", "#ffb300", "#ff9100", "#ff6c00"];

  return (
    <View style={[s.flex1, s.alignCenter]}>
      <Surface style={[s.br20, s.p16, s.m16, { position: "relative" }]}>
        <PieChart
          widthAndHeight={widthAndHeight}
          series={series}
          sliceColor={sliceColor}
        />
        <View
          style={{
            width: 50,
            aspectRatio: 1,
            backgroundColor: "blue",
            position: "absolute",
            left: "50%",
            top: "50%",
            marginLeft: -25 - 16,
          }}
        />
      </Surface>
    </View>
  );
}
