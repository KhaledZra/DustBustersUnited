import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import ChoreViewPage from "../Screens/ChoreViewPage";
import JoinHousholdScreen from "../Screens/JoinHouseholdScreen";
import LoginScreen from "../Screens/LoginScreen";
import ProfileScreen from "../Screens/ProfileScreen";
import RegistrationScreen from "../Screens/RegistrationScreen";
import AddChoreScreen from "../Screens/AddChoreScreen";
import EditChoreScreen from "../Screens/EditChoreScreen";
import StackHeader from "../Components/StackHeader";
import { Household } from "../Data/Household";
import PickHouseholdScreen from "../Screens/PickHouseholdScreen";
import ChoreListScreen from "../Screens/ChoreListScreen";
import HouseholdInfoScreen from "../Screens/HouseholdInfoScreen";
import AddEditHouseholdScreen from "../Screens/AddEditHouseholdScreen";

export type RootStackParamList = {
  // Auth
  Registration: undefined;
  Login: undefined;
  // Create / Join Household
  Profile: undefined;
  PickHousehold: undefined;
  JoinHousehold: undefined;
  HouseholdInfo: undefined;
  AddEditHoushold: { household: Household | undefined }; // undefined is used to create new
  //
  ChoreList: undefined;
  ChoreView: undefined;
  AddChore: undefined;
  EditChore: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={() => ({
        header: (props) => <StackHeader {...props} />,
      })}
    >
      <Stack.Screen
        name="HouseholdInfo"
        component={HouseholdInfoScreen}
        options={{ title: "Hushålls-info" }}
      />
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
        name="PickHousehold"
        component={PickHouseholdScreen}
        options={{ title: "Skapa/Gå med i hushåll" }}
      />
      <Stack.Screen
        name="JoinHousehold"
        component={JoinHousholdScreen}
        options={
          {
            title: "Gå med i hushåll",
            backNav: true,
          } as NativeStackNavigationOptions
        }
      />
      <Stack.Screen
        name="ChoreList"
        component={ChoreListScreen}
        options={{ title: "Hushåll's Vy" }}
      />
      <Stack.Screen
        name="AddEditHoushold"
        component={AddEditHouseholdScreen}
        initialParams={{ household: undefined }}
        options={
          {
            title: "Skapa hushåll",
            backNav: true,
          } as NativeStackNavigationOptions
        }
      />
      <Stack.Screen
        name="AddChore"
        component={AddChoreScreen}
        options={{ title: "Skapa en syssla" }}
      />
      <Stack.Screen
        name="EditChore"
        component={EditChoreScreen}
        options={{ title: "Redigera en syssla" }}
      />
      <Stack.Screen
        name="ChoreView"
        component={ChoreViewPage}
        options={{ title: "title" }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: "Personens profil",
        }}
      />
    </Stack.Navigator>
  );
}
