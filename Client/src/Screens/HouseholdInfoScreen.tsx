import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { ScrollView, View } from "react-native";
import { Button, Text } from "react-native-paper";
import ProfileView from "../Components/HouseholdInfo/ProfileView";
import { useAppDispatch, useAppSelector } from "../store";
import { deleteProfile, getHouseholdProfiles } from "../store/householdSlice";
import s from "../utils/globalStyles";
import { selectIsAdmin } from "../store/userSlice";
import { RootStackScreenProps } from "../../types";
import { useThemeContext } from "../themes/ThemeContext";
import {
  selectActiveHousehold,
  selectProfiles,
  selectRequestProfiles,
} from "../store/householdSlice/selectors";

type props = RootStackScreenProps<"HouseholdInfo">;

export default function HouseholdInfoScreen({ navigation }: props) {
  const dispatch = useAppDispatch();
  const requests = useAppSelector(selectRequestProfiles);
  const isAdmin = useAppSelector(selectIsAdmin);
  const profiles = useAppSelector(selectProfiles);
  const household = useAppSelector(selectActiveHousehold);

  const { theme } = useThemeContext();
  const handleLeaveHousehold = () => {
    dispatch(deleteProfile());
    navigation.navigate("PickHousehold");
  };
  useEffect(() => {
    dispatch(getHouseholdProfiles());
  }, []);

  return (
    <View style={[s.flex1]}>
      <ScrollView>
        <View style={[s.mb7]}>
          <Text style={[s.fs26, s.mt16, s.textCenter]}>Hushållsmedlemmar</Text>
          <View>
            {profiles &&
              profiles.length > 0 &&
              profiles.map((p) => <ProfileView profile={p} key={p.id} />)}
          </View>

          <View style={[s.flex1, s.alignCenter]}>
            <Text style={[s.fs26, s.mt16, s.textCenter]}>
              Kod för att gå med i hushåll
            </Text>
            <View style={[s.mv10]} />
            <Text
              style={[
                s.pv2,
                s.w150,
                { backgroundColor: theme.colors?.primary },
                s.br20,
                s.fs60,
                s.textCenter,
                { color: theme.colors?.onSurface },
              ]}
            >
              {household?.code}
            </Text>
          </View>

          {requests && requests.length > 0 && (
            <View>
              <Text style={[s.fs26, s.mt16, s.textCenter]}>Förfrågningar</Text>
              {requests.map((p) => (
                <ProfileView profile={p} key={p.id} />
              ))}
            </View>
          )}
        </View>
      </ScrollView>
      {isAdmin && (
        <Button
          style={[s.pv2, s.bgColWhite, s.m10]}
          labelStyle={[s.colBlack]}
          onPress={() => navigation.navigate("AddEditHoushold", { household })}
        >
          Redigera namn
        </Button>
      )}
      <Button
        style={[s.pv2, s.bgColWhite, s.m10]}
        labelStyle={[s.colBlack]}
        onPress={handleLeaveHousehold}
      >
        Lämna hushåll
      </Button>
    </View>
  );
}
