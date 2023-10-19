import { registerRootComponent } from "expo";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Provider } from "react-redux";

import React from "react";
import RootStackNavigator from "./Navigators/RootStackNavigator";
import store from "./store";
import ThemeProvider from "./themes/ThemeContext";
import { s } from "./utils/globalStyles";

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={s.flex1}>
        <StatusBar style="auto" />
        <Provider store={store}>
          <ThemeProvider>
            <RootStackNavigator />
          </ThemeProvider>
        </Provider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

registerRootComponent(App);
