import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useAppDispatch, useAppSelector } from "../store";
import { loginUser } from "../store/userSlice";

export default function LoginScreen() {
  const navigation = useNavigation();
  //pusha skiten
  // Så här hämtar man data från redux store:
  const user = useAppSelector((state) => state.user.user);
  // så här anropar man en funktion i redux store:
  const dispatch = useAppDispatch();

  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleLogin() {
    console.log("before");
    dispatch(loginUser({ userName: name, password: password }));
    console.log("user?.name:", user?.userName);
  }

  return (
    <View>
      {user && (
        <Text style={{ color: "white" }}>User: {JSON.stringify(user)}</Text>
      )}
      <Button
        onPress={() => {
          dispatch(loginUser({ userName: "test", password: "password" }));
        }}
      >
        {" "}
        test{" "}
      </Button>

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
  );
}
