import { useNavigation } from "@react-navigation/native";
import React, { Profiler } from "react";
import { StyleSheet, View } from "react-native";
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

  // const handelActiveHousehold = () => {
  //   dispatch(setActiveStatus({profileId, isActive}));
  //   navigation.navigate("PickHousehold");
  // };

  return (
    <View style={styles.container}>
      <Button
        style={[styles.button, { backgroundColor: "red" }]}
        labelStyle={styles.buttonText}
        onPress={handleLeaveHousehold}
      >
        Delete
      </Button>
      <View style={styles.spacing} />
      <Button
        style={[styles.button, { backgroundColor: "green" }]}
        labelStyle={styles.buttonText}
        // onPress={() => handelActiveHousehold(profileId, true)}
      >
        Active
      </Button>
      <View style={styles.spacing} />
      <Button
        style={styles.button}
        labelStyle={styles.buttonText}
        onPress={handleLeaveHousehold}
      >
        Admin
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  button: {
    paddingVertical: 10,
    backgroundColor: "black",
    margin: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
  spacing: {
    marginVertical: 15,
  },
});
