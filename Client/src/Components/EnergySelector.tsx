import { Pressable, ScrollView, View } from "react-native";
import { Card, Badge, Text } from "react-native-paper";
import s from "../utils/globalStyles";
import { Control, useController } from "react-hook-form";
import { Chore } from "../Data/Chore";
import { useState } from "react";

type Props = {
  name: "energy";
  control: Control<Chore>;
};

export default function EnergySelector({ name, control }: Props) {
  const { field } = useController({ control, defaultValue: 1, name });
  const [isPresentation, setIsPresentation] = useState(true);

  const handleClick = (selectedValue: number) => {
    field.onChange(selectedValue);
    setIsPresentation(true);
  };

  if (isPresentation)
    return (
      <Card>
        <Pressable onPress={() => setIsPresentation(false)}>
          <View style={[s.row, s.justifyBetween, s.alignCenter, s.p16]}>
            <Text style={s.boldText}>Värde:</Text>
            <Text>Hur energikrävande är sysslan?</Text>
            <View style={[s.row, s.gap2, s.alignCenter]}>
              <Badge style={[s.boldText, s.bgColGrey]}>{field.value}</Badge>
            </View>
          </View>
        </Pressable>
      </Card>
    );

  return (
    <Card>
      <ScrollView
        horizontal
        contentContainerStyle={[
          s.row,
          s.p16,
          s.gap4,
          { justifyContent: "space-around", flexGrow: 1 },
        ]}
      >
        {[1, 2, 4, 6, 8].map((value) => (
          <Pressable onPress={() => handleClick(value)}>
            <Badge size={25} style={[s.boldText]}>
              {value}
            </Badge>
          </Pressable>
        ))}
      </ScrollView>
    </Card>
  );
}