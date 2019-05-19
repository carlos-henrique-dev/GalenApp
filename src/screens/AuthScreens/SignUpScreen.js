import React, { Component } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StatusBar, Alert, KeyboardAvoidingView, ActivityIndicator, Platform,
} from 'react-native';
import PropTypes from 'prop-types';
import HideWithKeyboard from 'react-native-hide-with-keyboard';
import colors from '../../configs/common_styles';
import InputComponent from '../../components/InputComponent';
import Footer from '../../components/Footer';
import api from '../../configs/api';

import { SignUpScreenStyles } from '../../configs/authscreensStyles';

export default class SignUpScreen extends Component {
  static propTypes = {
    navigation: PropTypes.objectOf.isRequired,
    loginType: PropTypes.string.isRequired,
  };

  static navigationOptions = {
    title: 'Cadastro',
    headerTintColor: colors.nyanza,
    headerStyle: {
      backgroundColor: colors.fieryrose,
    },
    headerTitleStyle: {
      color: colors.nyanza,
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      user: '',
      password: '',
      repetpassword: '',
      email: '',
      companyName: '',
      CNPJ: '',
      street: '',
      number: '',
      aditionalAdressDetail: '',
      neighborhood: '',
      CEP: '',
      city: '',
      currentstate: '',
      tel: '',
      cel: '',
      loading: false,
    };
    this.signUp = this.signUp.bind(this);
    this.setLoading = this.setLoading.bind(this);
  }

  setLoading() {
    this.setState(prevState => ({ loading: !prevState.loading }));
  }

  async signUp() {
    const {
      password, repetpassword, email, user,
    } = this.state;
    const { navigation } = this.props;

    if (password === repetpassword) {
      this.setLoading();
      api
        .post('user/signup', {
          email,
          name: user,
          password,
          accessType: 'costumer',
        })
        .then((res) => {
          if (res.status === 201) {
            this.setLoading();
            Alert.alert('Sucesso', 'Conta criada com sucesso', [
              {
                text: 'Ok',
                onPress: () => {
                  navigation.navigate('LoginScreen');
                },
              },
            ]);
          }
        })
        .catch((err) => {
          if (err.response.status === 409) {
            this.setLoading();
            Alert.alert('Erro', 'Email já cadastrado');
          }
          if (err.response.status === 500) {
            this.setLoading();
            Alert.alert('Erro', 'Problema interno');
          }
        });
    } else {
      this.setLoading();
      Alert.alert('erro', 'As senhas não conferem');
    }
  }

  render() {
    const destructuredState = this.state;
    const { loginType, navigation } = this.props;

    return (
      <View behavior="padding" style={SignUpScreenStyles.container} enabled>
        <StatusBar backgroundColor={colors.fieryrose} barStyle="light-content" />
        {destructuredState.loading ? <ActivityIndicator size="large" color={colors.fieryrose} /> : null}
        {loginType === 'custumer' ? (
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : null}
            style={{
              flex: 1,
              width: '100%',
            }}
          >
            <ScrollView
              contentContainerStyle={{
                flexGrow: 1,
                alignItems: 'center',
                justifyContent: 'flex-start',
                marginTop: 10,
              }}
            >
              <Text style={SignUpScreenStyles.loginAreaTitle}> Informe os seguintes dados </Text>
              <InputComponent
                icon="user"
                placeholder="usuário"
                returnKeyType="next"
                placeholderTextColor={colors.nyanza}
                value={destructuredState.user}
                onChangeText={newUSer => this.setState({ user: newUSer })}
              />
              <InputComponent
                icon="at"
                placeholder="e-mail"
                returnKeyType="next"
                placeholderTextColor={colors.nyanza}
                value={destructuredState.email}
                onChangeText={newEmail => this.setState({ email: newEmail })}
              />
              <InputComponent
                icon="lock"
                placeholder="senha"
                returnKeyType="next"
                placeholderTextColor={colors.nyanza}
                secureTextEntry={false}
                value={destructuredState.password}
                onChangeText={newPassword => this.setState({ password: newPassword })}
              />
              <InputComponent
                icon="lock"
                placeholder="Confirme a senha"
                returnKeyType="go"
                placeholderTextColor={colors.nyanza}
                secureTextEntry={false}
                value={destructuredState.repetpassword}
                onChangeText={newRepetpassword => this.setState({ repetpassword: newRepetpassword })}
              />
            </ScrollView>
          </KeyboardAvoidingView>
        ) : (
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : null}
            style={{
              flex: 1,
              width: '100%',
            }}
          >
            <ScrollView contentContainerStyle={SignUpScreenStyles.loginArea}>
              <Text style={SignUpScreenStyles.loginAreaTitle}> Informe os seguintes dados </Text>
              <InputComponent
                icon="building"
                placeholder="nome da farmácia"
                placeholderTextColor={colors.nyanza}
                value={destructuredState.companyName}
                onChangeText={newCompanyName => this.setState({ companyName: newCompanyName })}
              />
              <InputComponent
                icon="id-card"
                placeholder="CNPJ"
                placeholderTextColor={colors.nyanza}
                value={destructuredState.CNPJ}
                onChangeText={newCNPJ => this.setState({ CNPJ: newCNPJ })}
              />

              <TouchableOpacity onPress={() => Alert.alert('selecionou a imagem')}>
                <InputComponent
                  icon="paperclip"
                  placeholder="Selecione uma foto da sua farmácia"
                  editable={false}
                  placeholderTextColor={colors.nyanza}
                  style={{ fontSize: 14 }}
                />
              </TouchableOpacity>

              <Text style={SignUpScreenStyles.subTitle}>Dado de localização</Text>
              <InputComponent
                icon="road"
                placeholder="Rua"
                placeholderTextColor={colors.nyanza}
                value={destructuredState.street}
                onChangeText={newStreet => this.setState({ street: newStreet })}
              />
              <View style={{ flexDirection: 'row' }}>
                <InputComponent
                  icon="phone"
                  placeholder="Número"
                  special
                  placeholderTextColor={colors.nyanza}
                  value={destructuredState.number}
                  onChangeText={newNumber => this.setState({ number: newNumber })}
                />
                <InputComponent
                  icon="plus"
                  placeholder="Complemento"
                  special
                  placeholderTextColor={colors.nyanza}
                  value={destructuredState.aditionalAdressDetail}
                  onChangeText={newAditionalAdressDetail => this.setState({
                    aditionalAdressDetail: newAditionalAdressDetail,
                  })
                  }
                />
              </View>
              <InputComponent
                icon="road"
                placeholder="Bairro"
                placeholderTextColor={colors.nyanza}
                value={destructuredState.neighborhood}
                onChangeText={newNeighborhood => this.setState({ neighborhood: newNeighborhood })}
              />
              <InputComponent
                icon="phone"
                placeholder="CEP"
                placeholderTextColor={colors.nyanza}
                value={destructuredState.CEP}
                onChangeText={newCEP => this.setState({ CEP: newCEP })}
              />
              <InputComponent
                icon="road"
                placeholder="Cidade"
                placeholderTextColor={colors.nyanza}
                value={destructuredState.city}
                onChangeText={newCity => this.setState({ city: newCity })}
              />
              <InputComponent
                icon="road"
                placeholder="Estado"
                placeholderTextColor={colors.nyanza}
                value={destructuredState.currentstate}
                onChangeText={newCurrentstate => this.setState({ currentstate: newCurrentstate })}
              />

              <Text style={SignUpScreenStyles.subTitle}>Contato</Text>
              <InputComponent
                icon="phone"
                placeholder="Tel:"
                placeholderTextColor={colors.nyanza}
                value={destructuredState.tel}
                onChangeText={newTel => this.setState({ tel: newTel })}
              />
              <InputComponent
                icon="phone"
                placeholder="Cel:"
                placeholderTextColor={colors.nyanza}
                value={destructuredState.cel}
                onChangeText={newCel => this.setState({ cel: newCel })}
              />

              <Text style={SignUpScreenStyles.subTitle}>Dados da conta</Text>
              <InputComponent
                icon="user"
                placeholder="usuário"
                placeholderTextColor={colors.nyanza}
                value={destructuredState.user}
                onChangeText={newUser => this.setState({ user: newUser })}
              />
              <InputComponent
                icon="at"
                placeholder="e-mail"
                placeholderTextColor={colors.nyanza}
                value={destructuredState.email}
                onChangeText={newEmail => this.setState({ email: newEmail })}
              />
              <InputComponent
                icon="lock"
                placeholder="senha"
                placeholderTextColor={colors.nyanza}
                secureTextEntry
                value={destructuredState.password}
                onChangeText={newPassword => this.setState({ password: newPassword })}
              />
              <InputComponent
                icon="lock"
                placeholder="Confirme a senha"
                placeholderTextColor={colors.nyanza}
                secureTextEntry
                value={destructuredState.passwrepetpasswordord}
                onChangeText={newRepetpassword => this.setState({ repetpassword: newRepetpassword })}
              />
            </ScrollView>
          </KeyboardAvoidingView>
        )}

        <HideWithKeyboard style={SignUpScreenStyles.footer}>
          <Footer title1="Cancelar" title2="Cadastrar" navigate={() => navigation.goBack()} signup={this.signUp} />
        </HideWithKeyboard>
      </View>
    );
  }
}
