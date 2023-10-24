import { useState } from "react";
import { Household } from "../Data/Household";
import { View, StyleSheet } from "react-native";
import { useAppSelector } from "../store";
import { Surface, Text, TouchableRipple } from "react-native-paper";
import s from "../utils/globalStyles";

type AvatarPickerProps = {
  household: Household;
  selected: number | undefined;
  onSelect: (avatarId: number) => void;
};

export default function AvatarPicker({
  household,
  selected,
  onSelect,
}: AvatarPickerProps) {
  const avatars = useAppSelector((state) => state.household.avatars);
  const isAvailable = (avatarId: number) => {
    return household && household.availableAvatars && household.availableAvatars.includes(avatarId);
  };

  return (
    <View style={[s.row, s.wrap, s.justifyCenter, s.mv10, s.gap10]}>
      {avatars.map((avatar) => (
        <Surface
          style={[
            s.w20, s.ar1, s.e4, s.br4, s.bw2, s.bcTransparent,
            selected == avatar.id && { borderColor: avatar.color },
          ]}
          key={avatar.id}
        >
          <TouchableRipple
            style={[s.flex1, s.justifyCenter, s.alignCenter,
               !isAvailable(avatar.id) && { opacity: 0.2 }]}
            onPress={() => {
              onSelect(avatar.id);
            }}
            rippleColor={avatar.color}
            disabled={!isAvailable(avatar.id)}
          >
            <Text style={{ fontSize: 40 }}>{avatar.avatar}</Text>
          </TouchableRipple>
        </Surface>
      ))}
    </View>
  );
}
