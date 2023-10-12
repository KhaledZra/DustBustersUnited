import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import RootTabsNavigator from "./src/Navigatoras/RootTabsNavigator";
import ThemeProvider from "./src/themes/ThemeContext";

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <ThemeProvider>
        <RootTabsNavigator />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
