import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, PaperProvider, Text, TextInput } from "react-native-paper";

import AvatarPicker from "../Components/AvatarPicker";
import { useAppDispatch, useAppSelector } from "../store";
import {
  clearTransientHousehold,
  fetchTransientHousehold,
} from "../store/householdSlice";

export default function JoinHousholdScreen() {
  const dispatch = useAppDispatch();
  const household = useAppSelector((s) => s.household.transientHousehold);
  const [selectedAvatar, setSelectedAvatar] = useState<number>();
  const [text, setText] = useState<string>();

  const handleChangeCode = (code: string | undefined) => {
    if (household) dispatch(clearTransientHousehold());
    if (!code || code.length != 4 || isNaN(parseInt(code))) return;
    dispatch(fetchTransientHousehold(code));
  };

  return (
    <PaperProvider>
      <View>
        <Text>(Testa med kod 3091)</Text>
        <TextInput
          error={true}
          label="kod:"
          onChangeText={(text) => handleChangeCode(text)}
        />
      </View>
      <View style={styles.requestButton}>
        <Button
          mode="contained"
          onPress={() => console.log("skcika förfrågan")}
        >
          Skicka förfrågan
        </Button>
      </View>
      {household && (
        <AvatarPicker
          household={household}
          selected={selectedAvatar}
          onSelect={setSelectedAvatar}
        />
      )}
      <View>
        <TextInput
          label="Välj display namn:"
          onChangeText={(text) => setText(text)}
        />
      </View>
      <View style={styles.joinButton}>
        <Button mode="contained" onPress={() => console.log("Gå med")}>
          Gå med
        </Button>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  requestButton: {
    padding: 10,
  },
  joinButton: {
    marginTop: 100,
    padding: 60,
  },
});
