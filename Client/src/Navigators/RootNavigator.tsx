import { NavigatorScreenParams } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TabNavigator, { TabNavParamList } from "./TabNavigator";
import ChooseLoginScreen from "../Screens/ChooseLoginScreen";
import LoginScreen from "../Screens/LoginScreen";
import RegistrationScreen from "../Screens/RegistrationScreen";

export type RootNavParamList = {
  TabNavigation: NavigatorScreenParams<TabNavParamList>;
  ChooseLogin: undefined;
  Registration: undefined;
  Login: undefined;
};

// const Stack = createNativeStackNavigator<HomeStackParamList>();
const Stack = createNativeStackNavigator<RootNavParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="TabNavigation">
      <Stack.Screen
        name="TabNavigation"
        component={TabNavigator}
        options={{ title: "Navigation" }}
      />
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
        options={{ title: "Choose Login" }}
      />
    </Stack.Navigator>
  );
}
