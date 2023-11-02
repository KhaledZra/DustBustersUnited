import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Image, View } from "react-native";
import { Button } from "react-native-paper";
import s from "../utils/globalStyles";

type Props = { onImageSelected: (image: ImagePicker.ImagePickerAsset) => void };
export default function ImageSelector({ onImageSelected }: Props) {
  const [image, setImage] = useState<string>();

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri);
      onImageSelected(result.assets[0]);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button
        mode="contained"
        icon="plus-circle-outline"
        onPress={pickImage}
        style={[s.br20, s.p6, s.mb10]}
      >
        Lägg till en bild
      </Button>

      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}
    </View>
  );
}
