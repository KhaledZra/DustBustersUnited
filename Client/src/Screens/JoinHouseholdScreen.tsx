import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, PaperProvider, Text, TextInput } from "react-native-paper";

import AvatarPicker from "../Components/AvatarPicker";
import { useAppDispatch, useAppSelector } from "../store";
import {
  clearTransientHousehold,
  fetchTransientHousehold,
} from "../store/householdSlice";
import s from "../utils/globalStyles";

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
    <View style={[s.flex1]}>
      <View style={[s.flex1]}>
        <View>
          <Text>(Testa med kod 3091)</Text>
          <TextInput
            error={true}
            label="kod:"
            onChangeText={(text) => handleChangeCode(text)}
          />
        </View>
        <View style={s.p10}>
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
      </View>

      <View style={s.alignCenter}>
        <Button
          style={[s.w40, s.mb10]}
          mode="contained"
          onPress={() => console.log("Gå med")}
        >
          Gå med
        </Button>
      </View>
    </View>
  );
}
