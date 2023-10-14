import { MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeStackNavigator from "./HomeStackNavigator";
import HouseholdStackNavigator from "./HouseholdStackNavigator";

export type RootTabsParamList = {
  HomeTab: undefined;
  HouseholdTab: undefined;
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
      <Tabs.Screen
        name="HouseholdTab"
        component={HouseholdStackNavigator}
        options={{
          title: "Household",
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
