import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import { colors } from "../configs/common_styles";

const { width, height } = Dimensions.get("window");

export default props => {
    const { product } = props;
    return (
        <View style={styles.card}>
            <View style={styles.imageArea}>
                {product.photo ? (
                    <Image style={styles.image} source={{ uri: product.photo.photo_url }} />
                ) : (
                    <Text style={styles.noImageText}>Nenhuma Imagem disponível</Text>
                )}
                {product.onSale ? <Text style={styles.onSaleText}>Promoção</Text> : null}
            </View>
            <View style={styles.textArea}>
                <Text style={styles.prodName}>{product.name.toUpperCase()}</Text>

                {product.userWhoPostedType === "costumer" ? (
                    <Text style={styles.prodPrice}>{`Valor pago: R$ ${parseFloat(
                        Math.round(product.price * 100) / 100
                    ).toFixed(2)}`}</Text>
                ) : (
                    <Text style={styles.prodPrice}>{`Preço: R$ ${parseFloat(
                        Math.round(product.price * 100) / 100
                    ).toFixed(2)}`}</Text>
                )}

                {product.userWhoPostedType === "costumer" ? (
                    <Text style={styles.prodPlace} numberOfLines={2}>{`Comprado na: ${
                        product.whereToBuy
                    }`}</Text>
                ) : (
                    <Text style={styles.prodPlace}>{`Onde comprar: ${product.whereToBuy}`}</Text>
                )}

                <Text style={styles.postedBy}>{`Postado por: ${product.userWhoPostedName}`}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        width: width - 15,
        height: (height * 25) / 100,
        flexDirection: "row",
        alignSelf: "center",
        marginTop: 2,
        marginBottom: 4,
        backgroundColor: colors.white,
        shadowOffset: { width: 0, height: 2 },
        shadowColor: colors.fieryrose,
        shadowOpacity: 0.9,
        shadowRadius: 5,
        elevation: 7
    },
    imageArea: {
        width: (width * 30) / 100
    },
    image: {
        width: (width * 25) / 100,
        height: (height * 15) / 100,
        marginTop: 12,
        margin: 8
    },
    noImageText: {
        fontSize: 14,
        textAlign: "center",
        color: colors.queenblue
    },
    onSaleText: {
        textAlign: "center",
        fontSize: 14,
        color: colors.pistachio,
        fontWeight: "bold"
    },
    textArea: {
        flex: 1,
        alignItems: "center"
    },
    prodName: {
        marginTop: 15,
        margin: 2,
        fontSize: 20,
        fontWeight: "bold",
        color: colors.fieryrose,
        textAlign: "center"
    },
    prodPrice: {
        margin: 4,
        fontSize: 16,
        color: colors.metallicseaweed,
        textAlign: "center"
    },
    prodPlace: {
        margin: 2,
        fontSize: 14,
        color: colors.metallicseaweed,
        textAlign: "center"
    },
    postedBy: {
        margin: 2,
        position: "absolute",
        bottom: 5,
        right: 5,
        fontSize: 14,
        color: colors.metallicseaweed,
        textAlign: "center"
    }
});
