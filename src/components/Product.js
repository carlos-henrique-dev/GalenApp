import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from "react-native";
import Swipeable from "react-native-swipeable";
import { colors } from "../configs/common_styles";
import Ionicons from "react-native-vector-icons/Ionicons";

const { width, height } = Dimensions.get("window");

export default props => {
    const { product, onRemove, onEdit, swipe, publicList, openUserList } = props;

    const rightButtons = [
        <TouchableOpacity style={styles.swipeableButtons} onPress={() => onEdit(product._id)}>
            <View>
                <Ionicons
                    name="ios-create"
                    size={40}
                    color={colors.queenblue}
                    style={{ paddingLeft: 3 }}
                />
                <Text style={{ color: colors.queenblue, paddingTop: 5 }}>Editar</Text>
            </View>
        </TouchableOpacity>,
        <TouchableOpacity style={styles.swipeableButtons} onPress={() => onRemove(product._id)}>
            <View>
                <Ionicons
                    name="ios-trash"
                    size={40}
                    color={colors.lightcarminepink}
                    style={{ paddingLeft: 10 }}
                />
                <Text style={{ color: colors.lightcarminepink, paddingTop: 5 }}>Excluir</Text>
            </View>
        </TouchableOpacity>
    ];

    return (
        <Swipeable rightButtons={swipe ? rightButtons : null}>
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
                        <Text style={styles.prodPlace}>{`Onde comprar: ${
                            product.whereToBuy
                        }`}</Text>
                    )}

                    <TouchableOpacity
                        style={styles.postedBy}
                        onPress={() =>
                            publicList
                                ? openUserList(product.userWhoPostedId, product.userWhoPostedName)
                                : null
                        }
                    >
                        <Text style={styles.postedByText}>{`por: ${
                            product.userWhoPostedName
                        }`}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Swipeable>
    );
};

const styles = StyleSheet.create({
    card: {
        width: width - 15,
        height: (height * 20) / 100,
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
        height: (height * 13) / 100,
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
        alignItems: "flex-start"
    },
    prodName: {
        marginTop: 15,
        margin: 2,
        fontSize: 20,
        fontWeight: "bold",
        color: colors.queenblue,
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
    },
    postedByText: {
        fontSize: 14,
        color: colors.metallicseaweed,
        textAlign: "center"
    },
    swipeableButtons: {
        flex: 1,
        justifyContent: "center",
        paddingLeft: 20
    }
});
