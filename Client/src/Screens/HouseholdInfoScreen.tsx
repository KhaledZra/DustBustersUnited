import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { useAppSelector } from "../store";

export default function HouseholdInfoScreen() {
  // const household = useAppSelector( state => state.)
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hushållsmedlemmar</Text>
        <Button style={styles.button} labelStyle={styles.buttonText}>Person 1</Button>
        <Button style={styles.button} labelStyle={styles.buttonText}>Person 2</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightgray",
  },
  title: {
    fontSize: 24,
    marginTop: 20, 
    textAlign: "center",
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "white",
    margin: 10,
    borderRadius: 15,
  },
  buttonText: {
    color: "black",
  },
});