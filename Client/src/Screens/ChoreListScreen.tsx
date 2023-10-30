import { FlatList, Pressable, View } from "react-native";
import { Appbar, Button, IconButton, Surface, Text } from "react-native-paper";
import { useAppDispatch, useAppSelector } from "../store";

import { useEffect } from "react";
import { RootStackScreenProps } from "../../types";
import ChoreListHeaderBar from "../Components/ChoreList/ChoreListHeaderBar";
import { Chore } from "../Data/Chore";
import { getChoresByHousehold } from "../store/choreSlice/thunks";
import { selectActiveHousehold } from "../store/householdSlice";
import { selectActiveProfile, selectIsAdmin } from "../store/userSlice";
import s from "../utils/globalStyles";

// TODO Remove this comment later:
// alternative soluton if appbar causes issues - https://www.npmjs.com/package/react-native-pager-view

export const getDaysSinceLastDone = (deadline: string, interval: number) => {
  // Setup lastDone
  const lastDone = new Date(deadline);
  lastDone.setDate(lastDone.getDate() - interval);

  // Date now
  const dateNow = new Date(); // in the future use this to adjust the date so calender can be supported

  // Calculate time difference
  const timeDifference = dateNow.getTime() - lastDone.getTime();

  // Calculate days difference by dividing total milliseconds in a day
  const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

  return Math.floor(daysDifference); // Current day progress is not relevant?
};

function HeaderBar() {
  return (
    <Appbar.Header statusBarHeight={0}>
      <Appbar.BackAction
        onPress={() => {
          console.log("day before navigation");
        }}
      />
      <Appbar.Content
        title="Day-Placeholder"
        titleStyle={{ textAlign: "center" }}
      />
      <Appbar.Action
        icon="arrow-right"
        onPress={() => {
          console.log("day after navigation");
        }}
      />
    </Appbar.Header>
  );
}

interface displayDaysProps {
  daysSinceDone: number;
  interval: number;
}

function DisplayDaysSinceDone({ daysSinceDone, interval }: displayDaysProps) {
  if (daysSinceDone < interval) {
    return (
      <View style={[s.bgColGrey, { width: 36, height: 36 }, s.brfull, s.justifyCenter]}>
        <Text variant="labelLarge" style={[s.colWhite, s.textCenter]}>
          {daysSinceDone}
        </Text>
      </View>
    );
  } else {
    return (
      <View style={[s.bgColRed, s.w10, s.h35, s.br10]}>
        <Text variant="labelLarge" style={[s.colWhite, s.textCenter]}>
          {daysSinceDone}
        </Text>
      </View>
    );
  }
}

type ChoreViewProps = Props & { chore: Chore }

function ChoreView({ navigation, chore }: ChoreViewProps) {
  const isAdmin = useAppSelector(selectIsAdmin)

  return (
    <Pressable
      onPress={() => navigation.push("ChoreView", { chore: chore })}
    >
      <Surface
        style={[s.mh10, s.mt16, s.p12, s.row, s.alignCenter, s.justifyBetween]} // TODO lista ut vrf de finns så mycket mellanrum cards
      >
        <View style={[s.row, s.alignCenter]}>
          {isAdmin &&
            <IconButton
            icon="pencil"
            size={20}
            style={{ margin: 0 }}
            onPress={() => navigation.navigate("AddOrEditChore", { chore })}
          />
          }
          <Text variant="labelLarge">{chore.name}</Text>
        </View>

        <DisplayDaysSinceDone
          daysSinceDone={getDaysSinceLastDone(
            chore.deadline.toISOString(),
            chore.repeatInterval
          )}
          interval={chore.repeatInterval}
        />
      </Surface>
    </Pressable>
  );
}

type Props = RootStackScreenProps<"ChoreList">;

export default function ChoreListScreen({ navigation, route }: Props) {
  const dispatch = useAppDispatch();
  const profile = useAppSelector(selectActiveProfile);
  const householdId = useAppSelector(selectActiveHousehold);
  const profiles = useAppSelector((state) => state.user.profiles);
  const activeProfileId = useAppSelector((state) => state.user.activeProfileId);
  const chores = useAppSelector((state) => state.chore.chores);
  const isAdmin = useAppSelector(selectIsAdmin)


  useEffect(() => {
    navigation.setOptions({ title: profile?.household.name });
  }, [profile]);

  useEffect(() => {
    dispatch(getChoresByHousehold(householdId));
  }, []);


  
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
        {isAdmin &&
          <Button
            mode="contained"
            icon="plus-circle-outline"
            onPress={() => navigation.navigate("AddOrEditChore", {})}
            style={[s.br20, s.p6, s.mb10]}
          >
            Lägg till
          </Button>
        }
      </View>
    </View>
  );
}
