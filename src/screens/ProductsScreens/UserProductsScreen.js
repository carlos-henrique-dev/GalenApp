import React, { Component } from "react";
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from "react-native";
import api from "../../configs/api";
import { colors } from "../../configs/common_styles";
import { connect } from "react-redux";
import plusIcon from "../../assets/icon_plus.png";
import Product from "../../components/Product";

class ProductScreen extends Component {
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
                searchID: this.props.idToSearch === null ? this.props.userId : this.props.idToSearch
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
        api.get(`products/${this.state.searchID}`)
            .then(produtctsList => {
                this.setLoading();
                this.setState(
                    { products: produtctsList.data.product, refreshing: false },
                    () => {}
                );
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

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.filter} onPress={() => alert("filtrando")}>
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
                    renderItem={({ item }) => <Product product={item} />}
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
