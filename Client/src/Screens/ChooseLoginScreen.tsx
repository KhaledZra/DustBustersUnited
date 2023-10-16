import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";
import { Button } from "react-native-paper";

export default function ChooseLoginScreen() {
  const navigation = useNavigation();

  return (
    <View>
      <Button mode="contained" onPress={() => navigation.navigate("Login")}>
        Logga in
      </Button>
      <Button
        mode="contained"
        onPress={() => navigation.navigate("Registration")}
      >
        Skapa konto
      </Button>
    </View>
  );
}
