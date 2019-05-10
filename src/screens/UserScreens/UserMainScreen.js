import React, { Component } from "react";
import { View, Text, StyleSheet, StatusBar, TouchableOpacity } from "react-native";
import { colors } from "../../configs/common_styles";
import Buttons from "../../components/Buttons";
import Icon from "react-native-vector-icons/FontAwesome";
import UserNameHeader from "../../components/UserNameHeader";
import { connect } from "react-redux";

class UserMainScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: <UserNameHeader />,
            headerRight: (
                <TouchableOpacity
                    style={{ margin: 5, marginRight: 10 }}
                    onPress={() => {
                        navigation.navigate("UserSettingsScreen");
                    }}
                >
                    <Icon name="cogs" size={25} color={colors.nyanza} />
                </TouchableOpacity>
            ),
            headerTintColor: colors.nyanza,
            headerStyle: {
                backgroundColor: colors.fieryrose
            }
        };
    };

    constructor(props) {
        super(props);
        this.state = {};
        this._navigate = this._navigate.bind(this);
    }

    _navigate = path => {
        this.props.navigation.navigate(path, { authorized: true });
    };

    render() {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor={colors.fieryrose} barStyle="light-content" />
                <Buttons
                    title="Buscar farmácias de plantão"
                    size={20}
                    navigate_func={() => this._navigate("AllnightScreen")}
                />
                <Buttons
                    title="Buscar farmácias abertas na região"
                    navigate_func={() => this._navigate("openDrugstores")}
                />
                <Buttons
                    title="Pesquisar produtos"
                    navigate_func={() => this._navigate("ProductsScreen")}
                />
                <Buttons
                    title="Meus produtos"
                    navigate_func={() => this._navigate("UserProductsScreen")}
                />
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        userName: state.user.name
    };
};

export default connect(mapStateToProps)(UserMainScreen);

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "flex-start",
        backgroundColor: colors.metallicseaweed,
        flex: 1,
        padding: 10
    }
});
