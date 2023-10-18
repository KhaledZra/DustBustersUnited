import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { useAppDispatch, useAppSelector } from "../store";
import { fetchProfiles } from "../store/householdSlice";

export default function HouseholdInfoScreen() {
  const profiles = useAppSelector( state => state.household.profiles);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchProfiles())
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hushållsmedlemmar</Text>
      {profiles.map( p => {
        return(
          <Button style={styles.button} labelStyle={styles.buttonText} key={p.id}>{p.displayName}</Button>

        )
      })}
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