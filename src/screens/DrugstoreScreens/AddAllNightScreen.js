import React, { Component } from "react";
import {
    View,
    Text,
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Platform
} from "react-native";
import { colors } from "../../configs/common_styles";
import api from "../../configs/api";
import { connect } from "react-redux";
import PostAllNightForm from "../../components/PostAllNightForm";

class AddAllNightScreen extends Component {
    static navigationOptions = {
        headerTitle: "Informar plantão",
        headerTintColor: colors.nyanza,
        headerStyle: {
            backgroundColor: colors.fieryrose
        }
    };
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            userWhoPostedType: "costumer",
            userWhoPostedId: "",
            userWhoPostedName: ""
        };

        this.handlUploadProduct = this.handlUploadProduct.bind(this);
        this.setLoading = this.setLoading.bind(this);
    }

    componentDidMount() {
        this.setState({ userWhoPostedName: this.props.userName, userWhoPostedId: this.props.id });
    }

    setLoading() {
        this.setState({ loading: !this.state.loading });
    }

    async handlUploadProduct(file, drugstorename, formattedContact, address) {
        this.setLoading();
        const data = new FormData();
        if (file !== null) {
            data.append("file", {
                uri: file.uri,
                name: file.fileName || file.name,
                type: file.type || "image/jpeg"
            });
        }
        data.append("userWhoPostedType", this.state.userWhoPostedType);
        data.append("userWhoPostedId", this.state.userWhoPostedId);
        data.append("userWhoPostedName", this.state.userWhoPostedName);
        data.append("drugstorename", drugstorename);
        data.append("contact", JSON.stringify(formattedContact));
        data.append("address", JSON.stringify(address));

        await api
            .post("allnight_drugstore", data, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            .then(result => {
                if (result.status === 201) {
                    this.setLoading();
                    this.props.navigation.state.params.loadDrugstores();
                    this.props.navigation.goBack();
                }
            })
            .catch(err => {
                this.setLoading();
                console.log("erro", err.message);
                Alert.alert("Erro", "Ocorreu um erro ao realizar a postagem");
            });
    }

    render() {
        return (
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : null}
                style={styles.container}
            >
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    {this.state.loading ? (
                        <ActivityIndicator size="large" color={colors.fieryrose} />
                    ) : null}
                    <Text style={styles.title}>
                        Informe rapidamente uma farmácia de plantão e ajude outras pessoas que estão
                        procurando.
                    </Text>
                    <View style={{ flex: 1 }}>
                        <PostAllNightForm
                            onPost={this.handlUploadProduct}
                            onCancel={this.props.navigation.goBack}
                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        );
    }
}

const mapStateToProps = state => {
    return {
        id: state.user.id,
        userName: state.user.name
    };
};

export default connect(mapStateToProps)(AddAllNightScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    title: {
        fontSize: 14,
        color: colors.queenblue,
        textAlign: "center",
        margin: 10
    }
});
