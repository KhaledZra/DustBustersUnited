import { Button, TextInput } from "react-native-paper";
import { View } from "react-native";

import { RootStackScreenProps } from "../../types";
import { Controller, SubmitHandler, useController, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../store";
import { addHousehold, updateHouseholdName } from "../store/householdSlice";
import { AddHouseholdDTO, Household} from "../Data/Household";

type Props = RootStackScreenProps<"AddEditHoushold">;
type HouseholdForm = Omit<Household, "id" | "code" | "availableAvatars"> & {id?:number}

export default function AddEditHousholdScreen({ route, navigation }: Props) {
  const dispatch = useAppDispatch();
  const { household } = route.params;
  const isEdit = Boolean(household);
  const user = useAppSelector((state) => state.user.user);
  let initialHousehold : HouseholdForm =  {
    id: undefined,
    owner: user!,
    name: "",
  }

  if(household){
    initialHousehold = {...household}
  }
  
  const {
    control,
    handleSubmit,
  } = useForm<Household>({
    defaultValues: initialHousehold
  });
  const { field: nameField } = useController({ control, name: "name"})
  const onSubmit: SubmitHandler<Household> = async (data) => {
    
    if (isEdit) {
      data.id = household!.id;
      dispatch(updateHouseholdName(data))
      navigation.navigate("ChoreList");
    } else {
      const addHouseholdDto: AddHouseholdDTO = {
        Name: data.name,
        OwnerId: data.owner.id,
      };
      const response = await dispatch(addHousehold(addHouseholdDto));
      const householdResponce = response.payload as Household;
      const code = householdResponce.code;
      navigation.navigate("JoinHousehold", { code });
    }
  };

  return (
    <View style={{ padding: 16, gap: 16 }}>
      <Controller
        control={control}
        render={({ field: { onBlur } }) => (
          <TextInput
            label="Hushållets namn"
            value={nameField.value}
            onChangeText={nameField.onChange}
            onBlur={onBlur}
          />
        )}
        name="name"
        rules={{
          required: "Namn är obligatoriskt",
          minLength: {
            value: 2,
            message: "Namnet måste vara minst 2 tecken",
          },
        }}
      />
      <Button mode="contained" onPress={handleSubmit(onSubmit)}>
      {isEdit ? "Uppdatera namn" : "Skapa"}
      </Button>
    </View>
  );
}
