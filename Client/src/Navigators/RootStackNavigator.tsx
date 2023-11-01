import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import StackHeader from "../Components/StackHeader";
import { Chore } from "../Data/Chore";
import { Household } from "../Data/Household";
import AddEditHouseholdScreen from "../Screens/AddEditHouseholdScreen";
import AddOrEditChoreScreen from "../Screens/AddOREditChoreScreen";
import ChoreListScreen from "../Screens/ChoreListScreen";
import ChoreViewPage from "../Screens/ChoreViewPage";
import HouseholdInfoScreen from "../Screens/HouseholdInfoScreen";
import JoinHousholdScreen from "../Screens/JoinHouseholdScreen";
import LoginScreen from "../Screens/LoginScreen";
import PickHouseholdScreen from "../Screens/PickHouseholdScreen";
import ProfileScreen from "../Screens/ProfileScreen";
import RegistrationScreen from "../Screens/RegistrationScreen";
import ChoreStatisticsScreen from "../Screens/ChoreStatisticsScreen";
import { Profile } from "../Data/Profile";
import SettingScreen from "../Screens/SettingsScreen";

export type RootStackParamList = {
  // Util
  Settings: undefined;
  // Auth
  Registration: undefined;
  Login: undefined;
  // Create / Join Household
  Profile: { profileId: number };
  PickHousehold: undefined;
  JoinHousehold: { code: number | undefined };
  HouseholdInfo: undefined;
  AddEditHoushold: { household: Household | undefined }; // undefined is used to create new
  //
  ChoreList: undefined;
  ChoreView: { chore: Chore };
  ChoreStatistics: { startDate: string; endDate: string };
  AddOrEditChore: { chore?: Chore };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={() => ({
        header: (props) => (
          <StackHeader {...props} title={props.options.title} />
        ),
      })}
    >
      <Stack.Screen
        name="HouseholdInfo"
        component={HouseholdInfoScreen}
        options={{
          header: (props) => (
            <StackHeader {...props} backNav={true} title="Hushållsinfo" />
          ),
        }}
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
        options={{
          header: (props) => (
            <StackHeader {...props} backNav={true} title="Gå med i hushåll" />
          ),
        }}
      />
      <Stack.Screen
        name="ChoreList"
        component={ChoreListScreen}
        options={{
          header: (props) => <StackHeader {...props} choreNav={true} />,
        }}
      />
      <Stack.Screen
        name="ChoreStatistics"
        component={ChoreStatisticsScreen}
        options={{
          header: (props) => <StackHeader {...props} choreNav={true} />,
        }}
      />
      <Stack.Screen
        name="AddEditHoushold"
        component={AddEditHouseholdScreen}
        initialParams={{ household: undefined }}
        options={{
          header: (props) => (
            <StackHeader {...props} backNav={true} title="Skapa hushåll" />
          ),
        }}
      />
      <Stack.Screen
        name="AddOrEditChore"
        component={AddOrEditChoreScreen}
        options={({ route }) => ({
          presentation: "modal",
          title: route.params.chore ? "Redigera en syssla" : "Skapa en syssla",
        })}
      />
      <Stack.Screen
        name="ChoreView"
        component={ChoreViewPage}
        options={{
          title: "title",
          header: (props) => (
            <StackHeader
              {...props}
              backNav={true}
              title={props.options.title}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          header: (props) => (
            <StackHeader {...props} backNav={true} title="Personens profil" />
          ),
        }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingScreen}
        options={{
          header: (props) => (
            <StackHeader {...props} backNav={true} title="Settings" />
          ),
        }}
      />
    </Stack.Navigator>
  );
}
