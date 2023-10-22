import { Button, TextInput } from "react-native-paper";
import { View } from "react-native";

import { RootStackScreenProps } from "../../types";

type Props = RootStackScreenProps<"HouseholdInfo">;

export default function HouseholdScreen({}: Props) {
  return (
    <View style={{ padding: 16, gap: 16 }}>
      <TextInput label="Hushållsnamn" />
      <TextInput label="Hushållsnamn" />
      <Button mode="contained">Skapa</Button>
    </View>
  );
}
