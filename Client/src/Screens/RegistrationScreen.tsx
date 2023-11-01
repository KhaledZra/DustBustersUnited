import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, TextInput, Text } from "react-native-paper";
import { useAppDispatch, useAppSelector } from "../store";
import { RootStackScreenProps } from "../../types";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
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

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { username, password } = data;
    await dispatch(register({ username, password }));
  };

  useEffect(() => {
    if (user) navigation.navigate("PickHousehold");
  }, [user]);

  return (
    <View style={[s.m16, s.flex1]}>
      <View style={[s.flex1, s.justifyBetween]}>
        <View style={s.gap8}>
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
            <Text style={s.colRed}>{errors.username.message}</Text>
          )}
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Lösenord"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                secureTextEntry={true}
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
            <Text style={s.colRed}>{errors.password.message}</Text>
          )}
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="repetera lösenordet"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                secureTextEntry={true}
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
            <Text style={s.colRed}>{errors.repeatedPassword.message}</Text>
          )}
          <Button mode="contained" onPress={handleSubmit(onSubmit)}>
            Registrera dig
          </Button>
        </View>

        <View style={[s.justifyEnd, s.alignEnd]}>
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
