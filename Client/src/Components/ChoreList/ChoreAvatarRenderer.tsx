import { FlatList, View } from "react-native";
import { Text } from "react-native-paper";
import { useAppSelector } from "../../store";
import s from "../../utils/globalStyles";
import { avatars } from "../../constants";
import { ProfileChore } from "../../Data/ProfileChore";
import { Chore } from "../../Data/Chore";
import { useEffect, useState } from "react";
import { selectHouseholdProfiles } from "../../store/householdSlice/selectors";

export default function ChoreAvatarRenderer(chore: Chore) {
  const profileChores = useAppSelector((s) => s.profileChore.profileChores);
  const [filtered, setFiltered] = useState<ProfileChore[]>([]);

  useEffect(() => {
    const filtered = profileChores.filter((pc) => pc.choreId === chore.id);
    const slicedPChores = filtered.slice(0, 6);
    filtered.length > 6 && slicedPChores.unshift({id: -1} as ProfileChore)
    
    setFiltered(slicedPChores);
  }, [profileChores]);

  return filtered.length === 0 ? (
    <View style={[s.bgColFigmaGrey, s.w10, s.br10]}>
      <Text variant="labelLarge" style={[s.textCenter]}>
        0
      </Text>
    </View>
  ) : (
    <View>
      <FlatList
        horizontal={true}
        data={filtered}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <AvatarRender {...item} />}
      />
    </View>
  );
}

function AvatarRender(item: ProfileChore) {
  const profiles = useAppSelector(selectHouseholdProfiles);

  const matchedProfile = profiles.find(
    (profile) => profile.id === item.profileId
  );
  if (matchedProfile != undefined) {
    let avatar = avatars.find((a) => a.id === matchedProfile.avatar);

    return <Text style={[s.fs20, s.ph1, {textAlignVertical: "center"}]}>{avatar?.avatar}</Text>;
  }
  return <Text style={[s.fs20, s.ph1, {textAlignVertical: "center"}]}>...</Text>;
}
