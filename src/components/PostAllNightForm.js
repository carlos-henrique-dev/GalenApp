import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Dimensions,
    Image,
    Alert
} from "react-native";
import { colors } from "../configs/common_styles";
import { mapskey } from "../configs/maps";

import ImagePicker from "react-native-image-picker";
import ImageResizer from "react-native-image-resizer";
import Geocoder from "react-native-geocoding";

const { width } = Dimensions.get("window");

export default class PostProductForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            drugstorename: "Teste farmácia celular",
            contact: "6734815910",
            streetName: "Rua teste",
            neighborhoodName: "vila teste",
            number: "",
            latitude: "",
            longitude: ""
        };
        this.handleGetPhoto = this.handleGetPhoto.bind(this);
        this.sendDrugstoreData = this.sendDrugstoreData.bind(this);
    }

    componentDidMount() {
        Geocoder.init(mapskey, { language: "pt" });
    }

    handleGetPhoto() {
        const options = {
            noData: true,
            title: "Foto do produto",
            chooseFromLibraryButtonTitle: "Buscar na galeria",
            takePhotoButtonTitle: "Tirar uma foto"
        };
        ImagePicker.showImagePicker(options, async response => {
            if (response.error) {
                console.log("erro: ", response.error);
            } else if (response.didCancel) {
                console.log("cancelou");
            } else {
                if (response.fileSize > 3 * 1024 * 1024) {
                    ImageResizer.createResizedImage(response.uri, 800, 600, "JPEG", 80)
                        .then(compressResponse => {
                            this.setState({ file: compressResponse });
                        })
                        .catch(err => {
                            Alert.alert("Erro", "Erro na compressão do arquivo");
                        });
                } else {
                    this.setState({ file: response });
                }
            }
        });
    }

    sendDrugstoreData() {
        if (
            this.state.drugstorename.trim() !== "" &&
            this.state.contact.trim() !== "" &&
            this.state.neighborhoodName.trim() !== ""
        ) {
            const splitAreacode = this.state.contact.split("", 2);
            const splitNumber = this.state.contact.slice(2);

            const formattedContact = {
                areacode: `${splitAreacode[0]}${splitAreacode[1]}`,
                number: splitNumber
            };

            const address = {
                streetName: this.state.streetName,
                neighborhoodName: this.state.neighborhoodName,
                number: this.state.number,
                gpsCoordinates: {
                    latitude: this.state.latitude,
                    longitude: this.state.longitude
                }
            };

            this.props.onPost(this.state.file, this.state.drugstorename, formattedContact, address);
        } else {
            alert("preencha os campos com * corretamente");
        }
    }

    getUserPosition = async () => {
        navigator.geolocation.getCurrentPosition(
            async ({ coords: { latitude, longitude } }) => {
                const response = await Geocoder.from({ latitude, longitude });
                const address = response.results[0].address_components;

                this.setState({
                    streetName: address[1].long_name,
                    number: address[0].long_name,
                    latitude: latitude,
                    longitude: longitude
                });
            },
            err => {
                console.log("err", err);
            },
            { enableHighAccuracy: true }
        );
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.textArea}>
                    {this.state.drugstorename !== "" ? (
                        <Text style={styles.text}> Nome da farmácia * </Text>
                    ) : null}
                    <TextInput
                        placeholder="Nome da farmácia *"
                        style={styles.textInput}
                        value={this.state.drugstorename}
                        placeholderTextColor={colors.queenblue}
                        onChangeText={drugstorename =>
                            this.setState({ drugstorename: drugstorename })
                        }
                    />
                </View>
                <View style={styles.textArea}>
                    {this.state.contact !== "" ? (
                        <Text style={styles.text}> Contato * </Text>
                    ) : null}
                    <TextInput
                        placeholder="Contato *"
                        style={styles.textInput}
                        value={this.state.contact}
                        keyboardType="numeric"
                        mas
                        placeholderTextColor={colors.queenblue}
                        onChangeText={contact => this.setState({ contact: contact })}
                    />
                </View>
                <View style={styles.textArea}>
                    {this.state.streetName !== "" ? <Text style={styles.text}> Rua * </Text> : null}
                    <TextInput
                        placeholder="Rua *"
                        style={styles.textInput}
                        value={this.state.streetName}
                        placeholderTextColor={colors.queenblue}
                        onChangeText={streetName => this.setState({ streetName: streetName })}
                    />
                </View>
                <View style={styles.numberNeighborArea}>
                    {this.state.neighborhoodName !== "" ? (
                        <Text style={styles.text}> Bairro * </Text>
                    ) : null}
                    <TextInput
                        placeholder="Bairro *"
                        style={[styles.textInput, { width: (width * 65) / 100 }]}
                        value={this.state.neighborhoodName}
                        placeholderTextColor={colors.queenblue}
                        onChangeText={neighborhoodName =>
                            this.setState({ neighborhoodName: neighborhoodName })
                        }
                    />
                    <View>
                        {this.state.number !== "" ? (
                            <Text style={styles.text}> Número </Text>
                        ) : null}
                        <TextInput
                            placeholder="Número"
                            style={[styles.textInput, { width: (width * 25) / 100 }]}
                            value={this.state.number}
                            keyboardType="number-pad"
                            placeholderTextColor={colors.queenblue}
                            onChangeText={number => this.setState({ number: number })}
                        />
                    </View>
                </View>

                <TouchableOpacity onPress={this.getUserPosition} style={styles.getLocation}>
                    <Text style={styles.getLocationText}>Pegar a localização automaticamente</Text>
                </TouchableOpacity>

                <View style={styles.imageArea}>
                    {this.state.file ? (
                        <Image source={{ uri: this.state.file.uri }} style={styles.image} />
                    ) : (
                        <View style={styles.image} />
                    )}
                    <View>
                        <TouchableOpacity onPress={this.handleGetPhoto} style={styles.imageButton}>
                            <Text style={styles.imageText}>Insira uma foto</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.footButtons}>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.onCancel();
                        }}
                        style={styles.postButton}
                    >
                        <Text style={styles.imageText}>Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.sendDrugstoreData} style={styles.postButton}>
                        <Text style={styles.imageText}>Postar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-around",
        alignItems: "center"
    },
    textArea: {
        alignItems: "flex-start"
    },
    numberNeighborArea: {
        flexDirection: "row"
    },
    textInput: {
        borderLeftWidth: 1,
        borderBottomWidth: 1,
        borderColor: colors.fieryrose,
        width: (width * 95) / 100,
        height: 45,
        margin: 8,
        paddingTop: 20,
        paddingBottom: 4,
        justifyContent: "center"
    },
    text: {
        position: "absolute",
        top: 10,
        left: 15,
        fontSize: 12,
        color: colors.queenblue
    },
    switchArea: {
        flexDirection: "row",
        height: 25,
        alignItems: "center"
    },
    switchText: {
        color: colors.queenblue,
        marginLeft: 8,
        marginRight: 10,
        fontSize: 16
    },
    imageArea: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        width: (width * 95) / 100,
        marginTop: 10
    },
    image: {
        borderWidth: 1,
        borderColor: colors.fieryrose,
        width: 100,
        height: 100
    },
    imageButton: {
        backgroundColor: colors.fieryrose,
        borderRadius: 10,
        height: 40,
        width: (width * 40) / 100,
        alignItems: "center",
        justifyContent: "center"
    },
    imageText: {
        textAlign: "center",
        fontSize: 16,
        color: colors.nyanza
    },
    footButtons: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    postButton: {
        marginTop: 20,
        margin: 10,
        backgroundColor: colors.pistachio,
        borderRadius: 10,
        height: 40,
        width: (width * 40) / 100,
        alignItems: "center",
        justifyContent: "center"
    },
    getLocation: {
        width: (width * 95) / 100,
        alignItems: "center"
    },
    getLocationText: {
        fontSize: 18,
        color: colors.fieryrose,
        fontWeight: "bold"
    }
});
