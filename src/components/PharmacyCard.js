import React from "react";
import { Text, View, StyleSheet, Image, Dimensions, TouchableOpacity } from "react-native";
import { colors } from "../configs/common_styles";
import call from "react-native-phone-call";

const { height, width } = Dimensions.get("window");

export default props => {
    makeCall = number => {
        call({ number, prompt: true }).catch(error => console.log(error));
    };

    return (
        <View elevation={5} style={styles.container}>
            <View style={styles.infoContainer}>
                <View style={styles.imageContainer}>
                    {props.data.photo.photo_url ? (
                        <Image
                            source={{ uri: props.data.photo.photo_url }}
                            style={styles.image}
                            resizeMode="contain"
                        />
                    ) : (
                        <Text style={styles.imageText}>Imagem não disponível</Text>
                    )}
                </View>

                <View style={styles.dataContainer}>
                    <Text style={styles.title}>{props.data.name}</Text>
                    <Text style={styles.contact}>Contato</Text>
                    <TouchableOpacity
                        style={styles.contactContainer}
                        onPress={() =>
                            this.makeCall(
                                `${props.data.contact.areacode}${props.data.contact.number}`
                            )
                        }
                    >
                        <Text style={styles.pharmacyContact}>
                            {`(${props.data.contact.areacode}) ${props.data.contact.number}`}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.detailContainer}>
                <TouchableOpacity onPress={() => props.navigate()}>
                    <Text style={styles.detail}>Mais detalhes</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: width - 15,
        height: (height * 25) / 100,
        justifyContent: "center",
        flexDirection: "column",
        alignSelf: "center",
        marginTop: 2,
        marginBottom: 4,
        // sombras
        padding: 5,
        backgroundColor: colors.white,
        shadowColor: colors.black,
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 1
        }
    },
    infoContainer: {
        justifyContent: "space-around",
        flex: 4,
        flexDirection: "row"
    },
    imageContainer: {
        width: (width * 30) / 100,
        height: "75%",
        justifyContent: "center",
        marginLeft: 10,
        marginTop: 20
    },
    dataContainer: {
        marginTop: 20,
        width: "65%",
        height: "100%",
        alignItems: "center"
    },
    image: {
        flex: 1
    },
    imageText: {
        textAlign: "center",
        color: "#CED4DA"
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: colors.mainPurple,
        marginTop: 0,
        margin: 5
    },
    contactContainer: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    contact: {
        color: colors.queenblue,
        margin: 5
    },
    pharmacyContact: {
        fontSize: 18,
        color: colors.mainPurple,
        fontWeight: "bold",
        margin: 2
    },
    detailContainer: {
        flex: 1,
        marginBottom: 10
    },
    detail: {
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
        color: colors.pistachio
    }
});
