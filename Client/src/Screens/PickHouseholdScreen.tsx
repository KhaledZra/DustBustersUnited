import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";

import { RootStackScreenProps } from "../../types";
import { useAppDispatch, useAppSelector } from "../store";
import { setActiveProfile } from "../store/userSlice";
import { Profile } from "../Data/Profile";
import { fetchProfiles } from "../store/userSlice/thunks";

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
    <View style={styles.container}>
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
      <View style={styles.buttonContainer}>
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
            navigation.navigate("HouseholdInfo", { household: undefined })
          }
        >
          Nytt hushåll
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    padding: 16,
  },
  buttonContainer: {
    marginTop: 16,
  },
});
