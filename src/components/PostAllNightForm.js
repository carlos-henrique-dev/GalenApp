import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Dimensions,
    Switch,
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
            drugstorename: "",
            contacts: [],
            address: {
                streetName: "",
                neighborhoodName: "",
                number: "",
                gpsCoordinates: {
                    latitude: "",
                    longitude: ""
                }
            },
            onSale: false
        };
        this.handleToggleSwitch = this.handleToggleSwitch.bind(this);
        this.handleGetPhoto = this.handleGetPhoto.bind(this);
        this.sendProductData = this.sendProductData.bind(this);
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
                console.log("response", response);
                if (response.fileSize > 3 * 1024 * 1024) {
                    ImageResizer.createResizedImage(response.uri, 800, 600, "JPEG", 80)
                        .then(compressResponse => {
                            console.log("comprimido", compressResponse);
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

    sendProductData() {
        if (
            this.state.file !== null &&
            this.state.name.trim() !== "" &&
            this.state.price.trim() !== "" &&
            this.state.whereToBuy.trim() !== ""
        ) {
            this.props.onPost(
                this.state.file,
                this.state.name,
                this.state.price,
                this.state.whereToBuy,
                this.state.onSale
            );
        } else {
            alert("preencha os campos corretamente");
        }
    }

    handleToggleSwitch() {
        this.setState({ onSale: !this.state.onSale });
    }

    getUserPosition = () => {
        navigator.geolocation.getCurrentPosition(
            position => {
                this.setState(
                    prevState => ({
                        address: {
                            ...prevState.address,
                            gpsCoordinates: {
                                latitude: position.coords.latitude,
                                longitude: position.coords.longitude
                            }
                        }
                    }),
                    () => {
                        console.log("state", this.state);
                    }
                );
            },
            err => {
                console.log("error", err);
            }
        );
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.textArea}>
                    {this.state.drugstorename !== "" ? (
                        <Text style={styles.text}> Nome da farmácia </Text>
                    ) : null}
                    <TextInput
                        placeholder="Nome da farmácia"
                        style={styles.textInput}
                        value={this.state.drugstorename}
                        placeholderTextColor={colors.queenblue}
                        onChangeText={drugstorename =>
                            this.setState({ drugstorename: drugstorename })
                        }
                    />
                </View>
                <Text style={styles.contactsTitle}> Contatos </Text>
                <View style={styles.textArea}>
                    {this.state.price !== "" ? <Text style={styles.text}> Contato 1 </Text> : null}
                    <TextInput
                        placeholder="Contato 1"
                        style={styles.textInput}
                        value={this.state.price}
                        keyboardType="number-pad"
                        placeholderTextColor={colors.queenblue}
                        onChangeText={price => this.setState({ price: price })}
                    />
                </View>
                <View style={styles.textArea}>
                    {this.state.whereToBuy !== "" ? (
                        <Text style={styles.text}> Onde comprou </Text>
                    ) : null}
                    <TextInput
                        placeholder="Onde comprou"
                        style={styles.textInput}
                        value={this.state.whereToBuy}
                        placeholderTextColor={colors.queenblue}
                        onChangeText={whereToBuy => this.setState({ whereToBuy: whereToBuy })}
                    />
                </View>
                <View style={styles.switchArea}>
                    <Text style={styles.switchText}> Estava em promoção? </Text>
                    <Text style={styles.switchText}>{this.state.onSale ? "Sim" : "Não"}</Text>

                    <Switch
                        onValueChange={this.handleToggleSwitch}
                        trackColor={{ false: colors.fieryrose, true: colors.pistachio }}
                        value={this.state.onSale}
                    />
                </View>

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

                <TouchableOpacity onPress={this.getUserPosition}>
                    <Text>Pegar a localização</Text>
                </TouchableOpacity>

                <View style={styles.footButtons}>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.onCancel();
                        }}
                        style={styles.postButton}
                    >
                        <Text style={styles.imageText}>Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.sendProductData} style={styles.postButton}>
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
    textInput: {
        borderLeftWidth: 1,
        borderBottomWidth: 1,
        borderColor: colors.fieryrose,
        width: width - 30,
        height: 45,
        margin: 12
    },
    text: {
        position: "absolute",
        top: 10,
        left: 15,
        fontSize: 12,
        color: colors.queenblue
    },
    contactsTitle: {
        fontSize: 18,
        color: colors.queenblue,
        margin: 2
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
        width: width - 30,
        marginTop: 20
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
        fontSize: 16
    },
    footButtons: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    postButton: {
        marginTop: 35,
        margin: 10,
        backgroundColor: colors.pistachio,
        borderRadius: 10,
        height: 40,
        width: (width * 40) / 100,
        alignItems: "center",
        justifyContent: "center"
    }
});
