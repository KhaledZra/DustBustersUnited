import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, PaperProvider } from "react-native-paper";

import { useAppSelector } from "../store";

export default function ChoiceScreen() {
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
            onPress={() => console.log("Gå med i hushåll")}
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
