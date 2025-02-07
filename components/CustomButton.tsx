import { StyleSheet, ViewStyle, Text, TouchableOpacity } from "react-native";
import React from "react";

interface Props {
  style?: ViewStyle;
  text: string;
  backgroundColor?: string;
  onPress?: () => void;
}

const CustomButton = ({ style, text, backgroundColor, onPress }: Props) => {
  const textColor = backgroundColor ? "white" : "black";
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: backgroundColor }, style]}
      onPress={onPress}
    >
      <Text style={[styles.text, { color: textColor }]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 16,
    borderRadius: 30,
    marginTop: 16,
  },
  text: { fontSize: 16, textAlign: "center" },
});

export default CustomButton;
