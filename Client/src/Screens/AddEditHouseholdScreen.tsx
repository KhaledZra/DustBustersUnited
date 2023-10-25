import { Button, TextInput } from "react-native-paper";
import { View } from "react-native";

import { RootStackScreenProps } from "../../types";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../store";
import { addHousehold } from "../store/householdSlice";
import { User } from "../Data/User";
import { AddHouseholdDTO } from "../Data/Household";

type Props = RootStackScreenProps<"AddEditHoushold">;

export default function AddEditHousholdScreen({navigation}: Props) {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state)=> state.user.user?.id)
  
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<AddHouseholdDTO>();

  const onSubmit: SubmitHandler<AddHouseholdDTO> =async (data) => {
    if (user) {
      data.OwnerId = user;
    }else {return}
    await dispatch(addHousehold(data))
    // navigation.navigate("JoinHousehold", {code: data.});

  }
  
  return (
    <View style={{ padding: 16, gap: 16 }}>
       <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Hushållets namn"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
            name="Name"
            rules={{
              required: "Namn är obligatoriskt",
              minLength: {
                value: 2,
                message: "Namnet måste vara minst 2 tecken",
              },
            }}
          />
      <Button mode="contained" onPress={handleSubmit(onSubmit)}>Skapa</Button>
    </View>
  );
}
