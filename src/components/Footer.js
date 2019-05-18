import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "../configs/common_styles";

export default props => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={props.navigate}>
        <View style={[styles.button, { backgroundColor: colors.lightcarminepink }]}>
          <Text style={styles.buttonText}>{props.title1}</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => props.signup()}>
        <View style={[styles.button, { backgroundColor: colors.pistachio }]}>
          <Text style={styles.buttonText}>{props.title2}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignSelf: "center",
    bottom: "1%"
  },
  button: {
    width: 160,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
    marginTop: 2
  },
  buttonText: {
    alignSelf: "center",
    fontSize: 18,
    color: colors.nyanza
  }
});
