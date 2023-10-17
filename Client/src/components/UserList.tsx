import { useTheme } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

//för att hämta från API

interface UserData {
  id: number;
  username: string;
  password: string;
}
export default function UserList() {
  const [userData, setUserData] = useState<UserData[]>([]);
  const theme = useTheme();

  useEffect(() => {
    const apiEndpoint = process.env.EXPO_PUBLIC_API_URL + "User";

    fetch(apiEndpoint)
      .then((response) => response.json())
      .then((userData) => {
        setUserData(userData);
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  }, []);

  //----------

  return (
    <View>
      <FlatList
        data={userData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <View style={styles.UserContainer}>
              <Text style={{ color: theme.colors.text }}>
                Namn: {item.username}
              </Text>
            </View>
          </View>
        )}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  UserContainer: {
    padding: 4,
  },
  flatListContent: {
    padding: 14,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});
