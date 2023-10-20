
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, TextInput, Text} from "react-native-paper";
import { useAppDispatch, useAppSelector } from "../store";
import { loginUser } from "../store/userSlice";
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { RootStackScreenProps } from "../../types";

type Props = RootStackScreenProps<"Login">;
type Inputs = {
  userName: string;
  password: string;
}

export default function LoginScreen({ navigation }: Props) {
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await dispatch(loginUser(data));
    setPassword(data.password);
  }

  useEffect(()=>{

    if (user?.password === password) {
      navigation.navigate("Choice");
    } 
    else {
      if (password != "") {
        
        setError("Inloggningen misslyckades.")
      }
    }
  }, [password]
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
        rules={{ required: true }}
      />
      
      <Button mode="contained" onPress={handleSubmit(onSubmit)}>
        Logga in
      </Button>
      {error && <Text style={styles.errorText}>{error}</Text>}
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
  errorText: {
    color: "red",
  },
});
