import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, TextInput, Text } from "react-native-paper";
import { useAppDispatch, useAppSelector } from "../store";
import { RootStackScreenProps } from "../../types";
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { registerUser } from "../store/userSlice";


type Props = RootStackScreenProps<"Registration">;

type Inputs = {
  userName: string;
  password: string;
  repeatedPassword: string;
}

export default function RegistrationScreen({ navigation }: Props) {
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();
  const [password, setPassword] = React.useState("");

  const {
    control,
    handleSubmit,
    formState: {errors},
    getValues,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await dispatch(registerUser(data));
    setPassword(data.password);
  }

  useEffect(()=> {
    if (user?.password === password) {
      navigation.navigate("Choice")
    }
  }, [password]
  )

  return (
    <View style={{gap: 5}}>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Namn"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            style={{margin: 5}} 
          />
        )}
        name="userName"
        rules={{ required: "Namn är obligatoriskt", minLength: { value: 2, message: "Namn måste vara minst 2 tecken" } }}
      />
      {errors.userName && <Text style={styles.errorText}>{errors.userName.message}</Text>}
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Lösenord"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            style={{margin: 5}} 
          />
        )}
        name="password"
        rules={{ required: "lösenord är obligatoriskt", minLength: { value: 2, message: "lösenord måste vara minst 2 tecken" } }}
      />
      {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="repetera lösenordet"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            style={{margin: 5}} 
          />
        )}
        name="repeatedPassword"
        rules={{ required: "lösenord är obligatoriskt", minLength: { value: 2, message: "lösenord måste vara minst 2 tecken" }, validate: {
          matchesPassword: (value) => value === getValues("password") || "Lösenorden matchar inte",
        },}}
      />
      {errors.repeatedPassword && <Text style={styles.errorText}>{errors.repeatedPassword.message}</Text>}
      <Button mode="contained" onPress={handleSubmit(onSubmit)}>
        Registrera dig
      </Button>
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
    justifyContent: "center",
  },
  createAccountContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  errorText: {
    color: "red",
  },
});