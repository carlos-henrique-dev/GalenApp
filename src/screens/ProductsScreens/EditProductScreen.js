import React, { Component } from "react";
import {
    View,
    Text,
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    ScrollView,
    StyleSheet,
    Platform
} from "react-native";
import { colors } from "../../configs/common_styles";
import api from "../../configs/api";
import { connect } from "react-redux";
import EditProductForm from "../../components/EditProductForm";

class AddProductScreen extends Component {
    static navigationOptions = {
        headerTitle: "Editar produto",
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

        this.handlEditProduct = this.handlEditProduct.bind(this);
        this.setLoading = this.setLoading.bind(this);
    }

    componentDidMount() {
        this.setState({
            userWhoPostedName: this.props.userName,
            userWhoPostedId: this.props.id
        });
    }

    setLoading() {
        this.setState({ loading: !this.state.loading });
    }

    async handlEditProduct(/* file, */ name, price, whereToBuy, onSale) {
        this.setLoading();
        /* const data = new FormData();
         data.append("file", {
            uri: file.uri,
            name: file.fileName || file.name,
            type: file.type || "image/jpeg"
        }); 
        data.append("userWhoPostedType", this.state.userWhoPostedType);
        data.append("userWhoPostedId", this.state.userWhoPostedId);
        data.append("userWhoPostedName", this.state.userWhoPostedName); 
        data.append("name", name);
        data.append("price", price);
        data.append("whereToBuy", whereToBuy);
        data.append("onSale", onSale); */

        const data = [
            { propName: "name", value: name },
            { propName: "price", value: price },
            { propName: "whereToBuy", value: whereToBuy },
            { propName: "onSale", value: onSale }
        ];

        await api
            .patch(
                `products/${this.props.navigation.state.params.product._id}`,
                data /*  {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            } */
            )
            .then(result => {
                if (result.status === 200) {
                    this.setLoading();
                    this.props.navigation.state.params.loadproducts();
                    this.props.navigation.goBack();
                }
            })
            .catch(err => {
                this.setLoading();
                console.log("erro", err.message);
                Alert.alert("Erro", "Ocorreu um erro na edição");
            });
    }

    render() {
        const { product } = this.props.navigation.state.params;
        return (
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : null}
                style={styles.container}
            >
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    {this.state.loading ? (
                        <ActivityIndicator size="large" color={colors.fieryrose} />
                    ) : null}

                    <View style={{ flex: 1 }}>
                        <EditProductForm
                            product={product}
                            onEdit={this.handlEditProduct}
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

export default connect(mapStateToProps)(AddProductScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
});
