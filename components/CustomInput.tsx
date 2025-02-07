import {
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
  Text,
} from "react-native";
import React, { useState } from "react";

interface Props {
  onCallback: (text: string) => void;
  style?: ViewStyle;
  type: string;
}

export type CustomInputProps = TextInputProps & Props;
const CustomInput = ({
  style,
  type,
  onCallback,
  ...restProps
}: CustomInputProps) => {
  const [mText, setMText] = useState("");
  const [error, setError] = useState("");
  const handleInput = (func: (value: string) => void, text: string) => {
    func(text);
    setError("");
    onCallback(text);
  };
  const handleOnBlur = () => {
    if (mText.length == 0 && type == "name") {
      setError("This field is required");
    }
  };
  return (
    <View>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholderTextColor="grey"
          onChangeText={(text) => handleInput(setMText, text)}
          value={mText}
          onBlur={handleOnBlur}
          {...restProps}
        />
      </View>
      {error && <Text style={styles.errorMessage}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
    borderWidth: 1,
    padding: 16,
    borderColor: "gray",
    marginTop: 16,
  },
  input: {
    fontSize: 18,
    marginRight: 10,
    paddingVertical: 8,
    // marginLeft: 24,
    color: "black",
  },
  errorMessage: { color: "red", marginTop: 8, fontSize: 16 },
});

export default CustomInput;
