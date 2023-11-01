import React, { useEffect } from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";

import { RootStackScreenProps } from "../../types";
import PickHousehold from "../Components/HouseholdInfo/PickHousehold";
import { useAppDispatch, useAppSelector } from "../store";
import { fetchProfiles } from "../store/userSlice/thunks";
import s from "../utils/globalStyles";

type Props = RootStackScreenProps<"PickHousehold" | "JoinHousehold">;

export default function PickHouseholdScreen({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const profiles = useAppSelector((state) => state.user.profiles);
  const profileId = useAppSelector((state) => state.user.activeProfileId);

  useEffect(() => {
    dispatch(fetchProfiles());
  }, [profileId]);

  // const handleProfileClick = (profile: Profile) => {
  //   dispatch(setActiveProfile(profile.id));
  //   navigation.navigate("ChoreList");
  // };

  return (
    <View style={[s.flex1, s.justifyBetween, s.p16]}>
      <View>
        {profiles &&
          profiles.map((p) => <PickHousehold profile={p} key={p.id} />)}
      </View>
      <View style={s.mt16}>
        <Button
          mode="contained"
          onPress={() =>
            navigation.navigate("JoinHousehold", { code: undefined })
          }
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
