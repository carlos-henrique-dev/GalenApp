import React from "react";
import { Text, View, StyleSheet, Image, Dimensions, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { colors } from "../configs/common_styles";

const { height, width } = Dimensions.get("window");

export default props => {
    return (
        <View elevation={5} style={styles.container}>
            <View style={styles.infoContainer}>
                <View style={styles.imageContainer}>
                    {props.data.photo.photo_url ? (
                        <Image source={{ uri: props.data.photo.photo_url }} style={styles.image} />
                    ) : (
                        <Text style={styles.imageText}>Imagem não disponível</Text>
                    )}
                </View>
                <View style={styles.dataContainer}>
                    <Text style={styles.title}>{props.data.name}</Text>
                    <Text style={styles.contact}>
                        {props.data.contacts.lenght > 1 ? "Contato" : "Contatos"}
                    </Text>
                    <View style={styles.contactContainer}>
                        {props.data.contacts.map(contact => {
                            return (
                                <Text key={contact._id} style={styles.pharmacyContact}>
                                    {`(${contact.areacode}) ${contact.number}`}
                                </Text>
                            );
                        })}
                    </View>
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
        height: (height * 30) / 100,
        justifyContent: "center",
        flexDirection: "column",
        alignSelf: "center",
        marginTop: 2,
        marginBottom: 4,
        // sombras
        borderColor: colors.nyanza,
        borderBottomWidth: 0,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2
    },
    infoContainer: {
        justifyContent: "space-around",
        flex: 4,
        flexDirection: "row"
    },
    imageContainer: {
        width: (width * 30) / 100,
        height: "65%",
        justifyContent: "center",
        marginLeft: 10,
        marginTop: 20
    },
    dataContainer: {
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
        color: colors.mainPurple
    }
});
