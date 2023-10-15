import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../Screens/HomeScreen";
import ChoiceScreen from "../Screens/ChoiceScreen";

export type HomeStackParamList = {
  Home: undefined;
  Val: undefined;
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

export default function HomeStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Hem" }}
      />
      <Stack.Group>
        <Stack.Screen name="Val" component={ChoiceScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}
