import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import { RootStackScreenProps } from "../../types";
import { Profile } from "../Data/Profile";
import { useAppDispatch, useAppSelector } from "../store";
import {
  adminDeleteProfile,
  setActiveStatus,
  setAdminStatus,
  setRequestStatus,
} from "../store/householdSlice";
import s from "../utils/globalStyles";
type Props = RootStackScreenProps<"Profile">;

export default function ProfileScreen({ route }: Props) {
  const profileId = route.params.profileId;
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const [profile, setProfile] = useState<Profile>();
  const profiles = useAppSelector(
    (state) => state.household.profilesInHousehold
    );
    useEffect(() => {
      setProfile(profiles.find((p) => p.id == profileId));
    }, [profiles, profileId]);
    const handleLeaveHousehold = () => {
      dispatch(adminDeleteProfile(profile!.id));
      navigation.navigate("PickHousehold");
    };
  const handelActiveHousehold = () => {
    if (profile) {
      dispatch(setActiveStatus(profile.id));
    }
  };
  const handelAdminHousehold = () => {
    if(profile){
      dispatch(setAdminStatus(profile.id));
    }
  };
  const handelRequestHousehold = () => {
    if(profile){
      dispatch(setRequestStatus(profile.id));
    }
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
      <View style={[s.mv10]} />
      <Button
        style={[s.pv3, s.bgColWhite, s.m16]}
        onPress={() => handelRequestHousehold()}
      >
        <Text style={[s.colBlack, s.fs20]}>
          {profile && profile.isRequest ? "Request" : "Not Request"}
        </Text>
      </Button>
    </View>
  );
}
