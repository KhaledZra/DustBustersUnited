import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ChooseLogin from "../Screens/ChooseLogin";
import HomeScreen from "../Screens/HomeScreen";

// export type HomeStackParamList = {
//   Home: undefined;
//   ChooseLogin: undefined;
//   Detail: undefined;
// };

// const Stack = createNativeStackNavigator<HomeStackParamList>();
const Stack = createNativeStackNavigator();

export default function HomeStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Hem" }}
      />
      <Stack.Screen
        name="ChooseLogin"
        component={ChooseLogin}
        options={{ title: "Hem" }}
      />
    </Stack.Navigator>
  );
}
