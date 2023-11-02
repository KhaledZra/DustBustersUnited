import { useEffect } from "react";
import { FlatList, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { RootStackScreenProps } from "../../types";
import ChoreView from "../Components/ChoreList/ChoreView";
import { useAppDispatch, useAppSelector } from "../store";
import { getChoresByHousehold } from "../store/choreSlice/thunks";
import {
  getHouseholdProfiles,
  selectActiveHouseholdId,
} from "../store/householdSlice";
import todaysDateOnlyAsString from "../Components/GetTodaysDateOnly";
import {
  ProfileChoreProps,
  getChoreCompletions,
} from "../store/profileChoreSlice/thunks";
import { selectActiveProfile, selectIsAdmin } from "../store/userSlice";
import s from "../utils/globalStyles";

type Props = RootStackScreenProps<"ChoreList">;

export default function ChoreListScreen({ navigation, route }: Props) {
  const dispatch = useAppDispatch();
  const profile = useAppSelector(selectActiveProfile);
  const householdId = useAppSelector(selectActiveHouseholdId);
  const chores = useAppSelector((state) => state.chore.chores).filter(
    (c) => c.isActive !== false
  );
  const isAdmin = useAppSelector(selectIsAdmin);

  useEffect(() => {
    navigation.setOptions({ title: profile?.household.name });
  }, [profile]);

  const pcProps: ProfileChoreProps = {
    startDate: todaysDateOnlyAsString(),
    endDate: undefined,
  };

  useEffect(() => {
    dispatch(getChoresByHousehold(householdId));
    dispatch(getChoreCompletions(pcProps));
    dispatch(getHouseholdProfiles());
  }, []);

  console.log(profile);

  return (
    <View style={s.flex1}>
      {profile && !profile.isRequest && (
        <View style={s.flex1}>
          <FlatList
            data={chores}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <ChoreView route={route} navigation={navigation} chore={item} />
            )}
          />

          <View style={s.alignCenter}>
            {isAdmin && (
              <Button
                mode="contained"
                icon="plus-circle-outline"
                onPress={() => navigation.navigate("AddOrEditChore", {})}
                style={[s.br20, s.p6, s.mb10]}
              >
                Lägg till
              </Button>
            )}
          </View>
        </View>
      )}

      {profile && profile.isRequest && (
        <View style={[s.flex1, s.alignCenter, s.justifyCenter]}>
          <Text style={[s.boldText, s.fs26]}>Väntar på att bli accepterad</Text>
        </View>
      )}
    </View>
  );
}
