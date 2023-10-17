import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";

export default function HouseholdInfo() {
  const navigation = useNavigation();

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