import { View, useColorScheme } from "react-native";
import { ToggleButton, Text } from "react-native-paper";
import { ColorScheme, useThemeContext } from "../themes/ThemeContext";
import s from "../utils/globalStyles";

export default function SettingsScreen() {
    const { theme, setColorScheme, colorScheme } = useThemeContext();
    
  return (
    <View style={[s.flex1, s.alignCenter, s.justifyCenter]}>
        <Text style={[s.fs20, s.p16]}>Ändra tema!</Text>
      <ToggleButton.Row
        onValueChange={value => setColorScheme(value as ColorScheme)}
        value={colorScheme}
      >
        <ToggleButton icon="autorenew" value="auto" />
        <ToggleButton icon="white-balance-sunny" value="light" />
        <ToggleButton icon="moon-waning-crescent" value="dark" />
      </ToggleButton.Row>
      <Text style={[s.fs20, s.p16]}>Nuvarande läge: {colorScheme}</Text>
    </View>
  );
}
