import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChoiceScreen from "../Screens/ChoiceScreen";
import ChooseLoginScreen from "../Screens/ChooseLoginScreen";
import JoinHousholdScreen from "../Screens/JoinHouseholdScreen";
import LoginScreen from "../Screens/LoginScreen";
import RegistrationScreen from "../Screens/RegistrationScreen";

export type RootStackParamList = {
  Chooice: undefined;
  Step2: undefined;
  ChooseLogin: undefined;
  Registration: undefined;
  Login: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="ChooseLogin">
      <Stack.Screen
        name="ChooseLogin"
        component={ChooseLoginScreen}
        options={{ title: "Choose Login" }}
      />
      <Stack.Screen
        name="Registration"
        component={RegistrationScreen}
        options={{ title: "Choose Login" }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: "Login" }}
      />
      <Stack.Screen
        name="Chooice"
        component={ChoiceScreen}
        options={{
          title: "Val",
        }}
      />
      <Stack.Screen
        name="Step2"
        component={JoinHousholdScreen}
        options={{
          title: "Gå med hushåll Steg2",
        }}
      />
    </Stack.Navigator>
  );
}
