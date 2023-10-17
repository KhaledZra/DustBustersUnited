import { DefaultTheme, DarkTheme } from "@react-navigation/native";
import { MD3DarkTheme, MD3LightTheme } from "react-native-paper";

export const AppLightTheme = {
  ...DefaultTheme,
  ...MD3LightTheme,
  roundness: 1,
  colors: {
    ...DefaultTheme.colors,
    ...MD3LightTheme.colors,
    primary: "#FFF",
    background: "#F2F2F2",
    onPrimary: "black"
  },
};

export const AppDarkTheme = {
  ...DarkTheme,
  ...MD3DarkTheme,
  colors: {
    ...DarkTheme.colors,
    ...MD3DarkTheme.colors,
    primary: "rgb(255, 45, 85)",
    onPrimary: "white"
  },
};
