import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, TextInput, Text } from "react-native-paper";
import { useAppDispatch, useAppSelector } from "../store";
import { RootStackScreenProps } from "../../types";
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { registerUser } from "../store/userSlice";
import s from "../utils/globalStyles";


import { register } from "../store/userSlice/thunks";

type Props = RootStackScreenProps<"Registration">;

type Inputs = {
  username: string;
  password: string;
  repeatedPassword: string;
};

export default function RegistrationScreen({ navigation }: Props) {
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();
  const [password, setPassword] = React.useState("");

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await dispatch(register(data));
    setPassword(data.password);
  };

  useEffect(() => {
    if (user?.password === password) {
      navigation.navigate("PickHousehold");
    }
  }, [password]);

  return (
    <View style={styles.container}>
      <View style={styles.verticalSpacingContainer}>
        <View style={styles.form}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Namn"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
            name="username"
            rules={{
              required: "Namn är obligatoriskt",
              minLength: {
                value: 2,
                message: "Namn måste vara minst 2 tecken",
              },
            }}
          />
          {errors.username && (
            <Text style={styles.errorText}>{errors.username.message}</Text>
          )}
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Lösenord"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
            name="password"
            rules={{
              required: "lösenord är obligatoriskt",
              minLength: {
                value: 2,
                message: "lösenord måste vara minst 2 tecken",
              },
            }}
          />
          {errors.password && (
            <Text style={styles.errorText}>{errors.password.message}</Text>
          )}
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="repetera lösenordet"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
            name="repeatedPassword"
            rules={{
              required: "lösenord är obligatoriskt",
              minLength: {
                value: 2,
                message: "lösenord måste vara minst 2 tecken",
              },
              validate: {
                matchesPassword: (value) =>
                  value === getValues("password") || "Lösenorden matchar inte",
              },
            }}
          />
          {errors.repeatedPassword && (
            <Text style={styles.errorText}>
              {errors.repeatedPassword.message}
            </Text>
          )}
          <Button mode="contained" onPress={handleSubmit(onSubmit)}>
            Registrera dig
          </Button>
        </View>

        <View style={styles.createAccountContainer}>
          <Button
            icon={"login"}
            mode="contained"
            onPress={() => navigation.navigate("Login")}
          >
            Logga in
          </Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { margin: 16, flex: 1 },
  verticalSpacingContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  form: { gap: 8 },
  createAccountContainer: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  errorText: { color: "red" },
});
