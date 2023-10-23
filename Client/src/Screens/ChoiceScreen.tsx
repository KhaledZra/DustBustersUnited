import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";

import { RootStackScreenProps } from "../../types";
import { useAppSelector } from "../store";

import s from "../utils/globalStyles";

type Props = RootStackScreenProps<"Choice">;

export default function ChoiceScreen({ navigation }: Props) {
  const households = useAppSelector((state) => state.user.households);
  return (
    <View style={[s.flex1, s.justifyBetween, s.p16]}>
      <View>
        {households.map((household) => {
          return (
            <Button
              mode="contained"
              key={household.id}
              onPress={() => console.log(households)}
            >
              <View>
                <Text>{household.name}</Text>
              </View>
            </Button>
          );
        })}
      </View>
      <View style={s.mt16}>
        <Button
          mode="contained"
          onPress={() => navigation.navigate("JoinHousehold")}
          style={{ marginBottom: 6 }}
        >
          Gå med i hushåll
        </Button>
        <Button mode="contained" onPress={() => console.log("Nytt hushåll")}>
          Nytt hushåll
        </Button>
      </View>
      <View style={s.mb20}>
        <Button mode="contained" onPress={() => console.log("X Stäng")}>
          X Stäng
        </Button>
      </View>
    </View>
  );
}