import { registerRootComponent } from "expo";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";

import store from "./store";
import ThemeProvider from "./themes/ThemeContext";
import RootStackNavigator from "./Navigators/RootStackNavigator";

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <Provider store={store}>
        <ThemeProvider>
          <RootStackNavigator />
        </ThemeProvider>
      </Provider>
    </SafeAreaProvider>
  );
}

registerRootComponent(App);
