import { View, StyleSheet, Dimensions } from "react-native";
import { Badge, Button, Card, List, Text } from "react-native-paper";
import { getDaysSinceLastDone } from "./ChoreListScreen";
import { RootStackParamList } from "../Navigators/RootStackNavigator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect } from "react";
import s from "../utils/globalStyles";
import { RouteProp } from "@react-navigation/native";

const screenDimensions = Dimensions.get("screen");

type ChoreScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "ChoreView"
>;

type Props = {
  navigation: ChoreScreenNavigationProp;
  route: RouteProp<RootStackParamList, "ChoreView">;
};

export default function ChoreViewPage({ navigation, route }: Props) {
  const {chore} = route.params;

  useEffect(() => {
    navigation.setOptions({
      title: chore.name,
    });
  }, []);

  return (
    <View style={[s.flex1]}>
      <Card style={[s.flex1]}>
        <Card.Content style={[s.alignCenter, s.gap10]}>
          <Text style={[s.fs26, s.textCenter]}>
            <Text style={s.boldText}>Beskrivning:</Text> {chore.description}
          </Text>

          <Text style={[s.fs26, s.textCenter]}>
            <Text style={s.boldText}>Sist Avklarat: </Text>
            {getDaysSinceLastDone(chore.deadline, chore.repeatInterval)} dagar
            sen
          </Text>

          <List.Item
            style={[s.bgColWhite, s.br10, s.w80]}
            title={<Text style={s.boldText}>Värde:</Text>}
            description="Hur energiekrävande är sysslan?"
            right={(props) => (
              <Badge style={[s.bgColGrey]}>
                {getDaysSinceLastDone(chore.deadline, chore.energy)}
              </Badge>
            )}
          />
        </Card.Content>
      </Card>

      <Button
        icon="plus-circle-outline"
        mode="contained"
        onPress={() => console.log("Avklarat")}
        style={[s.p6]}
        labelStyle={s.boldText}
      >
        Avklarat
      </Button>
    </View>
  );
}