import { StyleSheet, Text, View } from "react-native";
import UserList from "../components/UserList";
import { useSetColorTheme } from "../themes/ThemeContext";
export default function HomeScreen() {
  const setColorTheme = useSetColorTheme();

  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <UserList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // height: "auto",
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
