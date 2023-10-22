import React, { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { RootStackScreenProps } from "../../types";
import { useAppDispatch, useAppSelector } from "../store";
import { login } from "../store/userSlice/thunks";
import Icon from "react-native-paper/src/components/Icon";

type Props = RootStackScreenProps<"Login">;
type Inputs = {
  username: string;
  password: string;
};

export default function LoginScreen({ navigation }: Props) {
  const user = useAppSelector((state) => state.user.user);
  const error = useAppSelector((state) => state.user.loginError);
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await dispatch(login(data));
  };

  useEffect(() => {
    if (user) navigation.navigate("PickHousehold");
  }, [user]);

  useEffect(() => {
    setValue("password", "");
  }, [error]);

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
                secureTextEntry={true}
              />
            )}
            name="password"
            rules={{ required: "Lösenord är obligatoriskt" }}
          />
          <Button mode="contained" onPress={handleSubmit(onSubmit)}>
            Logga in
          </Button>
          {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
      </View>
      <View style={{ ...styles.createAccountContainer }}>
        <Button
          icon={"account-plus"}
          mode="contained"
          onPress={() => navigation.navigate("Registration")}
        >
          Skapa konto
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
    flex: 1,
  },
  verticalSpacingContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  form: { gap: 8 },
  createAccountContainer: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  errorText: {
    color: "red",
  },
});
