import { FlatList, View } from "react-native";
import { Text } from "react-native-paper";
import { ProfileChoreProps, getprofileChoreByHouseholdToday } from "../../store/profileChoreSlice/thunks";
import { useAppDispatch, useAppSelector } from "../../store";
import { selectActiveHousehold, selectHouseholdProfiles } from "../../store/householdSlice";
import { useEffect } from "react";
import { selectProfileChores } from "../../store/profileChoreSlice";
import todaysDateOnlyAsString from "../GetTodaysDateOnly";
import s from "../../utils/globalStyles";
import { avatars } from "../../constants";
import { ProfileChore } from "../../Data/ProfileChore";

export default function ChoreAvatarRenderer() {
  const dispatch = useAppDispatch();
  const householdid = useAppSelector(selectActiveHousehold);
  const pcProps: ProfileChoreProps = {
    householdId: householdid,
    startDate: todaysDateOnlyAsString(),
    endDate: undefined,
  };
  
  useEffect(() => {
    dispatch(getprofileChoreByHouseholdToday(pcProps));
  }, [])
  const profileChoresToday = useAppSelector(selectProfileChores);
  
  
  return (
    <View>
      <FlatList
        data={profileChoresToday}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => (
            <AvatarRender {...item}/>
        )}
      />
        {/* <Text variant="labelLarge" style={[s.colBlack, s.textCenter]}>
          gweqgqw
        </Text> */}
    </View>
  );
}

function AvatarRender(item: ProfileChore) {
    const profiles = useAppSelector(selectHouseholdProfiles);
    const matchedProfile = profiles.find(profile => profile.id === item.profileId);
    if (matchedProfile != undefined) {
        return (<Text>{avatars[matchedProfile?.avatar].avatar}</Text>)
    }

    return (<Text>error</Text>)
    
 }
