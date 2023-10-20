import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChoiceScreen from "../Screens/ChoiceScreen";
import ChoreViewPage from "../Screens/ChoreViewPage";
import HouseholdScreen from "../Screens/HouseholdScreen";
import JoinHousholdScreen from "../Screens/JoinHouseholdScreen";
import LoginScreen from "../Screens/LoginScreen";
import RegistrationScreen from "../Screens/RegistrationScreen";
import AddChoreScreen from "../Screens/AddChoreScreen";
import EditChoreScreen from "../Screens/EditChoreScreen";

export type RootStackParamList = {
  Choice: undefined;
  JoinHousehold: undefined;
  Registration: undefined;
  Login: undefined;
  Household: undefined;
  ChoreView: undefined;
  HouseholdInfo:undefined;
  AddChore: undefined
  EditChore: undefined
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Household">
      <Stack.Screen
        name="Registration"
        component={RegistrationScreen}
        options={{ title: "Registrera" }}
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
        name="AddChore"
        component={AddChoreScreen}
        options={{
          title: "Skapa en syssla",
        }}
      />
      <Stack.Screen
        name="EditChore"
        component={EditChoreScreen}
        options={{
          title: "Redigera en syssla",
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
