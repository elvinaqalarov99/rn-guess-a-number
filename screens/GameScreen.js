import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, Text, View, Button, Alert, FlatList } from "react-native";
import Card from "../components/Card";
import Number from "../components/Number";
import colors from "../constants/colors";
import DefaultStyles from "../constants/default-styles";
import MainButton from "../components/Button";
import { FontAwesome5 } from "@expo/vector-icons";

const generateRandomBetween = (min, max, exclude) => {
  const minNumber = Math.ceil(min);
  const maxNumber = Math.floor(max);
  const rndNumber =
    Math.floor(Math.random() * (maxNumber - minNumber)) + minNumber;
  if (rndNumber == exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNumber;
  }
};

const GameScreen = (props) => {
  const [currentGuess, setCurrentGuess] = useState(
    generateRandomBetween(1, 100, userChoice)
  );
  const [allGuesses, setAllGuesses] = useState([
    { id: (Math.random() + Math.random()).toString(), number: currentGuess },
  ]);
  const currentLow = useRef(1);
  const currentHigh = useRef(100);
  const counter = useRef(0);
  const { userChoice, deviceWon, closeGameHandler } = props;

  useEffect(() => {
    if (currentGuess === userChoice) {
      deviceWon(counter.current);
    }
  }, [currentGuess]);

  const nextGuess = (direction) => {
    if (
      (direction === "lower" && userChoice > currentGuess) ||
      (direction === "greater" && userChoice < currentGuess)
    ) {
      Alert.alert("Don't lie!", "You know that this is wrong...", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }

    if (direction === "lower") {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess;
    }

    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextNumber);
    setAllGuesses((prev) => [
      ...prev,
      { id: (Math.random() + Math.random()).toString(), number: nextNumber },
    ]);
    counter.current += 1;
  };

  const GuessedNumber = (props) => (
    <View style={styles.guessedNumber}>
      <Text style={{ color: "white", fontWeight: "bold" }}>#{props.id}</Text>
      <Text style={{ color: "white", fontWeight: "bold" }}>{props.number}</Text>
    </View>
  );

  return (
    <View style={styles.screen}>
      <Text style={[styles.title, DefaultStyles.HeaderText]}>
        Opponent's Guess
      </Text>
      <Number currentGuess={currentGuess} />
      <Card style={styles.buttonContainer}>
        <View style={styles.button}>
          <MainButton
            style={{ backgroundColor: "red" }}
            onPress={() => {
              nextGuess("lower");
            }}
          >
            <FontAwesome5 name="arrow-circle-down" size={20} color="white" />
          </MainButton>
        </View>
        <View style={styles.button}>
          <MainButton
            style={{ backgroundColor: "blue" }}
            onPress={() => {
              nextGuess("greater");
            }}
          >
            <FontAwesome5 name="arrow-circle-up" size={20} color="white" />
          </MainButton>
        </View>
      </Card>
      <View style={styles.mainButton}>
        <Button
          title="RETURN TO THE MAIN SCREEN"
          color={colors.primary}
          onPress={() => closeGameHandler()}
        />
      </View>
      <FlatList
        contentContainerStyle={{ width: "80%", maxWidth: "80%" }}
        data={allGuesses}
        renderItem={(number) => (
          <GuessedNumber id={number.index + 1} number={number.item.number} />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    width: "80%",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  button: {
    width: 100,
  },
  mainButton: {
    marginVertical: 10,
    width: "80%",
  },
  title: {
    fontSize: 18,
  },
  guessedNumber: {
    width: "100%",
    backgroundColor: colors.secondary,
    height: 40,
    marginBottom: 5,
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 3,
    flexDirection: "row",
    padding: 10,
  },
});
