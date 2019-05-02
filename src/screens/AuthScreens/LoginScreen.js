import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    Alert,
    ActivityIndicator
} from "react-native";
import InputComponent from "../../components/InputComponent";
import { api } from "../../configs/api";
import { colors } from "../../configs/common_styles";
import { connect } from "react-redux";
import { userLogin } from "../../store/ducks/user";
import OffilineNotice from "../../components/OfflineNotice";

/* export default */ class LoginScreen extends Component {
    static navigationOptions = {
        header: null
    };
    constructor(props) {
        super(props);
        this.state = {
            email: "henrique2@mail.com",
            password: "henrique",
            remember: false,
            forgotPassword: false,
            loading: false,
            disabledButtons: false
        };
        this.remember = this.state.remember;

        this.login = this.login.bind(this);
        this.createAccount = this.createAccount.bind(this);
        this.setLoading = this.setLoading.bind(this);
        this.disableButtons = this.disableButtons.bind(this);
    }

    setLoading() {
        this.setState(prevState => {
            return { loading: !prevState.loading };
        });
    }

    disableButtons(action) {
        this.setState({ disabledButtons: action });
    }

    async login() {
        this.setLoading();
        if (this.state.email.trim() !== "" && this.state.password.trim() !== "") {
            try {
                const res = await api.post("user/login", {
                    email: this.state.email,
                    password: this.state.password
                });
                if (res.status === 200) {
                    api.defaults.headers.common["Authorization"] = `bearer ${
                        res.data.response.token
                    }`;
                    this.props.saveLoginData(res.data.response);
                    this.setLoading();
                    this.props.navigation.navigate("UserPaths");
                } else if (res.status === 401) {
                    this.setLoading();
                    Alert.alert("Erro", "Dados inválidos");
                }
            } catch (error) {
                this.setLoading();
                Alert.alert("erro", "Erro no login" + error);
            }
        } else {
            this.setLoading();
            Alert.alert("erro", "Campos vazios");
        }
    }

    createAccount() {
        this.props.navigation.navigate("FirstLogin");
    }

    render() {
        return (
            <View style={styles.screen}>
                <StatusBar backgroundColor={colors.metallicseaweed} barStyle="light-content" />
                <OffilineNotice onChange={this.disableButtons} />
                {this.state.loading ? (
                    <ActivityIndicator size="large" color={colors.fieryrose} />
                ) : null}
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

                <TouchableOpacity
                    disabled={this.state.disabledButtons}
                    onPress={this.login}
                    style={styles.loginButton}
                >
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

                <TouchableOpacity
                    disabled={this.state.disabledButtons}
                    onPress={this.createAccount}
                    style={styles.loginButton}
                >
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
