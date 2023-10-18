
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, TextInput} from "react-native-paper";
import { useAppDispatch, useAppSelector } from "../store";
import { loginUser } from "../store/userSlice";
import { useForm, Controller, SubmitHandler } from "react-hook-form"

type Inputs = {
  userName: string;
  password: string;
}

export default function LoginScreen() {
  const navigation = useNavigation();
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();
  const [password, setPassword] = useState("");

  const {
    control,
    handleSubmit,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await dispatch(loginUser(data));
    setPassword(data.password);
  }
    useEffect(()=>{

      if (user?.password === password) {
        navigation.navigate("Choice");
      } 
    }, [user, password]
  )
  return (
    <View style={styles.container}>
      <View style={styles.loginContainer}>
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
        rules={{ required: true }}
      />

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
        rules={{ required: true }}
      />

      <Button mode="contained" onPress={handleSubmit(onSubmit)}>
        Logga in
      </Button>
      </View>
      <View style={{ ...styles.createAccountContainer, marginBottom: 20 }}>

      <Button
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
});
