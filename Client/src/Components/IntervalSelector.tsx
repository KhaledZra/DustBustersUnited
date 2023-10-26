import { useState } from "react";
import { Control, useController } from "react-hook-form";
import { Pressable, ScrollView, View } from "react-native";
import { Badge, Card, Text } from "react-native-paper";
import { Chore, ChoreDto } from "../Data/Chore";
import s from "../utils/globalStyles";

type Props = {
  name: "repeatInterval";
  control: Control<Chore>;
};

export default function IntervalSelector({ name, control }: Props) {
  const { field } = useController({ control, defaultValue: 1, name });
  const [isPresentation, setIsPresentation] = useState(true);

  const handleClick = (selectedValue: number) => {
    field.onChange(selectedValue);
    setIsPresentation(true);
  };

  if (isPresentation) {
    return (
      <Card>
        <Pressable onPress={() => setIsPresentation(false)}>
          <View style={[s.row, s.justifyBetween, s.alignCenter, s.p16]}>
            <Text style={s.boldText}>Återkommer:</Text>
            <View style={[s.row, s.gap2, s.alignCenter]}>
              <Text>var</Text>
              <Badge style={s.boldText}>{field.value}</Badge>
              <Text>dag</Text>
            </View>
          </View>
        </Pressable>
      </Card>
    );
  }

  return (
    <Card>
      <ScrollView horizontal contentContainerStyle={[s.row, s.p16, s.gap4]}>
        {Array.from(Array(31)).map((_, index) => (
          <Text onPress={() => handleClick(index + 1)}>{index + 1}</Text>
        ))}
      </ScrollView>
    </Card>
  );
}
