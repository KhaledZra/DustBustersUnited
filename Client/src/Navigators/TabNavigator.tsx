import { MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../Screens/HomeScreen";

export type TabNavParamList = {
  HomeTab: undefined;
};

const Tabs = createBottomTabNavigator<TabNavParamList>();

export default function TabNavigator() {
  return (
    <Tabs.Navigator>
      <Tabs.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          title: "Hem",
          headerShown: false,
          tabBarIcon: (props) => (
            <MaterialIcons
              size={props.size}
              color={props.color}
              name="grid-view"
            />
          ),
        }}
      />
    </Tabs.Navigator>
  );
}
