import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChoiceScreen from "../Screens/ChoiceScreen";
import JoinHousholdScreen from "../Screens/JoinHouseholdScreen";
import LoginScreen from "../Screens/LoginScreen";
import RegistrationScreen from "../Screens/RegistrationScreen";
import HouseholdScreen from "../Screens/HouseholdScreen";
import ChoreViewPage from "../Screens/ChoreViewPage";

export type RootStackParamList = {
  Choice: undefined;
  JoinHousehold: undefined;
  Registration: undefined;
  Login: undefined;
  Household: undefined;
  ChoreView: undefined;
  HouseholdInfo:undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Household">
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
        options={{ title: "Val" }}
      />
      <Stack.Screen
        name="JoinHousehold"
        component={JoinHousholdScreen}
        options={{ title: "Gå med i hushåll" }}
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
