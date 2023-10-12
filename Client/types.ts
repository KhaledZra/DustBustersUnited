import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeStackParamList } from "./src/Navigators/HomeStackNavigator";
import { RootTabsParamList } from "./src/Navigators/RootTabsNavigator";

export type HomeTabScreenProps<T extends keyof HomeStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<HomeStackParamList, T>,
    BottomTabScreenProps<RootTabsParamList>
  >;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootTabsParamList {}
  }
}
