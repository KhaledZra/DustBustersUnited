import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { ScrollView, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { useAppDispatch, useAppSelector } from "../store";
import householdSlice, { deleteProfile, getProfiles } from "../store/householdSlice";
import s from "../utils/globalStyles";

export default function HouseholdInfoScreen() {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const householdId = useAppSelector((state) => state.household.transientHousehold?.id);
  const householdCode = useAppSelector(
    (state) => state.household.transientHousehold);
  const handleLeaveHousehold = () => {
    dispatch(deleteProfile());
    navigation.navigate("PickHousehold");
  };
  
  useEffect(() => {
    if (householdId) {
      dispatch(getProfiles(householdId));
      console.log("DISPATCH!!!")
    }
  }, []);
  
  const profiles = useAppSelector((state) => state.household.profiles);
  const gaga = useAppSelector((state)=> state.household)
  console.log("GGGGGGGGGGGGG",  gaga.profiles)
    const avatars = useAppSelector((state) => state.household.avatars);
    return (
    <ScrollView contentContainerStyle={[s.flex1]}>
      <Text style={[s.fs26, s.mt16, s.textCenter, s.colWhite]}>
        Hushållsmedlemmar
      </Text>
      {profiles.map((p) => {
        const profileAvatar = avatars.find((avatar) => avatar.id === p.avatar);
        return (
          <Button
            style={[s.pv3, s.bgColWhite, s.m16]}
            labelStyle={[s.colBlack]}
            key={p.id}
            onPress={() => navigation.navigate("Profile")}
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