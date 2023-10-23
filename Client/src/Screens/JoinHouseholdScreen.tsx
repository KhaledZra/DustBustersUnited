import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, PaperProvider, Text, TextInput } from "react-native-paper";

import AvatarPicker from "../Components/AvatarPicker";
import { useAppDispatch, useAppSelector } from "../store";
import {
  clearTransientHousehold,
  fetchTransientHousehold,
} from "../store/householdSlice";
import { JoinHouseholdDto } from "../Data/Household";
import { joinHousehold } from "../store/userSlice/thunks";
import s from "../utils/globalStyles";

export default function JoinHousholdScreen() {
  const dispatch = useAppDispatch();
  const household = useAppSelector((s) => s.household.transientHousehold);
  const [selectedAvatar, setSelectedAvatar] = useState<number>();
  const [displayName, setDisplayName] = useState<string>();

  const handleChangeCode = (code: string | undefined) => {
    if (household) dispatch(clearTransientHousehold());
    setDisplayName("");
    if (!code || code.length != 4 || isNaN(parseInt(code))) return;
    dispatch(fetchTransientHousehold(code));
  };

  const handleJoinPress = () => {
    if (!household || !displayName || !selectedAvatar) return;
    let dto: JoinHouseholdDto = {
      userId: 0, // we'll let the thunk figure this out from current state
      householdId: household.id,
      code: household.code,
      displayName: displayName,
      avatar: selectedAvatar,
      isAdmin: false,
    };

    dispatch(joinHousehold(dto));
  };

  return (
    <View style={styles.container}>
      <View>
        <View>
          <TextInput
            error={true}
            label="kod:  (3091)"            
            onChangeText={(text) => handleChangeCode(text)}
          />
        </View>

        {household && (
          <AvatarPicker
            household={household}
            selected={selectedAvatar}
            onSelect={setSelectedAvatar}
          />
        )}
        {household && (
          <View>
            <TextInput
              label="Display-namn"              
              onChangeText={(text) => setDisplayName(text)}
            />
          </View>
        )}
      </View>
      <Button
        mode="contained"
        disabled={
          !household ||
          !selectedAvatar ||
          !displayName ||
          displayName?.length == 0
        }
        onPress={handleJoinPress}
      >
        Gå med
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    padding: 16,
  },
  joinButton: {
    alignSelf: "flex-end",
  },
});
