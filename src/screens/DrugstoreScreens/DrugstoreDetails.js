import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView, Image, Dimensions } from "react-native";
import { colors } from "../../configs/common_styles";

const { height, width } = Dimensions.get("window");

export default class componentName extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.data.name,
        headerTintColor: colors.nyanza,
        headerStyle: {
            backgroundColor: colors.fieryrose
        }
    });

    constructor(props) {
        super(props);
        this.state = {
            data: props.navigation.state.params.data
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    {this.state.data.photo.photo_url ? (
                        <Image
                            resizeMode="stretch"
                            source={{ uri: this.state.data.photo.photo_url }}
                            style={styles.image}
                        />
                    ) : (
                        <Text style={styles.imageText}>
                            Esta farmácia não possui nenhuma foto disponível
                        </Text>
                    )}
                </View>
                {/* <View style={styles.detailContainer}>
                    <View>
                        <Text style={styles.contactTitle}>Contatos:</Text>
                        <View>
                            {this.state.data.contact.tel ? (
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={styles.telCel}>Tel:</Text>
                                    <Text style={styles.telCelNumber}>
                                        {this.state.data.contact.tel}
                                    </Text>
                                </View>
                            ) : null}
                        </View>
                        <View>
                            {this.state.data.contact.cel ? (
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={styles.telCel}>Cel:</Text>
                                    <Text style={styles.telCelNumber}>
                                        {this.state.data.contact.cel}
                                    </Text>
                                </View>
                            ) : null}
                        </View>
                    </View>
                    <View>
                        <Text style={styles.addressTitle}>Endereço</Text>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={styles.addressSubTitle}>Rua:</Text>
                            <Text style={styles.addressContent}>
                                {this.state.data.address.street}
                            </Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={styles.addressSubTitle}>Bairro:</Text>
                            <Text style={styles.addressContent}>
                                {this.state.data.address.neighbourhood}
                            </Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={styles.addressSubTitle}>Número:</Text>
                            <Text style={styles.addressContent}>
                                {this.state.data.address.number}
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.productButton}>
                    <Text style={styles.productText}>Ver produtos comprados nesta farmácia</Text>
                </View> */}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        marginLeft: 5,
        marginRight: 5
    },
    imageContainer: {
        width: width,
        height: 200,
        justifyContent: "center"
    },
    image: {
        flex: 1
    },
    imageText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#CED4DA",
        textAlign: "center"
    },
    detailContainer: {
        width: width,
        alignContent: "flex-start",
        marginLeft: 15,
        borderLeftWidth: 1,
        borderLeftColor: colors.mainPurple,
        padding: 5
    },
    contactTitle: {
        fontSize: 18,
        color: colors.mainPurple,
        fontWeight: "bold",
        marginBottom: 5
    },
    telCel: {
        fontSize: 16,
        fontWeight: "bold",
        marginRight: 10,
        marginBottom: 5
    },
    telCelNumber: {
        fontSize: 16
    },
    addressTitle: {
        fontSize: 18,
        color: colors.mainPurple,
        fontWeight: "bold",
        marginBottom: 5
    },
    addressSubTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginRight: 10,
        marginBottom: 5
    },
    addressContent: {
        fontSize: 16
    },
    productButton: {
        marginTop: 20,
        width: width - 20,
        height: 50,
        backgroundColor: colors.mainBlue,
        justifyContent: "center"
    },
    productText: {
        fontSize: 18,
        fontWeight: "bold",
        color: colors.white,
        textAlign: "center"
    }
});
