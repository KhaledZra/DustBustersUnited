import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../Screens/HomeScreen";
import HouseholdScreen from "../Screens/HouseholdScreen";

export type HomeStackParamList = {
  Household: undefined;
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

export default function HouseholdStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Household"
        component={HouseholdScreen}
        options={{ title: "Hushållet" }}
      />
    </Stack.Navigator>
  );
}
