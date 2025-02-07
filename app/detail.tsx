import { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  Button,
  ScrollView,
  Modal,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import { router, useLocalSearchParams } from "expo-router";
import { useDispatch } from "react-redux";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { addPlant, Plant, updatePlant } from "@/store";
import * as FileSystem from "expo-file-system";
const Detail = () => {
  const params = useLocalSearchParams<Plant>();
  const dispatch = useDispatch();
  const [permission, requestPermission] = useCameraPermissions();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [showCamera, setShowCamera] = useState(false);
  const [photoUri, setUri] = useState("");
  const cameraRef = useRef<CameraView>(null);
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    setUri(params.uri);
    setName(params.name);
    setDescription(params.description);
  }, [params.uri, params.name, params.description]);

  if (!permission) {
    return <View />;
  }

  if (showCamera && !permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <CustomButton
          text="Grant permission"
          onPress={requestPermission}
          backgroundColor="green"
        />
      </View>
    );
  }
  const takePicture = async () => {
    setShowCamera(false);
    const photo = await cameraRef.current?.takePictureAsync();
    if (photo) {
      setUri(photo?.uri);
    }
  };
  const resetData = () => {
    setDescription("");
    setName("");
    setUri("");
  };
  const saveData = () => {
    if (photoUri && name.length > 0) {
      dispatch(
        updatePlant({
          id: params.id,
          uri: photoUri,
          name,
          description,
          date: new Date().toLocaleDateString(),
        })
      );
      router.navigate("/(tabs)");
    }
  };
  return (
    <SafeAreaView style={styles.wrapper}>
      <ScrollView style={styles.camera}>
        <View style={styles.formWrapper}>
          {photoUri ? (
            <Image
              source={{ uri: photoUri }}
              width={150}
              height={150}
              style={styles.image}
            />
          ) : (
            <Image
              source={require("../assets/images/icon-camera.png")}
              style={styles.image}
            />
          )}

          <CustomButton
            text="Open Camera"
            onPress={() => setShowCamera(true)}
            backgroundColor="blue"
          />
          <Modal visible={showCamera} animationType="slide">
            <CameraView style={styles.camera} ref={cameraRef}>
              <CustomButton
                text="Take photo"
                onPress={takePicture}
                style={styles.captureButton}
              />
            </CameraView>
          </Modal>
          <CustomInput
            placeholder="Name"
            type="name"
            onCallback={(text) => {
              setName(text.trim());
            }}
            value={name}
          />
          <CustomInput
            placeholder="Note"
            multiline={true}
            type="note"
            onCallback={(text) => {
              setDescription(text.trim());
            }}
            value={description}
          />
          {errorMessage && (
            <Text style={styles.errorMessage}>{errorMessage}</Text>
          )}
          <CustomButton
            text="Update Plant"
            backgroundColor="green"
            onPress={() => {
              saveData();
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default Detail;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },

  captureButton: {
    position: "absolute",
    bottom: 90,
    alignSelf: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 50,
  },
  buttonText: {
    fontSize: 16,
    color: "#000",
  },

  image: { alignSelf: "center", borderRadius: 8 },
  wrapper: { flex: 1, backgroundColor: "white", padding: 24 },
  formWrapper: { margin: 24 },
  errorMessage: { color: "red", marginTop: 8, fontSize: 16 },
});
