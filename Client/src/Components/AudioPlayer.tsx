import * as React from "react";
import { View, StyleSheet } from "react-native";
import { Audio } from "expo-av";
import { Button, Text } from "react-native-paper";
import s from "../utils/globalStyles";

type Props = { audioUri: string; choreId: Number };
export default function AudioPlayer(audioProps: Props) {
  const [sound, setSound] = React.useState<Audio.Sound>();
  const [showButton, setShowButton] = React.useState<Boolean>(false);

  React.useEffect(() => {
    const createSound = async () => {
      try {
        const { sound } = await Audio.Sound.createAsync({
            uri: `${audioProps.audioUri}/chore-${audioProps.choreId}.m4a`,
          });
          setSound(sound);
          sound!.setOnPlaybackStatusUpdate((status) => {
            if (status.isLoaded) setShowButton(true);
          });
      } catch (error) {
        console.log("Error loading sound");
      }
    };
    createSound();

  }, []);

  async function playSound() {
    console.log("Loading Sound");
    try {
      const { sound } = await Audio.Sound.createAsync({
        uri: `${audioProps.audioUri}/chore-${audioProps.choreId}.m4a`,
      });
      setSound(sound);
      console.log("Playing Sound");
      await sound.playAsync();
    } catch (error) {
    
    }
  }

  async function stopSound() {
    sound?.unloadAsync();
  }
  React.useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View>
      {showButton && (
        <View style={[s.row, s.gap4]}>
          <Button mode="contained" icon="record" onPress={playSound}>
            Play Sound
          </Button>
          <Button mode="contained" icon="stop" onPress={stopSound}>
            Stop Sound
          </Button>
        </View>
      )}

      {!showButton && (
        <View>
          <Text>Finns inget ljudinspelning!</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    padding: 10,
  },
});
