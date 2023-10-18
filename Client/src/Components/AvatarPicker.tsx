import { useState } from "react";
import { Household } from "../Data/Household";
import { View, StyleSheet } from "react-native";
import { useAppSelector } from "../store";
import { Surface, Text, TouchableRipple } from "react-native-paper";

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
    return household.availableAvatars.includes(avatarId);
  };

  return (
    <View style={styles.container}>
      {avatars.map((avatar) => (
        <Surface
          style={[
            styles.pressable,
            selected == avatar.id && { borderColor: avatar.color },
          ]}
          key={avatar.id}
        >
          <TouchableRipple
            style={[styles.ripple, !isAvailable(avatar.id) && { opacity: 0.2 }]}
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

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginVertical: 10,
    gap: 10,
  },
  pressable: {
    width: "20%",
    aspectRatio: 1,
    elevation: 4,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "transparent",
  },
  ripple: { flex: 1, justifyContent: "center", alignItems: "center" },
});
