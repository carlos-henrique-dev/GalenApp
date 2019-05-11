import React, { Component } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from "react-native";
import api from "../../configs/api";
import { colors } from "../../configs/common_styles";
import { connect } from "react-redux";
import Product from "../../components/Product";

class ProductScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: navigation.state.params.userName
            ? `Produtos de ${navigation.state.params.userName}`
            : "Seus Produtos",
        headerTintColor: colors.nyanza,
        headerStyle: {
            backgroundColor: colors.fieryrose,
            fontSize: 10
        }
    });

    constructor(props) {
        super(props);
        this.state = {
            searchID: "",
            refreshing: false,
            products: []
        };

        this.loadProducts = this.loadProducts.bind(this);
        this.handleRefresh = this.handleRefresh.bind(this);
        this.setLoading = this.setLoading.bind(this);
    }

    componentDidMount() {
        this.setState(
            {
                searchID:
                    this.props.navigation.state.params.idToSearch === undefined
                        ? this.props.userId
                        : this.props.navigation.state.params.idToSearch
            },
            () => {
                this.loadProducts();
            }
        );
    }

    setLoading() {
        this.setState({ loading: !this.state.loading });
    }

    loadProducts() {
        this.setLoading();

        api.get(`products/user_product/${this.state.searchID}`)
            .then(produtcsList => {
                this.setLoading();
                this.setState({ products: produtcsList.data.product, refreshing: false }, () => {});
            })
            .catch(error => {
                this.setLoading();
                console.log("erro", error);
                this.setState({ refreshing: false });
            });
    }

    handleRefresh() {
        this.setState(
            {
                refreshing: !this.state.refreshing
            },
            () => {
                this.loadProducts();
            }
        );
    }

    removeProducts = productId => {
        Alert.alert("Confirmação de exclusão", "Deseja mesmo excluir este produto?", [
            { text: "Cancelar", style: "cancel" },
            {
                text: "Sim",
                onPress: () => {
                    this.setLoading();
                    api.delete(`products/${productId}`)
                        .then(result => {
                            if (result.status === 200) {
                                Alert.alert("Sucesso", "Produdo excluído com sucesso");
                                this.loadProducts();
                            }
                            Alert.alert("Erro", "Erro ao excluir o produto");
                        })
                        .catch(err => Alert.alert("Erro", `Erro ao excluir o produto: ${err}`));
                }
            }
        ]);
    };

    editProducts = productId => {
        this.setLoading();
        api.get(`products/one_product/${productId}`)
            .then(product => {
                this.props.navigation.navigate("EditProductScreen", {
                    loadproducts: this.loadProducts,
                    product: product.data
                });
            })
            .catch(error => {
                this.setLoading();
                console.log("erro", error);
                this.setState({ refreshing: false });
            });
    };

    filter = () => {
        alert("filtrando");
    };

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.filter} onPress={this.filter}>
                    <Text style={styles.filterText}>Filtros</Text>
                </TouchableOpacity>
                <View>
                    {this.state.products.length > 0 ? (
                        <Text style={styles.userWhoPosted}>{`Produtos postados por: ${
                            this.state.products[0].userWhoPostedName
                        }`}</Text>
                    ) : null}
                </View>
                <FlatList
                    data={this.state.products}
                    renderItem={({ item }) => (
                        <Product
                            product={item}
                            onRemove={this.removeProducts}
                            onEdit={this.editProducts}
                            swipe={
                                this.props.navigation.state.params.idToSearch === undefined
                                    ? true
                                    : false
                            }
                        />
                    )}
                    keyExtractor={item => `${item._id}`}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.flatList}
                    refreshing={this.state.refreshing}
                    onRefresh={this.handleRefresh}
                />
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        userId: state.user.id
    };
};

export default connect(mapStateToProps)(ProductScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    filter: {
        height: 35,
        alignItems: "flex-end",
        justifyContent: "center",
        marginLeft: 10,
        marginRight: 10
    },
    filterText: {
        fontSize: 16,
        fontWeight: "bold"
    },
    userWhoPosted: {
        margin: 5,
        fontSize: 16,
        color: colors.fieryrose,
        opacity: 0.8
    },
    flatList: {
        paddingBottom: 60
    },
    addButtonContainer: {
        position: "absolute",
        bottom: 5,
        right: 10,
        width: 60,
        height: 60
    },
    addButton: {
        width: 60,
        height: 60
    }
});
