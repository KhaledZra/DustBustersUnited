import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import { Button, TextInput } from "react-native-paper";

export default function LoginScreen() {
  const navigation = useNavigation();

  const [text, setText] = React.useState("");

  return (
    <View>
      <TextInput
        label="Email"
        value={text}
        onChangeText={(text) => setText(text)}
      />
      <Button
        mode="contained"
        onPress={() => navigation.navigate("Registration")}
      >
        Skapa konto
      </Button>
    </View>
  );
}