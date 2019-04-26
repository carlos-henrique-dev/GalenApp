import React, { Component } from "react";
import { View, Text, FlatList, Button, StyleSheet } from "react-native";
import { colors } from "../../configs/common_styles";
import Product from "../../components/Product";

export default class ProductScreen extends Component {
    static navigationOptions = {
        headerTitle: "ola",
        headerTintColor: colors.nyanza,
        headerStyle: {
            backgroundColor: colors.fieryrose
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            products: [
                { id: 1, name: "paracetamol" },
                { id: 2, name: "dorflex" },
                { id: 3, name: "eno" }
            ]
        };
    }

    render() {
        return (
            <View>
                <Text>Lista</Text>
                <FlatList
                    data={this.state.products}
                    renderItem={({ item }) => <Product product={item} />}
                    keyExtractor={item => `${item.id}`}
                />

                <Text>Fim da lista</Text>
                <Button
                    style={styles.button}
                    onPress={() => this.props.navigation.navigate("AddProductScreen")}
                    title="proxima"
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        position: "absolute",
        bottom: -400,
        right: 10,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: colors.pistachio,
        alignItems: "center",
        justifyContent: "center"
    }
});
