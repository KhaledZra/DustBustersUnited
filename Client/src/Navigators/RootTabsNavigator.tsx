import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeStackNavigator from "./HomeStackNavigator";
import { MaterialIcons } from "@expo/vector-icons";

export type RootTabsParamList = {
  HomeTab: undefined;
};

const Tabs = createBottomTabNavigator<RootTabsParamList>();

export default function RootTabsNavigator() {
  return (
    <Tabs.Navigator>
      <Tabs.Screen
        name="HomeTab"
        component={HomeStackNavigator}
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
