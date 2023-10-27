import { FlatList, View } from "react-native";
import { Button } from "react-native-paper";
import { useAppSelector } from "../store";
import { Profile } from "../Data/Profile";
import { RootStackScreenProps } from "../../types";
import { mockChores } from "../Data/MockData/ChoreMockData";
import { useEffect, useState } from "react";
import s from "../utils/globalStyles";
import ChoreListHeaderBar from "../Components/ChoreList/ChoreListHeaderBar";
import ChoreView from "../Components/ChoreList/ChoreView";

// TODO Remove this comment later:
// alternative soluton if appbar causes issues - https://www.npmjs.com/package/react-native-pager-view

type props = RootStackScreenProps<"ChoreList">;


export default function ChoreListScreen({ navigation, route }: props) {
  // TODO: Should be able to solve this with `createSelector` in store instead
  // from here ---
  const [profile, setProfile] = useState<Profile>();
  const profiles = useAppSelector((state) => state.user.profiles);
  const activeProfileId = useAppSelector((state) => state.user.activeProfileId);
  useEffect(() => {
    setProfile(profiles.find((p) => p.id === activeProfileId));
  }, [profiles, activeProfileId]);
  // --- to here

  useEffect(() => {
    navigation.setOptions({ title: profile?.household.name });
  }, [profile]);

  return (
    <View style={s.flex1}>
      <ChoreListHeaderBar />
      <FlatList
        data={mockChores}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ChoreView route={route} navigation={navigation} chore={item} />
        )}
      />
      <View style={s.alignCenter}>
        <Button
          mode="contained"
          icon="plus-circle-outline"
          onPress={() => navigation.navigate("AddChore")}
          style={[s.br20, s.p6, s.mb10]}
        >
          Lägg till
        </Button>
      </View>
    </View>
  );
}
