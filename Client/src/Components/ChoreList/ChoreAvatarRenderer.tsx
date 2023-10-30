import { FlatList, View } from "react-native";
import { Text } from "react-native-paper";
import {
  ProfileChoreProps,
  getprofileChoreByHouseholdToday,
} from "../../store/profileChoreSlice/thunks";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  selectActiveHousehold,
  selectHouseholdProfiles,
} from "../../store/householdSlice";
import { useEffect } from "react";
import { selectProfileChores } from "../../store/profileChoreSlice";
import todaysDateOnlyAsString from "../GetTodaysDateOnly";
import s from "../../utils/globalStyles";
import { avatars } from "../../constants";
import { ProfileChore } from "../../Data/ProfileChore";
import { selectActiveProfile, selectProfiles } from "../../store/userSlice";
import { Chore } from "../../Data/Chore";

export default function ChoreAvatarRenderer(chore: Chore) {
  const profileChoresToday = useAppSelector(selectProfileChores)
    .filter(pc => pc.choreId === chore.id);
  
  return profileChoresToday.length === 0 ? (
    <View style={[s.bgColGrey, s.w10, s.h35, s.br10]}>
      <Text variant="labelLarge" style={[s.colWhite, s.textCenter]}>
        0
      </Text>
    </View>
  ) : (
    <View>
      <FlatList
        data={profileChoresToday}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <AvatarRender {...item} />}
      />
    </View>
  );
}

// const dispatch = useAppDispatch();
// const householdid = useAppSelector(selectActiveHousehold);
// const pcProps: ProfileChoreProps = {
//   householdId: householdid,
//   startDate: todaysDateOnlyAsString(),
//   endDate: undefined,
// };

// dispatch(getprofileChoreByHouseholdToday(pcProps));

function AvatarRender(item: ProfileChore) {
  const profiles = useAppSelector(selectProfiles);
  console.log(profiles.length);
  
  const matchedProfile = profiles.find(
    (profile) => profile.id === item.profileId
  );
  if (matchedProfile != undefined) {
    return <Text>{avatars[matchedProfile?.avatar].avatar}</Text>;
  }

  return <Text>error</Text>;
}
