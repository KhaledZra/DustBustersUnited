import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, PaperProvider } from "react-native-paper";

import { RootStackScreenProps } from "../../types";
import { useAppSelector } from "../store";

type Props = RootStackScreenProps<'Chooice'>

export default function ChoiceScreen({ navigation }: Props) {
  const households = useAppSelector((state) => state.user.households);
  return (
    <PaperProvider>
      <View style={styles.container}>
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
        <View style={styles.buttonContainer}>
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
        <View style={styles.closeButton}>
          <Button mode="contained" onPress={() => console.log("X Stäng")}>
            X Stäng
          </Button>
        </View>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    padding: 16,
  },
  buttonContainer: {
    marginTop: 16,
  },
  closeButton: {
    marginBottom: 20,
  },
});
