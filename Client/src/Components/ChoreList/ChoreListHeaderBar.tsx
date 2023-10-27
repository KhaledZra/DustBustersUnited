import { Appbar } from "react-native-paper";

export default function ChoreListHeaderBar() {
    return (
      <Appbar.Header statusBarHeight={0}>
        <Appbar.BackAction
          onPress={() => {
            console.log("day before navigation");
          }}
        />
        <Appbar.Content
          title="Day-Placeholder"
          titleStyle={{ textAlign: "center" }}
        />
        <Appbar.Action
          icon="arrow-right"
          onPress={() => {
            console.log("day after navigation");
          }}
        />
      </Appbar.Header>
    );
  }