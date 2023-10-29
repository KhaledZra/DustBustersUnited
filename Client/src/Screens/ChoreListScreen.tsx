import { FlatList, View } from "react-native";
import { Button } from "react-native-paper";
import { useAppDispatch, useAppSelector } from "../store";
import { Profile } from "../Data/Profile";
import { RootStackScreenProps } from "../../types";
import { useEffect, useState } from "react";
import s from "../utils/globalStyles";
import ChoreListHeaderBar from "../Components/ChoreList/ChoreListHeaderBar";
import ChoreView from "../Components/ChoreList/ChoreView";
import { getChoresByHousehold } from "../store/choreSlice/thunks";
import { selectActiveHousehold } from "../store/householdSlice";
import { Chore } from "../Data/Chore";

// TODO Remove this comment later:
// alternative soluton if appbar causes issues - https://www.npmjs.com/package/react-native-pager-view

type Props = RootStackScreenProps<"ChoreList">;

export default function ChoreListScreen({ navigation, route }: Props) {
  // TODO: Should be able to solve this with `createSelector` in store instead
  // from here ---
  const [profile, setProfile] = useState<Profile>();
  const profiles = useAppSelector((state) => state.user.profiles);
  const activeProfileId = useAppSelector((state) => state.user.activeProfileId);
  useEffect(() => {
    setProfile(profiles.find((p) => p.id === activeProfileId));
  }, [profiles, activeProfileId]);
  const householdId = useAppSelector(selectActiveHousehold);
  // --- to here

  useEffect(() => {
    navigation.setOptions({ title: profile?.household.name });
  }, [profile]);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getChoresByHousehold(householdId));
  }, []);
  let chores = useAppSelector((state) => state.chore.chores);

  
  return (
    <View style={s.flex1}>
      <ChoreListHeaderBar />
      <FlatList
        data={chores}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ChoreView route={route} navigation={navigation} chore={item} />
        )}
      />
      <View style={s.alignCenter}>
        <Button
          mode="contained"
          icon="plus-circle-outline"
          onPress={() => navigation.navigate("AddOrEditChore", {})}
          style={[s.br20, s.p6, s.mb10]}
        >
          Lägg till
        </Button>
      </View>
    </View>
  );
}
