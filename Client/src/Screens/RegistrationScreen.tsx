import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useAppDispatch } from "../store";

export default function RegistrationScreen() {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [repeatedPassword, setRepeatedPassword] = React.useState("");

  function handleCreateUser() {
    if (password === repeatedPassword) {
      //TODO
    }
  }

  return (
    <View>
      <TextInput
        label="Namn"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        label="lösenord"
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TextInput
        label="repetera lösenord"
        value={repeatedPassword}
        onChangeText={(text) => setRepeatedPassword(text)}
      />
      <Button mode="contained" onPress={() => handleCreateUser()}>
        Logga in
      </Button>
    </View>
  );
}
