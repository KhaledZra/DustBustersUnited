import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChoiceScreen from "../Screens/ChoiceScreen";
import ChooseLoginScreen from "../Screens/ChooseLoginScreen";
import JoinHousholdScreen from "../Screens/JoinHouseholdScreen";
import LoginScreen from "../Screens/LoginScreen";
import RegistrationScreen from "../Screens/RegistrationScreen";
import HouseholdScreen from "../Screens/HouseholdScreen";
import ChoreViewPage from "../Screens/ChoreViewPage";

export type RootStackParamList = {
  Choice: undefined;
  Step2: undefined;
  ChooseLogin: undefined;
  Registration: undefined;
  Login: undefined;
  Household: undefined;
  ChoreView: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="ChoreView">
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
        name="Choice"
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
      <Stack.Screen
        name="ChoreView"
        component={ChoreViewPage}
        options={{
          title: "title",
        }}
      />
    </Stack.Navigator>
  );
}
