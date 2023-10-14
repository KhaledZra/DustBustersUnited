import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";

export default function ChooseLogin() {
  const navigation = useNavigation();

  return (
    <View>
      {/* <Button mode="contained" onPress={() => navigation.navigate("Login")}>
        Login
      </Button> */}
      {/* <Button
        mode="contained"
        onPress={() => navigation.navigate("Registration")}
      > */}
      {/* Skapa konto
      </Button> */}
    </View>
  );
}
