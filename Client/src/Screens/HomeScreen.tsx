import { StyleSheet, Text, View } from "react-native";
import { Button, Surface } from "react-native-paper";

import { useAppDispatch, useAppSelector } from "../store";
import { fetchUsers } from "../store/userSlice";

export default function HomeScreen() {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.user.houseHolds);
  const isLoading = useAppSelector((state) => state.user.isLoading);

  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Button mode="contained" onPress={() => dispatch(fetchUsers())}>
        Fetch users!
      </Button>
      <Text>{isLoading && "Loading..."}</Text>
      <Surface style={styles.surface} elevation={4}>
        <Text>Users:</Text>
        {users.map((user: any) => (
          <Text key={user.id}>{user.userName}</Text>
        ))}
      </Surface>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  surface: {
    padding: 8,
    margin: 8,
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
  },
});
