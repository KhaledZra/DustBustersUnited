import { registerRootComponent } from "expo";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";

import HomeStackNavigator from "./Navigators/HomeStackNavigator";
import store from "./store";
import ThemeProvider from "./themes/ThemeContext";

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <Provider store={store}>
        <ThemeProvider>
          {/* <RootTabsNavigator /> */}
          <HomeStackNavigator />
        </ThemeProvider>
      </Provider>
    </SafeAreaProvider>
  );
}

registerRootComponent(App);
