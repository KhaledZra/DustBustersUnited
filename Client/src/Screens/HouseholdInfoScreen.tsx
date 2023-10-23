import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { useAppDispatch, useAppSelector } from "../store";
import { deleteProfile } from "../store/householdSlice";

export default function HouseholdInfoScreen() {
  const profiles = useAppSelector((state) => state.user.profiles);
  const avatars = useAppSelector((state) => state.household.avatars);
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const householdCode = useAppSelector(
    (state) => state.household.transientHousehold
  );
  const handleLeaveHousehold = () => {
    dispatch(deleteProfile());
    navigation.navigate("PickHousehold");
  }

  useEffect(() => {
    dispatch(deleteProfile());
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hushållsmedlemmar</Text>
      {profiles.map((p) => {
        const profileAvatar = avatars.find((avatar) => avatar.id === p.id);
        return (
          <Button
            style={styles.button}
            labelStyle={[styles.buttonText, { fontSize: 18 }]}
            key={p.id}
            onPress={() => navigation.navigate("Profile")}
          >
            {profileAvatar ? profileAvatar.avatar : null} {p.displayName}
          </Button>
        );
      })}
      <View style={styles.centeredBox}>
        <Text style={[styles.title, { fontSize: 20 }]}>
          Kod för att gå med i hushåll
        </Text>
        <Text style={styles.codeBox}>
          {householdCode ? householdCode.code : " "}
        </Text>
      </View>

      <Button
        style={styles.bottomBox}
        labelStyle={styles.buttonText}
        onPress={handleLeaveHousehold}
      >
        Lämna hushåll
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightgray",
  },
  title: {
    fontSize: 26,
    marginTop: 20,
    textAlign: "center",
  },
  button: {
    paddingVertical: 10,
    backgroundColor: "white",
    margin: 10,
  },
  buttonText: {
    color: "black",
  },
  arrow: {
    color: "black",
    fontSize: 20,
    left: "auto",
  },
  codeBox: {
    paddingVertical: 7,
    width: 150,
    backgroundColor: "white",
    borderRadius: 15,
    fontSize: 60,
  },
  centeredBox: {
    flex: 1,
    alignItems: "center",
  },
  bottomBox: {
    paddingVertical: 10,
    backgroundColor: "white",
    margin: 10,
  },
});
