import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { colors } from "../configs/common_styles";

const { width } = Dimensions.get("window");

export default props => {
    const { product } = props;
    return (
        <View style={styles.card}>
            <Text style={styles.title}>Produto</Text>
            <Text style={styles.title}>{product.name}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        width: width - 10,
        height: 60,
        marginTop: 5,
        backgroundColor: colors.queenblue,
        alignSelf: "center"
    },
    title: {
        fontSize: 18,
        color: colors.fieryrose,
        textAlign: "center"
    }
});
