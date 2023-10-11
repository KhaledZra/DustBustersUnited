import { NavigationContainer } from "@react-navigation/native";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useColorScheme } from "react-native";
import { PaperProvider } from "react-native-paper";

import { AppDarkTheme, AppLightTheme } from "./appThemes";

type ColorScheme = "light" | "dark" | "auto";

type ThemeContextValue = {
  setColorScheme: (scheme: ColorScheme) => void;
};

const ThemeContext = createContext<ThemeContextValue>({} as ThemeContextValue);

export default function ThemeProvider({ children }: PropsWithChildren) {
  //Temat som användaren valt i appen
  const [colorScheme, setColorScheme] = useState<ColorScheme>("dark");

  //Temat som OS'et föreslår
  const autoScheme = useColorScheme();

  let selectedScheme = colorScheme === "auto" ? autoScheme : colorScheme;
  let theme = selectedScheme === "dark" ? AppDarkTheme : AppLightTheme;

  useEffect(() => {
    selectedScheme = colorScheme === "auto" ? autoScheme : colorScheme;
    theme = selectedScheme === "dark" ? AppDarkTheme : AppLightTheme;
    console.log(theme);
  });

  return (
    <ThemeContext.Provider value={{ setColorScheme }}>
      <PaperProvider theme={theme}>
        <NavigationContainer theme={theme}>{children}</NavigationContainer>
      </PaperProvider>
    </ThemeContext.Provider>
  );
}

export const useSetColorTheme = () => useContext(ThemeContext);
