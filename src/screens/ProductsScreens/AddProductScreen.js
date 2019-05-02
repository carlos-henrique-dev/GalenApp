import React, { Component } from "react";
import {
    View,
    Text,
    Image,
    Button,
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    ScrollView,
    Platform
} from "react-native";
import { Header } from "react-navigation";
import { connect } from "react-redux";
import { colors } from "../../configs/common_styles";
import ImagePicker from "react-native-image-picker";
import { api } from "../../configs/api";
import PostProductForm from "../../components/PostProductForm";

import HideWithKeyboard from "react-native-hide-with-keyboard";

class AddProductScreen extends Component {
    static navigationOptions = {
        headerTitle: "Publicar um produto",
        headerTintColor: colors.nyanza,
        headerStyle: {
            backgroundColor: colors.fieryrose
        }
    };
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            file: null,
            userWhoPostedType: "costumer",
            userWhoPostedId: "5cc8be8bff3b9e0f84fe3c37",
            userWhoPostedName: "Carlos Henrique",
            name: "Produto novinho 2",
            price: "30.90",
            whereToBuy: "Farmacia da vila",
            onSale: "true"
        };

        this.handleUploadPhoto = this.handleUploadPhoto.bind(this);
        this.handleGetPhoto = this.handleGetPhoto.bind(this);
        this.setLoading = this.setLoading.bind(this);
    }

    setLoading() {
        this.setState({ loading: !this.state.loading });
    }

    handleUploadPhoto() {
        const data = new FormData();

        data.append("file", {
            uri: this.state.file.uri,
            type: this.state.file.type,
            name: this.state.file.fileName
        });
        data.append("userWhoPostedType", this.state.userWhoPostedType);
        data.append("userWhoPostedId", this.state.userWhoPostedId);
        data.append("userWhoPostedName", this.state.userWhoPostedName);
        data.append("name", this.state.name);
        data.append("price", this.state.price);
        data.append("whereToBuy", this.state.whereToBuy);
        data.append("onSale", this.state.onSale);

        api.post("products", data)
            .then(result => {
                if (result.status === 200) {
                    this.setLoading();
                    this.props.navigation.state.params.loadproducts();
                    this.props.navigation.goBack();
                }
            })
            .catch(err => {
                this.setLoading();
                Alert.alert("Erro", "Ocorreu um erro ao realizar a postagem");
            });
    }

    handleGetPhoto() {
        ImagePicker.launchCamera({}, async response => {
            if (response.error) {
                console.log("erro: ", response.error);
            } else if (response.didCancel) {
                console.log("cancelou");
            } else {
                this.setLoading();
                if (response.fileSize / 1024 <= 2 * 1024 * 1024) {
                    this.setState({ file: response });
                } else {
                    this.setLoading();
                    Alert.alert("Erro", "Arquivo muito grande");
                }
            }
        });
    }

    render() {
        const { file } = this.state;
        return (
            <View style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1 }}>
                    <KeyboardAvoidingView style={{ flex: 1 }} behavior="position">
                        {this.state.loading ? (
                            <ActivityIndicator size="large" color={colors.fieryrose} />
                        ) : null}
                        <View style={{ flex: 1 }}>
                            <PostProductForm />
                        </View>
                        <Text>Insira uma imagem do produto</Text>
                        <Text>Insira uma imagem do produto</Text>
                        <Text>Insira uma imagem do produto</Text>
                        <Text>Insira uma imagem do produto</Text>
                        <Text>Insira uma imagem do produto</Text>
                        <Text>Insira uma imagem do produto</Text>
                    </KeyboardAvoidingView>
                </ScrollView>
                <HideWithKeyboard>
                    <Button title="ola" onPress={() => {}} />
                </HideWithKeyboard>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        name: state.user.name
    };
};
export default connect(mapStateToProps)(AddProductScreen);
