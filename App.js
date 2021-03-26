import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, View, Platform, StatusBar as ST } from "react-native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

import Header from "./components/Header";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [numOfGuesses, setCounter] = useState(0);
  const [loading, setLoading] = useState(false);

  if (!loading) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setLoading(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
  };

  const closeGameHandler = () => {
    setUserNumber(null);
    setCounter(0);
  };

  const deviceWon = (counter) => {
    setCounter(counter);
  };

  let content;

  if (userNumber && numOfGuesses <= 0) {
    content = (
      <GameScreen
        deviceWon={deviceWon}
        closeGameHandler={closeGameHandler}
        userChoice={userNumber}
      />
    );
  } else {
    content = <StartGameScreen start={startGameHandler} />;
  }

  if (numOfGuesses > 0) {
    content = (
      <GameOverScreen
        numOfGuesses={numOfGuesses}
        restart={closeGameHandler}
        result={userNumber}
      />
    );
  }

  return (
    <View style={styles.screen}>
      <View style={styles.statusBar}></View>
      <Header title="Guess A Number" />
      {content}
      <StatusBar style="black" />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  statusBar: {
    height:
      Platform.OS === "android" || Platform.OS === "ios"
        ? ST.currentHeight
        : 40,
    backgroundColor: "#f7287b",
  },
});
