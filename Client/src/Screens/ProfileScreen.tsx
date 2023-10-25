import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { useAppDispatch } from "../store";
import { deleteProfile } from "../store/householdSlice";

export default function ProfileScreen() {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const handleLeaveHousehold = () => {
    dispatch(deleteProfile());
    navigation.navigate("PickHousehold");
  };

  return (
    <Button
      style={[styles.button, { backgroundColor: "red" }]}
      labelStyle={styles.buttonText}
      onPress={handleLeaveHousehold}
    >
      Delete
    </Button>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    backgroundColor: "white",
    margin: 10,
  },
  buttonText: {
    color: "black",
    fontSize: 20,
  },
});