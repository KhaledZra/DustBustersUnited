import { useNavigation } from "@react-navigation/native";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { avatars } from "../constants";
import { useAppDispatch, useAppSelector } from "../store";
import { deleteProfile } from "../store/householdSlice";
import { selectRequestProfiles } from "../store/userSlice";
import s from "../utils/globalStyles";

export default function HouseholdInfoScreen() {
  const dispatch = useAppDispatch();
  const requests = useAppSelector(selectRequestProfiles);
  const profiles = useAppSelector(
    (state) => state.household.profilesInHousehold
  );
  const navigation = useNavigation();
  const householdCode = useAppSelector(
    (state) => state.household.transientHousehold
  );
  const handleLeaveHousehold = () => {
    dispatch(deleteProfile());
    navigation.navigate("PickHousehold");
  };

  return (
    <ScrollView contentContainerStyle={[s.flex1]}>
      <Text style={[s.fs26, s.mt16, s.textCenter, s.colWhite]}>
        Hushållsmedlemmar
      </Text>
      {profiles &&
        profiles.map((p) => {
          const profileAvatar = avatars.find(
            (avatar) => avatar.id === p.avatar
          );
          return (
            <Button
              style={[s.pv3, s.bgColWhite, s.m16]}
              labelStyle={[s.colBlack]}
              key={p.id}
              onPress={() => navigation.navigate("Profile", { profileId: p.id })}
            >
              {profileAvatar ? profileAvatar.avatar : null} {p.displayName}
            </Button>
          );
        })}
      <View style={[s.flex1, s.alignCenter]}>
        <Text style={[s.fs26, s.mt16, s.textCenter, s.colWhite]}>
          Kod för att gå med i hushåll
        </Text>
        <View style={[s.mv10]} />
        <Text style={[s.pv2, s.w150, s.bgColWhite, s.br20, s.fs60, s.colBlack]}>
          {householdCode ? householdCode.code : " "}
        </Text>
      </View>
      <Text style={[s.fs26, s.mt16, s.textCenter, s.colWhite]}>
        Förfrågningar
      </Text>
      {requests.map((p) => {
        const profileAvatar = avatars.find((avatar) => avatar.id === p.id);
        return (
          <Button
            style={[s.pv3, s.bgColWhite, s.m16]}
            labelStyle={[s.colBlack]}
            key={p.id}
            onPress={() => navigation.navigate("Profile", { profileId: p.id })}
          >
            {profileAvatar ? profileAvatar.avatar : null} {p.displayName}
          </Button>
        );
      })}
      <Button
        style={[s.pv2, s.bgColWhite, s.m10]}
        labelStyle={[s.colBlack]}
        onPress={handleLeaveHousehold}
      >
        Lämna hushåll
      </Button>
    </ScrollView>
  );
}
