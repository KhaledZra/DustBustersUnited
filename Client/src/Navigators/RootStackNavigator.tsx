import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChoiceScreen from "../Screens/ChoiceScreen";
import JoinHousholdScreen from "../Screens/JoinHouseholdScreen";

export type RootStackParamList = {
  Chooice: undefined;
  Step2: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Chooice"
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
    </Stack.Navigator>
  );
}
