import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";

import { RootStackScreenProps } from "../../types";
import { Profile } from "../Data/Profile";
import { useAppDispatch, useAppSelector } from "../store";
import { setActiveProfile } from "../store/userSlice";
import { fetchProfiles } from "../store/userSlice/thunks";
import s from "../utils/globalStyles";

type Props = RootStackScreenProps<"PickHousehold" | "JoinHousehold">;

export default function PickHouseholdScreen({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const profiles = useAppSelector((state) => state.user.profiles);

  useEffect(() => {
    dispatch(fetchProfiles());
  }, []);

  const handleProfileClick = (profile: Profile) => {
    dispatch(setActiveProfile(profile.id));
    navigation.navigate("ChoreList");
  };

  return (
    <View style={[s.flex1, s.justifyBetween, s.p16]}>
      <View>
        {profiles &&
          profiles.map((profile) => {
            return (
              <Button
                mode="contained"
                key={profile.id}
                onPress={() => handleProfileClick(profile)}
              >
                {profile.household.name}
              </Button>
            );
          })}
      </View>
      <View style={s.mt16}>
        <Button
          mode="contained"
          onPress={() => navigation.navigate("JoinHousehold")}
          style={{ marginBottom: 6 }}
        >
          Gå med i hushåll
        </Button>
        <Button
          mode="contained"
          onPress={() =>
            navigation.navigate("AddEditHoushold", { household: undefined })
          }
        >
          Nytt hushåll
        </Button>
      </View>
    </View>
  );
}