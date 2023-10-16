import { registerRootComponent } from "expo";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";

import React from "react";
import RootStackNavigator from "./Navigators/RootStackNavigator";
import store from "./store";
import ThemeProvider from "./themes/ThemeContext";

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
