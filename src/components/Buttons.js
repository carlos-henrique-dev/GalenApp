import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { colors } from "../configs/common_styles";
const { height, width } = Dimensions.get("window");
export default props => {
    return (
        <TouchableOpacity onPress={() => props.navigate_func()}>
            <View style={styles.container}>
                <Text style={styles.text} numberOfLines={5}>
                    {props.title}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: width - 20,
        height: height / 10,
        backgroundColor: colors.nyanza,
        justifyContent: "center",
        alignItems: "center",
        margin: 5,
        padding: 10
    },
    text: {
        flex: 0.8,
        fontSize: 18,
        color: colors.fieryrose,
        textAlign: "center",
        flexWrap: "wrap"
    }
});
