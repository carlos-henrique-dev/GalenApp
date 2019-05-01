import React, { Component } from "react";
import { View, Text } from "react-native";
import { colors } from "../../configs/common_styles";

export default class componentName extends Component {
    static navigationOptions = {
        headerTitle: "Publicar um produto",
        headerTintColor: colors.nyanza,
        headerStyle: {
            backgroundColor: colors.fieryrose
        }
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View>
                <Text> add produto </Text>
            </View>
        );
    }
}
