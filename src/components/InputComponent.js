import React, { Component } from "react";
import { View, Text, TextInput, StyleSheet, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { colors } from "../configs/common_styles";

const { width } = Dimensions.get("window");

export default props => {
  return (
    <View style={[styles.textInputArea, props.special ? styles.specialInputArea : null]}>
      <Icon name={props.icon} size={20} style={styles.icon} />
      <TextInput
        {...props}
        returnKeyType={props.returnKeyType}
        style={[styles.input, props.style]}
        autoCapitalize="none"
        numberOfLines={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textInputArea: {
    flexDirection: "row",
    width: (width * 80) / 100,
    height: 45,
    margin: 5,
    marginTop: 15,
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: colors.nyanza,
    alignItems: "center",
    justifyContent: "flex-start"
  },
  specialInputArea: {
    width: "45%"
  },
  input: {
    fontSize: 16,
    marginLeft: 5,
    color: colors.nyanza
  },
  icon: {
    color: colors.fieryrose,
    marginLeft: 5,
    marginRight: 5
  }
});
