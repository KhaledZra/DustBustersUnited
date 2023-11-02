import * as React from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";
import { Audio } from "expo-av";
import s from "../utils/globalStyles";

type Props = { onAudioSelected: (uri: string) => void };
export default function AudioHandler(audioProps: Props) {
    const [recording, setRecording] = React.useState<Audio.Recording>();


  async function startRecording() {
    try {
      console.log("Requesting permissions..");
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log("Starting recording..");
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      console.log("Recording started");
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording() {
    console.log("Stopping recording..");
    setRecording(undefined);
    await recording!.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });
    {recording && recording.getURI && audioProps.onAudioSelected(recording.getURI()!.toString())}
    const uri = recording!.getURI();
    console.log("uri:", uri);
  }

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button
        mode="contained"
        icon="record"
        onPress={recording ? stopRecording : startRecording}
        style={[s.br20, s.p6, s.mb10]}
      >
        {recording ? "Stop Recording" : "Start Recording"}
      </Button>
    </View>
  );
}
