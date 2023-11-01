import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Pressable, View } from "react-native";
import { Surface, Text } from "react-native-paper";
import { Profile } from "../../Data/Profile";
import { avatars } from "../../constants";
import s from "../../utils/globalStyles";
import IconButtonAvatar from "../IconButtonAvatar";

type Props = { profile: Profile };

export default function ProfileView({ profile }: Props) {
  const navigation = useNavigation();
  const profileAvatar = avatars.find((avatar) => avatar.id === profile.avatar);
  return (
    <Pressable
      onPress={() => navigation.navigate("Profile", { profileId: profile.id })}
    >
      <Surface
        style={[s.mh10, s.mt16, s.p12, s.row, s.alignCenter, s.justifyBetween]}
      >
        <View style={[s.row, s.alignCenter]}>
          <IconButtonAvatar avatar={profileAvatar!} size={20} style={s.m0} />
          <Text variant="labelLarge"> {profile.displayName}</Text>
        </View>
      </Surface>
    </Pressable>
  );
}