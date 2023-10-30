import { FlatList, View } from "react-native";
import { Button } from "react-native-paper";
import { useAppDispatch, useAppSelector } from "../store";
import { RootStackScreenProps } from "../../types";
import { useEffect, useState } from "react";
import s from "../utils/globalStyles";
import ChoreListHeaderBar from "../Components/ChoreList/ChoreListHeaderBar";
import ChoreView from "../Components/ChoreList/ChoreView";
import { getChoresByHousehold } from "../store/choreSlice/thunks";
import { selectActiveHousehold } from "../store/householdSlice";
import todaysDateOnlyAsString from "../Components/GetTodaysDateOnly";
import { ProfileChoreProps, getprofileChoreByHouseholdToday } from "../store/profileChoreSlice/thunks";
import { selectActiveProfile } from "../store/userSlice";

// TODO Remove this comment later:
// alternative soluton if appbar causes issues - https://www.npmjs.com/package/react-native-pager-view

type Props = RootStackScreenProps<"ChoreList">;

export default function ChoreListScreen({ navigation, route }: Props) {

  const dispatch = useAppDispatch();
  const profile = useAppSelector(selectActiveProfile);
  const householdId = useAppSelector(selectActiveHousehold);

  useEffect(() => {
    navigation.setOptions({ title: profile?.household.name });
  }, [profile]);

  const pcProps: ProfileChoreProps = {
    householdId: householdId,
    startDate: todaysDateOnlyAsString(),
    endDate: undefined,
  };
  useEffect(() => {
    dispatch(getChoresByHousehold(householdId));
    dispatch(getprofileChoreByHouseholdToday(pcProps));
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
