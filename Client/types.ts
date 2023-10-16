import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./src/Navigators/RootStackNavigator";

export type RootStackScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, T>

// export type RootStackScreenProps<T extends keyof RootStackParamList> =
//   CompositeScreenProps<
//     NativeStackScreenProps<RootStackParamList, T>,
//     MaterialTopTabScreenProps<HomeTabScreenProps>
//   >;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
  }
}
