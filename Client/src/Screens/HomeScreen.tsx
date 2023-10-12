import { StyleSheet, Text, View } from "react-native";
import { HomeTabScreenProps } from "../../types";

type Props = HomeTabScreenProps<"Home">;

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
