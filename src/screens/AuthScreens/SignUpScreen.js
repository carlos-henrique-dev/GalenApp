import React, { Component } from 'react';
import {
  View, Text, ScrollView, StatusBar, Alert, KeyboardAvoidingView, ActivityIndicator, Platform, ToastAndroid,
} from 'react-native';
import PropTypes from 'prop-types';
import HideWithKeyboard from 'react-native-hide-with-keyboard';
import Geocoder from 'react-native-geocoding';
import colors from '../../configs/common_styles';
import InputComponent from '../../components/InputComponent';
import Footer from '../../components/Footer';
import api from '../../configs/api';

import mapskey from '../../configs/maps';

import { SignUpScreenStyles } from '../../configs/authscreensStyles';

export default class SignUpScreen extends Component {
  static propTypes = {
    navigation: PropTypes.objectOf(Object).isRequired,
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
      repeatpassword: '',
      email: '',
      companyName: '',
      CNPJ: '',
      street: '',
      number: '',
      neighborhood: '',
      CEP: '',
      city: '',
      currentstate: '',
      tel: '',
      cel: '',
      longitude: '',
      latitude: '',
      loading: false,
    };
    this.signUp = this.signUp.bind(this);
    this.setLoading = this.setLoading.bind(this);
    this.costumerSignUp = this.costumerSignUp.bind(this);
    this.drugstoreSignUp = this.drugstoreSignUp.bind(this);
    this.defineLoginType = this.defineLoginType.bind(this);
  }

  componentDidMount() {
    Geocoder.init(mapskey, { language: 'pt' });
    this.getUserPosition();
  }

  getUserPosition = async () => {
    navigator.geolocation.getCurrentPosition(
      async ({ coords: { latitude, longitude } }) => {
        this.setState({ latitude, longitude });
      },
      (err) => {
        ToastAndroid.show(`Erro ao pegar a localização do usuário \n ${err}`, ToastAndroid.SHORT);
      },
      { enableHighAccuracy: true },
    );
  };

  setLoading = () => {
    this.setState(prevState => ({ loading: !prevState.loading }));
  };

  costumerSignUp = () => {
    const { password, email, user } = this.state;
    return api.post('user/signup', {
      email,
      name: user,
      password,
      accessType: 'costumer',
    });
  };

  drugstoreSignUp = () => {
    const {
      password,
      email,
      user,
      companyName,
      CNPJ,
      street,
      number,
      neighborhood,
      CEP,
      city,
      currentstate,
      tel,
      cel,
      longitude,
      latitude,
    } = this.state;
    const address = {
      street,
      number,
      neighborhood,
      zipcode: CEP,
      city,
      state: currentstate,
      gpsCoordinates: { longitude, latitude },
    };
    const contacts = [{ areacode: '67', number: tel }, { areacode: '67', number: cel }];
    return api.post('user/signup', {
      accessType: 'drugstoreadmin',
      name: companyName,
      cnpj: CNPJ,
      address,
      contacts,
      manager: user,
      email,
      password,
    });
  };

  defineLoginType = () => {
    const { navigation } = this.props;
    return navigation.state.params.type === 'costumer' ? this.costumerSignUp() : this.drugstoreSignUp();
  };

  signUp = async () => {
    const { password, repeatpassword } = this.state;
    const { navigation } = this.props;
    this.setLoading();

    if (password === repeatpassword) {
      this.defineLoginType()
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
  };

  render() {
    const destructuredState = this.state;
    const { navigation } = this.props;

    return (
      <View behavior="padding" style={SignUpScreenStyles.container} enabled>
        <StatusBar backgroundColor={colors.fieryrose} barStyle="light-content" />
        {destructuredState.loading ? <ActivityIndicator size="large" color={colors.fieryrose} /> : null}
        {navigation.state.params.type === 'costumer' ? (
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
                secureTextEntry
                value={destructuredState.password}
                onChangeText={newPassword => this.setState({ password: newPassword })}
              />
              <InputComponent
                icon="lock"
                placeholder="Confirme a senha"
                returnKeyType="go"
                placeholderTextColor={colors.nyanza}
                secureTextEntry
                value={destructuredState.repeatpassword}
                onChangeText={newRepeatpassword => this.setState({ repeatpassword: newRepeatpassword })}
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
              <Text style={SignUpScreenStyles.loginAreaTitle}>Dados de cadastro</Text>
              <InputComponent
                icon="user"
                placeholder="Nome do responsável *"
                placeholderTextColor={colors.nyanza}
                value={destructuredState.user}
                onChangeText={newUser => this.setState({ user: newUser })}
              />
              <InputComponent
                icon="at"
                placeholder="E-mail *"
                placeholderTextColor={colors.nyanza}
                value={destructuredState.email}
                onChangeText={newEmail => this.setState({ email: newEmail })}
              />
              <InputComponent
                icon="lock"
                placeholder="Senha *"
                placeholderTextColor={colors.nyanza}
                secureTextEntry
                value={destructuredState.password}
                onChangeText={newPassword => this.setState({ password: newPassword })}
              />
              <InputComponent
                icon="lock"
                placeholder="Confirme a senha *"
                placeholderTextColor={colors.nyanza}
                secureTextEntry
                value={destructuredState.repeatpassword}
                onChangeText={newRepeatpassword => this.setState({ repeatpassword: newRepeatpassword })}
              />

              <Text style={SignUpScreenStyles.subTitle}> Informe os seguintes dados da farmácia</Text>
              <InputComponent
                placeholder="Nome da farmácia *"
                placeholderTextColor={colors.nyanza}
                value={destructuredState.companyName}
                onChangeText={newCompanyName => this.setState({ companyName: newCompanyName })}
              />
              <InputComponent
                placeholder="CNPJ *"
                placeholderTextColor={colors.nyanza}
                value={destructuredState.CNPJ}
                onChangeText={newCNPJ => this.setState({ CNPJ: newCNPJ })}
              />

              <Text style={SignUpScreenStyles.subTitle}>localização</Text>
              <InputComponent
                placeholder="Rua *"
                placeholderTextColor={colors.nyanza}
                value={destructuredState.street}
                onChangeText={newStreet => this.setState({ street: newStreet })}
              />

              <View style={{ flexDirection: 'row' }}>
                <InputComponent
                  placeholder="Número *"
                  special
                  placeholderTextColor={colors.nyanza}
                  value={destructuredState.number}
                  onChangeText={newNumber => this.setState({ number: newNumber })}
                />

                <InputComponent
                  placeholder="Bairro"
                  special
                  placeholderTextColor={colors.nyanza}
                  value={destructuredState.neighborhood}
                  onChangeText={newNeighborhood => this.setState({ neighborhood: newNeighborhood })}
                />
              </View>

              <InputComponent
                placeholder="CEP *"
                placeholderTextColor={colors.nyanza}
                value={destructuredState.CEP}
                onChangeText={newCEP => this.setState({ CEP: newCEP })}
              />
              <InputComponent
                placeholder="Cidade *"
                placeholderTextColor={colors.nyanza}
                value={destructuredState.city}
                onChangeText={newCity => this.setState({ city: newCity })}
              />
              <InputComponent
                placeholder="Estado"
                placeholderTextColor={colors.nyanza}
                value={destructuredState.currentstate}
                onChangeText={newCurrentstate => this.setState({ currentstate: newCurrentstate })}
              />

              <Text style={SignUpScreenStyles.subTitle}>Contato</Text>
              <InputComponent
                placeholder="Tel: *"
                placeholderTextColor={colors.nyanza}
                value={destructuredState.tel}
                onChangeText={newTel => this.setState({ tel: newTel })}
              />
              <InputComponent
                placeholder="Cel:"
                placeholderTextColor={colors.nyanza}
                value={destructuredState.cel}
                onChangeText={newCel => this.setState({ cel: newCel })}
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
