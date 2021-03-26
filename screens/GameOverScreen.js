import React from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  StatusBar as ST,
  Image,
} from "react-native";
import Number from "../components/Number";
import colors from "../constants/colors";

const GameOver = (props) => {
  return (
    <View style={styles.screen}>
      <Text style={styles.text}>The Game is Over!</Text>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require("../assets/success.png")}
          resizeMode="cover"
        />
      </View>
      <Text style={styles.text1}>The Number was</Text>
      <Number currentGuess={props.result} />
      <Text style={styles.text2}>
        It was guessed in {props.numOfGuesses} Guesses
      </Text>
      <View>
        <Button
          title="Start again!"
          onPress={props.restart}
          color={colors.primary}
        />
      </View>
    </View>
  );
};

export default GameOver;

const styles = StyleSheet.create({
  screen: {
    padding: 10,
    flex: 1,
    alignItems: "center",
  },
  text: {
    color: colors.primary,
    fontSize: 20,
  },
  text1: {
    color: colors.primary,
    fontSize: 18,
  },
  text2: {
    color: colors.closeModal,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  imageContainer: {
    borderRadius: 150,
    marginVertical: 10,
    borderWidth: 3,
    borderColor: "black",
    overflow: "hidden",
    width: 300,
    maxWidth: "80%",
    height: 300,
    maxWidth: "80%",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
