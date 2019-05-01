import React, { Component } from "react";
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from "react-native";
import Axios from "axios";
import { server } from "../../configs/api";
import { colors } from "../../configs/common_styles";
import plusIcon from "../../assets/icon_plus.png";
import Product from "../../components/Product";

export default class ProductScreen extends Component {
    static navigationOptions = {
        headerTitle: "Produtos",
        headerTintColor: colors.nyanza,
        headerStyle: {
            backgroundColor: colors.fieryrose
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            products: []
        };

        this.loadProducts = this.loadProducts.bind(this);
        this.handleRefresh = this.handleRefresh.bind(this);
    }

    componentDidMount() {
        this.loadProducts();
    }

    loadProducts() {
        Axios.get(`${server}products`)
            .then(produtctsList => {
                console.log("products", produtctsList.data.products);
                this.setState({ products: produtctsList.data.products, refreshing: false });
            })
            .catch(error => {
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

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.filter} onPress={() => alert("filtrando")}>
                    <Text style={styles.filterText}>Filtros</Text>
                </TouchableOpacity>
                <FlatList
                    data={this.state.products}
                    renderItem={({ item }) => <Product product={item} />}
                    keyExtractor={item => `${item._id}`}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.flatList}
                    refreshing={this.state.refreshing}
                    onRefresh={this.handleRefresh}
                />
                <TouchableOpacity
                    style={styles.addButtonContainer}
                    onPress={() => this.props.navigation.navigate("AddProductScreen")}
                >
                    <Image resizeMode="contain" source={plusIcon} style={styles.addButton} />
                </TouchableOpacity>
            </View>
        );
    }
}

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
