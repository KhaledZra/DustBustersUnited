import { RootNavParamList } from "./src/Navigators/RootNavigator";


declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootNavParamList {}
  }
}
