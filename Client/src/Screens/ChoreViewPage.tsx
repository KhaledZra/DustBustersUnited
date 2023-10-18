import { View, StyleSheet, Dimensions } from "react-native";
import { Badge, Button, Card, List, Text } from "react-native-paper";
import { mockChores } from "../Data/MockData/ChoreMockData";
import { getDaysSinceLastDone } from "./HouseholdScreen";
import { useNavigation } from "@react-navigation/native";

const screenDimensions = Dimensions.get("screen");

export default function ChoreViewPage() {
  const chore = mockChores[0];
  const navigation = useNavigation();

  navigation.setOptions({
    title: chore.name,
  });

  return (
    <Card style={styles.myCard}>
      <Card.Content>
        <Text variant="displaySmall" style={styles.descriptionText}>
          <Text style={styles.boldText}>Beskrivning:</Text> {chore.description}
        </Text>

        <View style={styles.space} />
        <Text variant="displaySmall" style={styles.daysSinceLastText}>
          <Text style={styles.boldText}>Sist Avklarat:</Text>{" "}
          {getDaysSinceLastDone(chore.deadline, chore.repeatInterval)} dagar sen
        </Text>

        <View style={styles.centeredContainer}>
          <View style={styles.valueContainer}>
            <List.Item
              title={
                <Text style={styles.boldText}>
                  Värde:
                  <Badge style={styles.badeStyle}>
                    {getDaysSinceLastDone(chore.deadline, chore.energy)}
                  </Badge>
                </Text>
              }
              description="Hur energiekrävande är sysslan?"
            />
          </View>
        </View>
      </Card.Content>

      <View style={styles.buttonContainer}>
        <Button
          icon="plus-circle-outline"
          mode="contained"
          onPress={() => console.log("Avklarat")}
          style={styles.button}
          labelStyle={styles.avklaratText}
        >
          Avklarat
        </Button>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  descriptionText: {
    textAlign: "center",
    marginTop: 40,
    marginBottom: 10,
    fontSize: 26,
  },
  daysSinceLastText: {
    textAlign: "center",
    marginBottom: 40,
    marginTop: 10,
    fontSize: 26,
  },
  valueText: {
    textAlign: "center",
    fontSize: 26,
  },
  buttonContainer: {
    alignItems: "center",
    marginTop: 200,
  },
  space: {
    height: 20,
  },
  button: {
    width: screenDimensions.width / 2,
    borderRadius: 20,
    padding: 5,
  },
  avklaratText: {
    fontWeight: "bold",
  },
  myCard: {
    height: screenDimensions.height,
  },
  valueContainer: {
    backgroundColor: "#FFF",
    padding: 2,
    borderRadius: 10,
    width: screenDimensions.width * 0.8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  centeredContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  boldText: {
    fontWeight: "bold",
  },
  badeStyle: {
    paddingLeft: 20,
    backgroundColor: "grey",
  },
});
