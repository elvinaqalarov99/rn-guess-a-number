import React from "react";
import { StyleSheet, Text, View } from "react-native";
import colors from "../constants/colors";

const Number = (props) => {
  return (
    <View style={styles.guess}>
      <Text style={styles.guessText}>{props.currentGuess}</Text>
    </View>
  );
};

export default Number;

const styles = StyleSheet.create({
  guess: {
    borderRadius: 10,
    borderColor: colors.secondary,
    borderWidth: 2,
    padding: 15,
    marginVertical: 20,
  },
  guessText: {
    fontSize: 20,
    color: colors.secondary,
    fontFamily: "open-sans-bold",
  },
});
