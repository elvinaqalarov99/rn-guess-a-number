import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal as ModalComponent,
  Button,
  StatusBar as ST,
} from "react-native";
import Colors from "../constants/colors";
import Number from "./Number";
import DefaultStyles from "../constants/default-styles";
const Modal = (props) => {
  return (
    <View style={styles.centeredView}>
      <ModalComponent
        animationType="fade"
        transparent={true}
        visible={props.visible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={[styles.modalText, DefaultStyles.bodyText]}>
              Selected Number
            </Text>
            <Number currentGuess={props.selectedNumber} />

            <View style={props.buttonContainerStyle}>
              <View style={props.buttonStyle}>
                <Button
                  title="Close"
                  onPress={props.setVisible}
                  color={Colors.closeModal}
                />
              </View>
              <View style={styles.button}>
                <Button
                  title="Start The Game!"
                  onPress={() => props.start(props.selectedNumber)}
                  color={Colors.primary}
                />
              </View>
            </View>
          </View>
        </View>
      </ModalComponent>
    </View>
  );
};

export default Modal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary,
  },
  modalView: {
    margin: 20,
    top: -ST.currentHeight,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    textAlign: "center",
    fontSize: 18,
    color: "black",
  },
});
