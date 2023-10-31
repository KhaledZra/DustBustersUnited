import { useNavigation } from "@react-navigation/native";
import { FlatList, View } from "react-native";
import { Profile } from "../../Data/Profile";
import ProfileButtonRender from "./ProfileButtonRender";

export default function RenderHouseholdProfiles(profiles: Profile[]) {
  const navigation = useNavigation();

  return (
    <View>
      {profiles ? (
        profiles.length > 0 ? (
          <FlatList
            data={profiles}
            keyExtractor={(p) => p.id.toString()}
            renderItem={({ item }) => (
              <ProfileButtonRender
                profile={item}
                onPressAction={() =>
                  navigation.navigate("Profile", { profileId: item.id })
                }
              />
            )}
          />
        ) : (
          false
        )
      ) : (
        false
      )}
    </View>
  );
}
