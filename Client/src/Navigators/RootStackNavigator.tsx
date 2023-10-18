import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChoiceScreen from "../Screens/ChoiceScreen";
import HouseholdInfoScreen from "../Screens/HouseholdInfoScreen";
import HouseholdScreen from "../Screens/HouseholdScreen";
import JoinHousholdScreen from "../Screens/JoinHouseholdScreen";
import LoginScreen from "../Screens/LoginScreen";
import RegistrationScreen from "../Screens/RegistrationScreen";

export type RootStackParamList = {
  Chooice: undefined;
  Step2: undefined;
  ChooseLogin: undefined;
  Registration: undefined;
  Login: undefined;
  Household: undefined;
  HouseholdInfo: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="HouseholdInfo">
      <Stack.Screen
        name="HouseholdInfo"
        component={HouseholdInfoScreen}
        options={{ title: "Hushålls-info" }}
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

      <Stack.Screen
        name="Household"
        component={HouseholdScreen}
        options={{
          title: "Hushåll's Vy",
        }}
      />
    </Stack.Navigator>
  );
}
