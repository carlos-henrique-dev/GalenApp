import React, { Component } from "react";
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from "react-native";
import { createOpenLink } from "react-native-open-maps";
import { colors } from "../../configs/common_styles";

const { width } = Dimensions.get("window");

export default class componentName extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.data.name,
        headerTintColor: colors.nyanza,
        headerTransparent: true,
        headerTitleStyle: {
            fontWeight: "bold",
            color: colors.nyanza,
            textShadowColor: colors.black,
            textShadowOffset: { width: 2, height: 2 },
            textShadowRadius: 10
        }
    });

    constructor(props) {
        super(props);
        this.state = {
            data: props.navigation.state.params.data
        };
    }

    render() {
        const openDrugstoreOnMap = createOpenLink({
            latitude: Number.parseFloat(this.state.data.address.gpsCoordinates.latitude),
            longitude: Number.parseFloat(this.state.data.address.gpsCoordinates.longitude),
            provider: "google",
            end: `${this.state.data.address.gpsCoordinates.latitude}, ${
                this.state.data.address.gpsCoordinates.longitude
            }`
        });

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
                <View style={styles.detailContainer}>
                    <View style={styles.contactContainer}>
                        <Text style={styles.contactTitle}>
                            {this.state.data.contacts.lenght > 1 ? "Contato" : "Contatos"}
                        </Text>
                        {this.state.data.contacts.map(contact => {
                            return (
                                <Text key={contact._id} style={styles.contact}>
                                    {`(${contact.areacode}) ${contact.number}`}
                                </Text>
                            );
                        })}
                    </View>
                    <View style={styles.addressContainer}>
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
                                {this.state.data.address.neighborhood}
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
                <TouchableOpacity onPress={openDrugstoreOnMap}>
                    <Text style={styles.openMap}>Abrir no mapa</Text>
                </TouchableOpacity>
                {/*  
                TODO: verificar se é uma farmácia temporária ou não
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
        marginTop: 15,
        width: width - 10,
        alignContent: "flex-start",
        marginLeft: 5,
        borderLeftWidth: 1,
        borderLeftColor: colors.mainPurple,
        padding: 5
    },
    contactContainer: {
        padding: 10
    },
    contactTitle: {
        fontSize: 18,
        color: colors.mainPurple,
        fontWeight: "bold",
        marginBottom: 5,
        color: colors.queenblue
    },
    contact: {
        color: colors.black,
        fontSize: 16,
        fontWeight: "bold",
        marginRight: 10,
        marginBottom: 8
    },
    addressContainer: {
        padding: 10
    },
    addressTitle: {
        fontSize: 18,
        color: colors.queenblue,
        fontWeight: "bold",
        marginBottom: 5
    },
    addressSubTitle: {
        color: colors.black,
        fontSize: 16,
        fontWeight: "bold",
        marginRight: 10,
        marginBottom: 5
    },
    addressContent: {
        color: colors.black,
        fontSize: 16,
        marginTop: 2
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
    },
    openMap: {
        fontSize: 20,
        fontWeight: "bold",
        color: colors.pistachio,
        margin: 10
    }
});
