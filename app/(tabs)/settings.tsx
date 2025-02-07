import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Setting() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Setting Screen</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: { fontWeight: "700", marginVertical: 8 },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
    // marginBottom: 40,
  },
});
