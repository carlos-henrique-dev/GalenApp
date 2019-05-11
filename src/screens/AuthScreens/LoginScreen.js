import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    Alert,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    AsyncStorage
} from "react-native";
import InputComponent from "../../components/InputComponent";
import Ionicons from "react-native-vector-icons/Ionicons";
import api from "../../configs/api";
import { colors } from "../../configs/common_styles";
import { connect } from "react-redux";
import { userLogin } from "../../store/ducks/user";
import OffilineNotice from "../../components/OfflineNotice";
import HideWithKeyboard from "react-native-hide-with-keyboard";

class LoginScreen extends Component {
    static navigationOptions = {
        header: null
    };
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            remember: false,
            forgotPassword: false,
            loading: false,
            disabledButtons: false
        };
        this.remember = this.state.remember;

        this.login = this.login.bind(this);
        this.createAccount = this.createAccount.bind(this);
        this.searchAllnight = this.searchAllnight.bind(this);
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
                    if (this.state.remember) {
                        await AsyncStorage.setItem("data", JSON.stringify(res.data.response)).then(
                            () => {
                                this.props.saveLoginData(res.data.response);
                                this.setLoading();
                                this.props.navigation.navigate("UserPaths");
                            }
                        );
                    } else {
                        this.props.saveLoginData(res.data.response);
                        this.setLoading();
                        this.props.navigation.navigate("UserPaths");
                    }
                } else if (res.status === 401) {
                    this.setLoading();
                    Alert.alert("Erro", "Dados inválidos");
                }
            } catch (error) {
                this.setLoading();
                Alert.alert("erro", "Erro no login: " + error);
            }
        } else {
            this.setLoading();
            Alert.alert("erro", "Campos vazios");
        }
    }

    createAccount() {
        this.props.navigation.navigate("FirstLogin");
    }

    searchAllnight() {
        this.props.navigation.navigate("AllnightScreenPublic", { authorized: false });
    }

    render() {
        return (
            <View style={styles.screen}>
                <StatusBar backgroundColor={colors.metallicseaweed} barStyle="light-content" />
                <OffilineNotice onChange={this.disableButtons} />
                {this.state.loading ? (
                    <ActivityIndicator size="large" color={colors.fieryrose} />
                ) : null}
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : null}
                    style={{
                        flex: 1,
                        width: "100%"
                    }}
                >
                    <ScrollView
                        contentContainerStyle={{
                            flexGrow: 1,
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        <Text style={{ fontSize: 80, color: colors.fieryrose }}>GALEN</Text>
                        <View style={styles.inputBox}>
                            <InputComponent
                                icon="user"
                                placeholder="usuário"
                                placeholderTextColor={colors.fieryrose}
                                value={this.state.email}
                                onChangeText={email =>
                                    this.setState({ ...this.state, email: email })
                                }
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
                                <Ionicons
                                    name="ios-checkmark"
                                    size={50}
                                    style={
                                        this.state.remember
                                            ? styles.rememberIconTrue
                                            : styles.rememberIconFalse
                                    }
                                />
                                <Text
                                    style={[
                                        styles.rememberText,
                                        this.state.remember === true
                                            ? styles.rememberTextTrue
                                            : null
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
                    </ScrollView>
                </KeyboardAvoidingView>

                {this.state.forgotPassword ? (
                    <TouchableOpacity
                        onPress={() => alert("recuperando a senha")}
                        style={styles.forgotButton}
                    >
                        <Text style={styles.forgotText}>Esqueceu a senha?</Text>
                    </TouchableOpacity>
                ) : null}

                <HideWithKeyboard style={{ alignItems: "center", justifyContent: "center" }}>
                    <TouchableOpacity
                        onPress={this.searchAllnight}
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
                </HideWithKeyboard>
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
        width: "100%",
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
        height: 40,
        margin: 10,
        backgroundColor: colors.fieryrose,
        borderRadius: 4,
        alignItems: "center",
        justifyContent: "center"
    },
    loginButtonText: {
        color: colors.nyanza,
        fontSize: 20,
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
        marginTop: 20,
        margin: 5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    rememberText: {
        paddingLeft: 15,
        color: colors.nyanza,
        fontSize: 16,
        textAlign: "center"
    },
    rememberTextTrue: {
        color: colors.pistachio
    },
    rememberIconFalse: {
        color: colors.nyanza
    },
    rememberIconTrue: {
        color: colors.pistachio
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
    }

    // create account
    /* loginButton: {
        width: 150,
        height: 50,
        marginBottom: 5,
        backgroundColor: colors.fieryrose,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center"
    } */
});
