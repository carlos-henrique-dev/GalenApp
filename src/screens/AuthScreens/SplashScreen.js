import React, { Component } from "react";
import { View, Text, StyleSheet, StatusBar, ActivityIndicator, AsyncStorage } from "react-native";
import { connect } from "react-redux";
import api from "../../configs/api";
import { userLogin } from "../../store/ducks/user";
import { colors } from "../../configs/common_styles";

class SplashScreen extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            loading: false
        };

        this.setLoading = this.setLoading.bind(this);
    }

    async componentDidMount() {
        this.setLoading();
        await AsyncStorage.getItem("data")
            .then(result => {
                const res = JSON.parse(result) || null;

                if (res !== null) {
                    api.defaults.headers.common["Authorization"] = `bearer ${res.token}`;
                    this.props.saveLoginData(res);
                    this.setLoading();
                    this.props.navigation.navigate("UserMainScreen");
                } else {
                    this.props.navigation.navigate("LoginScreen");
                }
            })
            .catch(err => {
                console.log("err", err);
            });
    }

    setLoading() {
        this.setState(prevState => {
            return { loading: !prevState.loading };
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content" backgroundColor={colors.metallicseaweed} />
                <Text style={styles.title}> GALEN </Text>
                {this.state.loading ? (
                    <ActivityIndicator size={50} color={colors.fieryrose} />
                ) : null}
            </View>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return { saveLoginData: data => dispatch(userLogin(data)) };
};

export default connect(
    null,
    mapDispatchToProps
)(SplashScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.metallicseaweed,
        alignItems: "center",
        justifyContent: "center"
    },
    title: {
        fontSize: 80,
        color: colors.fieryrose
    }
});
