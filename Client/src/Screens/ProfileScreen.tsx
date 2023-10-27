import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { Profile } from "../Data/Profile";
import { useAppDispatch, useAppSelector } from "../store";
import {
  deleteProfile,
  setActiveStatus,
  setAdminStatus,
} from "../store/householdSlice";

export default function ProfileScreen() {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const profiles = useAppSelector((state) => state.user.profiles);
  const profileId = useAppSelector((state) => state.user.activeProfileId);
  const [profile, setProfile] = useState<Profile>();
  useEffect(() => {
    const profile = profiles.find((p) => p.id == profileId);
    setProfile(profile);
  }, [profileId, profiles]);

  const handleLeaveHousehold = () => {
    dispatch(deleteProfile());
    navigation.navigate("PickHousehold");
  };

  const handelActiveHousehold = () => {
    dispatch(setActiveStatus());
  };
  const handelAdminHousehold = () => {
    dispatch(setAdminStatus());
  };

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
        onPress={() => handelActiveHousehold()}
      >
        <Text style={styles.buttonText}>
          {profile && profile.isActive ? "Active" : "Not Activ"}
        </Text>
      </Button>
      <View style={styles.spacing} />
      <Button style={styles.button} onPress={() => handelAdminHousehold()}>
        <Text style={styles.buttonText}>
          {profile && profile.isAdmin ? "Admin" : "Not Admin"}
        </Text>
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
