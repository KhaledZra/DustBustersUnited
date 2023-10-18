import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useAppDispatch, useAppSelector } from "../store";
import { loginUser } from "../store/userSlice";

export default function LoginScreen() {
  const navigation = useNavigation();
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();

  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");

  useEffect(() => {
    if (user != null) {
      navigation.navigate("Choice");
    }
  });

  async function handleLogin() {
    await dispatch(loginUser({ userName: name, password: password }));
  }

  return (
    <View style={styles.container}>
      {user && (
        <Text style={{ color: "white" }}>User: {JSON.stringify(user)}</Text>
      )}
      <View style={styles.loginContainer}>
        <TextInput
          label="Namn"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          label="Lösenord"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Button mode="contained" onPress={() => handleLogin()}>
          Logga in
        </Button>
      </View>
      <View style={styles.createAccountContainer}>
        <Button
          mode="contained"
          onPress={() => navigation.navigate("Registration")}
          style={styles.bottomButton}
        >
          Skapa konto
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  loginContainer: {
    flex: 1,
  },
  createAccountContainer: {
    flex: 0.2,
    justifyContent: "flex-end",
  },
  bottomButton: { marginBottom: 10 },
});
