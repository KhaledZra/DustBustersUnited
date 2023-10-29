import { useEffect, useState } from "react";
import { View } from "react-native";
import { Button, TextInput } from "react-native-paper";

import AvatarPicker from "../Components/AvatarPicker";
import { useAppDispatch, useAppSelector } from "../store";
import {
  clearTransientHousehold,
  fetchTransientHousehold,
} from "../store/householdSlice";
import { JoinHouseholdDto } from "../Data/Household";
import { joinHousehold } from "../store/userSlice/thunks";
import s from "../utils/globalStyles";
import { RouteProp, useRoute } from "@react-navigation/native";
import { Controller, useForm } from "react-hook-form";
import { RootStackParamList } from "../Navigators/RootStackNavigator";
import { RootStackScreenProps } from "../../types";

type Props = RootStackScreenProps<"JoinHousehold">;

export default function JoinHousholdScreen({navigation}: Props) {
  const route = useRoute<RouteProp<RootStackParamList, 'JoinHousehold'>>();
  let code: number | undefined;
  if (route.params) {
    const {code: routeCode} = route.params;
    code = routeCode;
  }
  const codeString = code?.toString();
  const dispatch = useAppDispatch();
  const household = useAppSelector((s) => s.household.transientHousehold);
  const [selectedAvatar, setSelectedAvatar] = useState<number>();
  const [displayName, setDisplayName] = useState<string>();

  const {
    control,
    handleSubmit,     
    formState: { errors },      //TODO
  } = useForm<JoinHouseholdDto>({
    defaultValues:{
    code: code
  }});
  
  useEffect(() => {
    if (code) {
      dispatch(fetchTransientHousehold(codeString || ""));
    }
  }, [codeString, dispatch, code]);

  
  
  const handleChangeCode = (textinput: string | undefined) => {
    if (household) dispatch(clearTransientHousehold());
    setDisplayName("");
    if (!textinput || textinput.length !== 4 || isNaN(parseInt(textinput))) return;
    dispatch(fetchTransientHousehold(textinput));
  };

  const handleJoinPress = () => {
    if (!household || !displayName || !selectedAvatar) return;
    let dto: JoinHouseholdDto = {
      userId: 0, // we'll let the thunk figure this out from current state
      householdId: household.id,
      code: household.code,
      displayName: displayName,
      avatar: selectedAvatar,
      isAdmin: false,         //TODO skaparen av household borde bli admin 
    };
    if(code){
      dto.isAdmin = true;
    }

    dispatch(joinHousehold(dto));
    navigation.navigate("ChoreList")
  };

  return (
    <View style={[s.flex1, s.justifyBetween, s.p16]}>
      <View>
        <View>
        <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="kod:  (3091)"
                onChangeText={(text)=> {
                  onChange(text);
                  handleChangeCode(text);
                }}
                onBlur={onBlur}
                value={(value || '').toString()}
              />
            )}
            name="code"
            rules={{ required: true }}
          />
        </View>

        {household && (
          <AvatarPicker
            household={household}
            selected={selectedAvatar}
            onSelect={setSelectedAvatar}
          />
        )}
        {household && (
          <View>
            <TextInput
              label="Display-namn"              
              onChangeText={(text) => setDisplayName(text)}
            />
          </View>
        )}
      </View>
      <Button
        mode="contained"
        disabled={
          !household ||
          !selectedAvatar ||
          !displayName ||
          displayName?.length == 0
        }
        onPress={handleSubmit(handleJoinPress)}
      >
        Gå med
      </Button>
    </View>
  );
}