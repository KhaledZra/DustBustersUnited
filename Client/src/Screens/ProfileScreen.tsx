import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import { Profile } from "../Data/Profile";
import { useAppDispatch, useAppSelector } from "../store";
import {
  deleteProfile,
  setActiveStatus,
  setAdminStatus,
} from "../store/householdSlice";
import s from "../utils/globalStyles";

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
    <View style={[s.flex1, s.justifyCenter]}>
      <Button
        style={[s.pv3, s.bgColRed, s.m16]}
        labelStyle={[s.colWhite, s.fs20]}
        onPress={handleLeaveHousehold}
      >
        Delete
      </Button>
      <View style={[s.mv10]} />
      <Button
        style={[s.pv3, s.bgColGreen, s.m16]}
        onPress={() => handelActiveHousehold()}
      >
        <Text style={[s.colWhite, s.fs20]}>
          {profile && profile.isActive ? "Active" : "Not Activ"}
        </Text>
      </Button>
      <View style={[s.mv10]} />
      <Button
        style={[s.pv3, s.bgColBlack, s.m16]}
        onPress={() => handelAdminHousehold()}
      >
        <Text style={[s.colWhite, s.fs20]}>
          {profile && profile.isAdmin ? "Admin" : "Not Admin"}
        </Text>
      </Button>
    </View>
  );
}