import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import colors from "../constants/colors";

const Button = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={{ ...styles.button, ...props.style }}>
        <Text style={styles.txt}>{props.children}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 25,
  },
  txt: {
    textAlign: "center",
    color: "#fff",
  },
});
