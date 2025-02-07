import {
  Image,
  StyleSheet,
  View,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";
import { Plant, RootState } from "@/store";

export default function HomeScreen() {
  const router = useRouter();
  const plants = useSelector((state: RootState) => state.plants.plants);
  const renderItem = ({ item }: { item: Plant }) => (
    <TouchableOpacity
      style={styles.itemWrapper}
      onPress={() => {
        router.navigate({
          pathname: "/detail",
          params: {
            id: item.id,
            uri: item.uri,
            name: item.name,
            description: item.description,
          },
        });
      }}
    >
      <Image
        source={{ uri: item.uri }}
        style={styles.image}
        width={150}
        height={150}
      />
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.text}>Description: {item.description}</Text>
      <Text style={styles.text}>Date: {item.date}</Text>
    </TouchableOpacity>
  );
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        {plants.length > 0 ? (
          <FlatList
            data={plants}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
          />
        ) : (
          <View style={styles.noItem}>
            <Text>You don't have any plants</Text>
          </View>
        )}

        <View style={styles.button}>
          <CustomButton
            text="Add Plant"
            backgroundColor="green"
            onPress={() => {
              router.navigate("/scan");
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  itemWrapper: {
    margin: 8,
    borderColor: "grey",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
  },
  image: { alignSelf: "center", borderRadius: 8 },
  title: { fontWeight: "700", marginVertical: 8, fontSize: 24 },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  noItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    justifyContent: "center",
    padding: 8,
    marginBottom: 40,
  },
  wrapper: { flex: 1 },
  text: { fontSize: 16 },
});
