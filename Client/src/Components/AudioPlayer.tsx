import * as React from 'react';
import { View, StyleSheet} from 'react-native';
import { Audio } from 'expo-av';
import { Button } from 'react-native-paper';

type Props = { audioUri: string, choreId: Number};
export default function AudioPlayer(audioProps: Props) {
  const [sound, setSound] = React.useState<Audio.Sound>();

  async function playSound() {
    console.log('Loading Sound');
    console.log("${audioProps.audioUri}/sample.mp4");
    const { sound } = await Audio.Sound.createAsync({uri: `${audioProps.audioUri}/sample.mp4`}); // chore-${audioProps.choreId}.mp3
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync();
  }

  async function stopSound() {
    sound?.unloadAsync();
  }

  React.useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View>
      <Button 
        mode="contained"
        icon="record"
        onPress={playSound}>
            Play Sound
      </Button>
      <Button 
        mode="contained"
        icon="stop"
        onPress={stopSound}>
            Stop Sound
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 10,
  },
});
