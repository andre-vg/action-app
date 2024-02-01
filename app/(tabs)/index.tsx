import { StyleSheet } from "react-native";
import { Link } from "expo-router";
import { Button, ButtonText, View, Text, Heading } from "@gluestack-ui/themed";

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Text lineHeight={"$lg"} letterSpacing={"$xs"}>
        Tab One
      </Text>
      <View style={styles.separator} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
