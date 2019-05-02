import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export default class PostProductForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            file: null,
            userWhoPostedType: "costumer",
            userWhoPostedId: "5cc8be8bff3b9e0f84fe3c37",
            userWhoPostedName: "Carlos Henrique",
            name: "",
            price: "",
            whereToBuy: "",
            onSale: ""
        };
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.textArea}>
                    {this.state.name !== "" ? (
                        <Text style={styles.text}> Nome do produto </Text>
                    ) : null}
                    <TextInput
                        placeholder="Nome do produto"
                        style={styles.textInput}
                        value={this.state.name}
                        onChangeText={name => this.setState({ name: name })}
                    />
                </View>
                <View style={styles.textArea}>
                    {this.state.price !== "" ? (
                        <Text style={styles.text}> Preço do produto </Text>
                    ) : null}
                    <TextInput
                        placeholder="Preço do produto"
                        style={styles.textInput}
                        value={this.state.price}
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
                        onChangeText={whereToBuy => this.setState({ whereToBuy: whereToBuy })}
                    />
                </View>
                <View style={styles.textArea}>
                    {this.state.onSale !== "" ? (
                        <Text style={styles.text}> Estava em promoção? </Text>
                    ) : null}
                    <TextInput
                        placeholder="Estava em promoção?"
                        style={styles.textInput}
                        value={this.state.onSale}
                        onChangeText={onSale => this.setState({ onSale: onSale })}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    textArea: {
        alignItems: "flex-start"
    },
    textInput: {
        borderWidth: 1,
        width: width - 50,
        height: 45,
        margin: 12
    },
    text: {
        marginTop: 0,
        marginBottom: -10,
        marginLeft: 10,
        fontSize: 12
    }
});
