import { FlatList, View } from "react-native";
import { Text } from "react-native-paper";
import { useAppSelector } from "../../store";
import { selectHouseholdProfiles } from "../../store/householdSlice";
import s from "../../utils/globalStyles";
import { avatars } from "../../constants";
import { ProfileChore } from "../../Data/ProfileChore";
import { Chore } from "../../Data/Chore";
import { useEffect, useState } from "react";

export default function ChoreAvatarRenderer(chore: Chore) {
  const profileChores = useAppSelector((s) => s.profileChore.profileChores);
  const [filtered, setFiltered] = useState<ProfileChore[]>([]);

  useEffect(() => {
    setFiltered(profileChores.filter((pc) => pc.choreId === chore.id));
  }, [profileChores]);

  return filtered.length === 0 ? (
    <View style={[s.bgColGrey, s.w10, s.br10]}>
      <Text variant="labelLarge" style={[s.colWhite, s.textCenter]}>
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

    return <Text style={[s.fs20, s.ph1]}>{avatar?.avatar}</Text>;
  }

  return <Text>error</Text>;
}
