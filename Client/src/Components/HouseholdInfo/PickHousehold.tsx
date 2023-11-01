import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Pressable, View } from "react-native";
import { Surface, Text } from "react-native-paper";
import { Profile } from "../../Data/Profile";
import { useAppDispatch } from "../../store";
import { setActiveProfile } from "../../store/userSlice";
import s from "../../utils/globalStyles";

type Props = { profile: Profile };

export default function PickHousehold({ profile }: Props) {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const handleProfileClick = (profile: Profile) => {
    dispatch(setActiveProfile(profile.id));
    navigation.navigate("ChoreList");
  };
  return (
    <Pressable onPress={() => handleProfileClick(profile)}>
      <Surface
        style={[s.mh10, s.mt16, s.p12, s.row, s.alignCenter, s.justifyBetween]}
      >
        <View style={[s.row, s.alignCenter]}>
          <Text variant="labelLarge"> {profile.household.name}</Text>
        </View>
      </Surface>
    </Pressable>
  );
}
