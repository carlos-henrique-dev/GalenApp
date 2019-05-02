import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    Alert,
    KeyboardAvoidingView,
    ActivityIndicator
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { colors } from "../../configs/common_styles";
import InputComponent from "../../components/InputComponent";
import Footer from "../../components/Footer";
import Axios from "axios";
import { api } from "../../configs/api";

export default class SignUpScreen extends Component {
    static navigationOptions = {
        title: "Cadastro",
        headerTintColor: colors.nyanza,
        headerStyle: {
            backgroundColor: colors.fieryrose
        },
        headerTitleStyle: {
            color: colors.nyanza
        }
    };
    constructor(props) {
        super(props);
        this.state = {
            user: "Henrique",
            password: "henrique",
            repetpassword: "henrique",
            email: "henrique2@mail.com",
            companyName: "",
            CPNJ: "",
            street: "",
            number: "",
            aditionalAdressDetail: "",
            neighborhood: "",
            CEP: "",
            city: "",
            currentstate: "",
            tel: "",
            cel: "",
            loading: false,
            loginType: props.navigation.state.params.type
        };
        this.signUp = this.signUp.bind(this);
        this.setLoading = this.setLoading.bind(this);
    }

    setLoading() {
        this.setState(prevState => {
            return { loading: !prevState.loading };
        });
    }

    async signUp() {
        if (this.state.password === this.state.repetpassword) {
            this.setLoading();
            api.post("user/signup", {
                email: this.state.email,
                name: this.state.user,
                password: this.state.password,
                accessType: "costumer"
            })
                .then(res => {
                    if (res.status === 201) {
                        this.setLoading();
                        Alert.alert("Sucesso", "Conta criada com sucesso", [
                            {
                                text: "Ok",
                                onPress: () => {
                                    this.props.navigation.navigate("LoginScreen");
                                }
                            }
                        ]);
                    }
                })
                .catch(err => {
                    if (err.response.status === 409) {
                        this.setLoading();
                        Alert.alert("Erro", "Email já cadastrado");
                    }
                    if (err.response.status === 500) {
                        this.setLoading();
                        Alert.alert("Erro", "Problema interno");
                    }
                });
        } else {
            this.setLoading();
            Alert.alert("erro", "As senhas não conferem");
        }
    }

    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container} enabled>
                {/* <View style={styles.container}> */}
                <StatusBar backgroundColor={colors.fieryrose} barStyle="light-content" />
                {this.state.loading ? (
                    <ActivityIndicator size="large" color={colors.fieryrose} />
                ) : null}
                {this.state.loginType === "custumer" ? (
                    <View style={{ flexGrow: 1 }}>
                        <Text style={styles.loginAreaTitle}> Informe os seguintes dados </Text>
                        <InputComponent
                            icon="user"
                            placeholder="usuário"
                            returnKeyType="next"
                            placeholderTextColor={colors.nyanza}
                            value={this.state.user}
                            onChangeText={user => this.setState({ ...this.state, user: user })}
                        />
                        <InputComponent
                            icon="at"
                            placeholder="e-mail"
                            returnKeyType="next"
                            placeholderTextColor={colors.nyanza}
                            value={this.state.email}
                            onChangeText={email => this.setState({ ...this.state, email: email })}
                        />
                        <InputComponent
                            icon="lock"
                            placeholder="senha"
                            returnKeyType="next"
                            placeholderTextColor={colors.nyanza}
                            secureTextEntry={false}
                            value={this.state.password}
                            onChangeText={password =>
                                this.setState({ ...this.state, password: password })
                            }
                        />
                        <InputComponent
                            icon="lock"
                            placeholder="Confirme a senha"
                            returnKeyType="go"
                            placeholderTextColor={colors.nyanza}
                            secureTextEntry={false}
                            value={this.state.repetpassword}
                            onChangeText={repetpassword =>
                                this.setState({ ...this.state, repetpassword: repetpassword })
                            }
                        />
                    </View>
                ) : (
                    <View style={styles.loginArea}>
                        <ScrollView style={{ flex: 1 }}>
                            <Text style={styles.loginAreaTitle}> Informe os seguintes dados </Text>
                            <InputComponent
                                icon="building"
                                placeholder="nome da farmácia"
                                placeholderTextColor={colors.nyanza}
                                value={this.state.companyName}
                                onChangeText={companyName =>
                                    this.setState({ ...this.state, companyName: companyName })
                                }
                            />
                            <InputComponent
                                icon="id-card"
                                placeholder="CNPJ"
                                placeholderTextColor={colors.nyanza}
                                value={this.state.CNPJ}
                                onChangeText={CNPJ => this.setState({ ...this.state, CNPJ: CNPJ })}
                            />

                            <TouchableOpacity onPress={() => alert("selecionou a imagem")}>
                                <InputComponent
                                    icon="paperclip"
                                    placeholder="Selecione uma foto da sua farmácia"
                                    editable={false}
                                    placeholderTextColor={colors.nyanza}
                                    style={{ fontSize: 14 }}
                                />
                            </TouchableOpacity>

                            <Text style={styles.subTitle}>Dado de localização</Text>
                            <InputComponent
                                icon="road"
                                placeholder="Rua"
                                placeholderTextColor={colors.nyanza}
                                value={this.state.street}
                                onChangeText={street =>
                                    this.setState({ ...this.state, street: street })
                                }
                            />
                            <View style={{ flexDirection: "row" }}>
                                <InputComponent
                                    icon="phone"
                                    placeholder="Número"
                                    special
                                    placeholderTextColor={colors.nyanza}
                                    value={this.state.number}
                                    onChangeText={number =>
                                        this.setState({ ...this.state, number: number })
                                    }
                                />
                                <InputComponent
                                    icon="plus"
                                    placeholder="Complemento"
                                    special
                                    placeholderTextColor={colors.nyanza}
                                    value={this.state.aditionalAdressDetail}
                                    onChangeText={aditionalAdressDetail =>
                                        this.setState({
                                            ...this.state,
                                            aditionalAdressDetail: aditionalAdressDetail
                                        })
                                    }
                                />
                            </View>
                            <InputComponent
                                icon="road"
                                placeholder="Bairro"
                                placeholderTextColor={colors.nyanza}
                                value={this.state.neighborhood}
                                onChangeText={neighborhood =>
                                    this.setState({ ...this.state, neighborhood: neighborhood })
                                }
                            />
                            <InputComponent
                                icon="phone"
                                placeholder="CEP"
                                placeholderTextColor={colors.nyanza}
                                value={this.state.CEP}
                                onChangeText={CEP => this.setState({ ...this.state, CEP: CEP })}
                            />
                            <InputComponent
                                icon="road"
                                placeholder="Cidade"
                                placeholderTextColor={colors.nyanza}
                                value={this.state.city}
                                onChangeText={city => this.setState({ ...this.state, city: city })}
                            />
                            <InputComponent
                                icon="road"
                                placeholder="Estado"
                                placeholderTextColor={colors.nyanza}
                                value={this.state.currentstate}
                                onChangeText={currentstate =>
                                    this.setState({ ...this.state, currentstate: currentstate })
                                }
                            />

                            <Text style={styles.subTitle}>Contato</Text>
                            <InputComponent
                                icon="phone"
                                placeholder="Tel:"
                                placeholderTextColor={colors.nyanza}
                                value={this.state.tel}
                                onChangeText={tel => this.setState({ ...this.state, tel: tel })}
                            />
                            <InputComponent
                                icon="phone"
                                placeholder="Cel:"
                                placeholderTextColor={colors.nyanza}
                                value={this.state.cel}
                                onChangeText={cel => this.setState({ ...this.state, cel: cel })}
                            />

                            <Text style={styles.subTitle}>Dados da conta</Text>
                            <InputComponent
                                icon="user"
                                placeholder="usuário"
                                placeholderTextColor={colors.nyanza}
                                value={this.state.user}
                                onChangeText={user => this.setState({ ...this.state, user: user })}
                            />
                            <InputComponent
                                icon="at"
                                placeholder="e-mail"
                                placeholderTextColor={colors.nyanza}
                                value={this.state.email}
                                onChangeText={email =>
                                    this.setState({ ...this.state, email: email })
                                }
                            />
                            <InputComponent
                                icon="lock"
                                placeholder="senha"
                                placeholderTextColor={colors.nyanza}
                                secureTextEntry={true}
                                value={this.state.password}
                                onChangeText={password =>
                                    this.setState({ ...this.state, password: password })
                                }
                            />
                            <InputComponent
                                icon="lock"
                                placeholder="Confirme a senha"
                                placeholderTextColor={colors.nyanza}
                                secureTextEntry={true}
                                value={this.state.passwrepetpasswordord}
                                onChangeText={repetpassword =>
                                    this.setState({ ...this.state, repetpassword: repetpassword })
                                }
                            />
                        </ScrollView>
                    </View>
                )}

                <View style={styles.footer}>
                    <Footer
                        title1="Cancelar"
                        title2="Cadastrar"
                        navigate={() => this.props.navigation.goBack()}
                        signup={this.signUp}
                    />
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.metallicseaweed
    },
    footer: {
        /*  position: "absolute",
        bottom: 5 */
    },
    loginArea: {
        flex: 1,
        alignItems: "center",
        margin: 5,
        padding: 5
    },
    loginAreaTitle: {
        fontWeight: "bold",
        fontSize: 24,
        color: colors.nyanza
    },
    pickImage: {
        margin: 15,
        fontSize: 18,
        marginLeft: 10,
        color: colors.mainPurple
    },
    pickImageIcon: {
        color: colors.mainPurple,
        marginLeft: 5,
        marginRight: 5
    },
    subTitle: {
        marginTop: 10,
        color: colors.mainPurple,
        fontSize: 18,
        fontWeight: "bold"
    }
});
