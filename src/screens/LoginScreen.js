import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Alert } from "react-native";
import InputComponent from "../components/InputComponent";
import { server } from "../configs/api";
import { colors } from "../configs/common_styles";
import Axios from "axios";
import { connect } from "react-redux";
import { userLogin } from "../store/ducks/user";

/* export default */ class LoginScreen extends Component {
    static navigationOptions = {
        header: null
    };
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            remember: false,
            forgotPassword: false
        };
        this.remember = this.state.remember;

        this.login = this.login.bind(this);
    }

    async login() {
        if (this.state.email.trim() !== "" && this.state.password.trim() !== "") {
            try {
                const res = await Axios.post(`${server}user/login`, {
                    email: this.state.email,
                    password: this.state.password
                });
                console.log("res", res);
                if (res.status === 200) {
                    Axios.defaults.headers.common["Authorization"] = `bearer ${
                        res.data.response.token
                    }`;
                    this.props.userLogin(res.data.result);
                    this.props.navigation.navigate("userTabsProfile");
                } else if (res.status === 401) {
                    Alert.alert("Erro", "Dados inválidos");
                }
            } catch (error) {
                Alert.alert("erro", "Erro no login");
            }
        } else {
            Alert.alert("erro", "Campos vazios");
        }
    }

    render() {
        return (
            <View style={styles.screen}>
                <StatusBar backgroundColor={colors.metallicseaweed} barStyle="light-content" />
                <Text style={{ fontSize: 80, color: colors.fieryrose }}>GALEN</Text>
                <View style={styles.inputBox}>
                    <InputComponent
                        icon="user"
                        placeholder="usuário"
                        placeholderTextColor={colors.fieryrose}
                        value={this.state.email}
                        onChangeText={email => this.setState({ ...this.state, email: email })}
                    />
                    <InputComponent
                        icon="lock"
                        placeholder="senha"
                        placeholderTextColor={colors.fieryrose}
                        secureTextEntry={false}
                        value={this.state.password}
                        onChangeText={password =>
                            this.setState({ ...this.state, password: password })
                        }
                    />

                    <TouchableOpacity
                        onPress={() => this.setState({ remember: !this.state.remember })}
                        style={styles.rememberButton}
                    >
                        <Text
                            style={[
                                styles.rememberText,
                                this.state.remember === true ? styles.rememberTextTrue : null
                            ]}
                        >
                            Lembre-se de mim
                        </Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={this.login} style={styles.loginButton}>
                    <Text style={styles.loginButtonText}>Entrar</Text>
                </TouchableOpacity>

                {this.state.forgotPassword ? (
                    <TouchableOpacity
                        onPress={() => alert("recuperando a senha")}
                        style={styles.forgotButton}
                    >
                        <Text style={styles.forgotText}>Esqueceu a senha?</Text>
                    </TouchableOpacity>
                ) : null}

                <TouchableOpacity
                    onPress={() => alert("encontrando farmácia")}
                    style={styles.findPharmacyButton}
                >
                    <Text style={styles.findPharmacyText}>Encontrar farmácia de plantão</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={this.login} style={styles.loginButton}>
                    <Text style={styles.loginButtonText}>Criar conta</Text>
                </TouchableOpacity>
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
)(LoginScreen);

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: colors.metallicseaweed,
        justifyContent: "center",
        alignItems: "center"
    },
    inputBox: {
        width: "85%",
        height: 200,
        padding: 10,
        marginTop: 10,
        marginBottom: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    // login button
    loginButton: {
        width: 150,
        height: 50,
        margin: 5,
        backgroundColor: colors.fieryrose,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    loginButtonText: {
        color: colors.nyanza,
        fontSize: 28,
        fontWeight: "bold"
    },
    forgotButton: {
        margin: 10
    },
    forgotText: {
        color: colors.nyanza,
        fontSize: 14,
        textAlign: "center"
    },
    // remember-me
    rememberButton: {
        margin: 5
    },
    rememberText: {
        color: colors.nyanza,
        fontSize: 16,
        textAlign: "center"
    },
    rememberTextTrue: {
        color: colors.nyanza
    },

    // find drugstore
    findPharmacyButton: {
        marginBottom: 20,
        marginTop: 40
    },
    findPharmacyText: {
        color: colors.nyanza,
        fontSize: 22,
        textAlign: "center"
    },

    // create account
    loginButton: {
        width: 150,
        height: 50,
        marginBottom: 5,
        backgroundColor: colors.fieryrose,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center"
    }
});
