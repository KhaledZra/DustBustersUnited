import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, PaperProvider, TextInput } from "react-native-paper";

export default function JoinHousholdScreen() {
    const [text, setText] = useState("");

    return (
        <PaperProvider>
            <View>
                <TextInput
                    label="kod:"
                    onChangeText={text => setText(text)}
                />
            </View>
            <View style={styles.requestButton}>
                <Button mode="contained" onPress={() => console.log("skcika förfrågan")}>
                    Skicka förfrågan
                </Button>
            </View>
            <View>
                <TextInput
                    label="Välj avatar:"
                    onChangeText={text => setText(text)}
                />
            </View>
            <View>
                <TextInput
                    label="Välj display namn:"
                    onChangeText={text => setText(text)}
                />
            </View>
            <View style={styles.joinButton}>
                <Button mode="contained" onPress={() => console.log("Gå med")}>
                    Gå med
                </Button>
            </View>
        </PaperProvider>
    )
}

const styles = StyleSheet.create({
    requestButton: {
        padding: 10,
    },
    joinButton: {
        marginTop: 100,
        padding: 60,
    },
});