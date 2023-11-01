import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { FlatList, ScrollView, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { useAppDispatch, useAppSelector } from "../store";
import { deleteProfile } from "../store/householdSlice";
import { selectRequestProfiles } from "../store/userSlice";
import s from "../utils/globalStyles";
import { avatars } from "../constants";
import { Profile } from "../Data/Profile";
import ProfileButtonRender from "../Components/HouseholdInfo/ProfileButtonRender";
import RenderHouseholdProfiles from "../Components/HouseholdInfo/RenderHouseholdProfiles";
import { selectIsAdmin } from "../store/userSlice";
import { RootStackScreenProps } from "../../types";

type props = RootStackScreenProps<"HouseholdInfo">;

export default function HouseholdInfoScreen({ navigation }:  props ) {
  const dispatch = useAppDispatch();
  const requests = useAppSelector(selectRequestProfiles);
  const isAdmin = useAppSelector(selectIsAdmin);
  const profiles = useAppSelector(
    (state) => state.household.profilesInHousehold
  );
  const household = useAppSelector(
    (state) => state.household.transientHousehold
  );
  const handleLeaveHousehold = () => {
    dispatch(deleteProfile());
    navigation.navigate("PickHousehold");
  };

  return (
    <ScrollView contentContainerStyle={[s.flex1]}>
      <Text style={[s.fs26, s.mt16, s.textCenter]}>Hushållsmedlemmar</Text>
      <RenderHouseholdProfiles {...profiles}/>

      <View style={[s.flex1, s.alignCenter]}>
        <Text style={[s.fs26, s.mt16, s.textCenter]}>
          Kod för att gå med i hushåll
        </Text>
        <View style={[s.mv10]} />
        <Text style={[s.pv2, s.w150, s.bgColWhite, s.br20, s.fs60]}>
          {household ? household.code : " "}
        </Text>
      </View>

      <Text style={[s.fs26, s.mt16, s.textCenter]}>Förfrågningar</Text>
      <RenderHouseholdProfiles {...requests}/>
      {isAdmin && (
      <Button
        style={[s.pv2, s.bgColWhite, s.m10]}
        labelStyle={[s.colBlack]}
        onPress={() => navigation.navigate("AddEditHoushold", { household })}
      >
        Redigera namn
      </Button>)}
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