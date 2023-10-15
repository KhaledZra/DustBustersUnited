import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChoiceScreen from "../Screens/ChoiceScreen";

export type RootStackParamList = {
  Val: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Val"
        component={ChoiceScreen}
        options={{
          title: "Val",
        }}
      />
    </Stack.Navigator>
  );
}
