import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  AsyncStorage,
} from 'react-native';
import PropTypes from 'prop-types';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import HideWithKeyboard from 'react-native-hide-with-keyboard';
import InputComponent from '../../components/InputComponent';
import api from '../../configs/api';
import colors from '../../configs/common_styles';
import { LoginScreenStyles } from '../../configs/authscreensStyles';
import { userLogin } from '../../store/ducks/user';
import OffilineNotice from '../../components/OfflineNotice';

class LoginScreen extends Component {
  static propTypes = {
    navigation: PropTypes.objectOf.isRequired,
    saveLoginData: PropTypes.func.isRequired,
  };

  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      remember: false,
      forgotPassword: false,
      loading: false,
      disabledButtons: false,
    };

    this.login = this.login.bind(this);
    this.createAccount = this.createAccount.bind(this);
    this.searchAllnight = this.searchAllnight.bind(this);
    this.setLoading = this.setLoading.bind(this);
    this.disableButtons = this.disableButtons.bind(this);
  }

  setLoading() {
    this.setState(prevState => ({ loading: !prevState.loading }));
  }

  disableButtons(action) {
    this.setState({ disabledButtons: action });
  }

  async login() {
    const { email, password, remember } = this.state;
    const { navigation, saveLoginData } = this.props;

    this.setLoading();
    if (email.trim() !== '' && password.trim() !== '') {
      try {
        const res = await api.post('user/login', {
          email,
          password,
        });
        if (res.status === 200) {
          api.defaults.headers.common.Authorization = `bearer ${res.data.response.token}`;
          if (remember) {
            await AsyncStorage.setItem('data', JSON.stringify(res.data.response)).then(() => {
              saveLoginData(res.data.response);
              this.setLoading();
              navigation.navigate('UserPaths');
            });
          } else {
            this.saveLoginData(res.data.response);
            this.setLoading();
            navigation.navigate('UserPaths');
          }
        } else if (res.status === 401) {
          this.setLoading();
          Alert.alert('Erro', 'Dados inválidos');
        }
      } catch (error) {
        this.setLoading();
        Alert.alert('erro', `Erro no login: ${error}`);
      }
    } else {
      this.setLoading();
      Alert.alert('erro', 'Campos vazios');
    }
  }

  createAccount() {
    const { navigation } = this.props;
    navigation.navigate('FirstLogin');
  }

  searchAllnight() {
    const { navigation } = this.props;
    navigation.navigate('AllnightScreenPublic', { authorized: false });
  }

  render() {
    const {
      loading, email, password, remember, disabledButtons, forgotPassword,
    } = this.state;
    return (
      <View style={LoginScreenStyles.screen}>
        <StatusBar backgroundColor={colors.metallicseaweed} barStyle="light-content" />
        <OffilineNotice onChange={this.disableButtons} />
        {loading ? <ActivityIndicator size="large" color={colors.fieryrose} /> : null}
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
              justifyContent: 'center',
            }}
          >
            <Text style={{ fontSize: 80, color: colors.fieryrose }}>GALEN</Text>
            <View style={LoginScreenStyles.inputBox}>
              <InputComponent
                icon="user"
                placeholder="usuário"
                placeholderTextColor={colors.fieryrose}
                value={email}
                onChangeText={newEmail => this.setState({ email: newEmail })}
              />
              <InputComponent
                icon="lock"
                placeholder="senha"
                placeholderTextColor={colors.fieryrose}
                secureTextEntry={false}
                value={password}
                onChangeText={newPassword => this.setState({ password: newPassword })}
              />

              <TouchableOpacity onPress={() => this.setState({ remember: !remember })} style={LoginScreenStyles.rememberButton}>
                <Ionicons
                  name="ios-checkmark"
                  size={50}
                  style={remember ? LoginScreenStyles.rememberIconTrue : LoginScreenStyles.rememberIconFalse}
                />
                <Text style={[LoginScreenStyles.rememberText, remember === true ? LoginScreenStyles.rememberTextTrue : null]}>Lembre-se de mim</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity disabled={disabledButtons} onPress={this.login} style={LoginScreenStyles.loginButton}>
              <Text style={LoginScreenStyles.loginButtonText}>Entrar</Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>

        {forgotPassword ? (
          <TouchableOpacity onPress={() => Alert.alert('recuperando a senha')} style={LoginScreenStyles.forgotButton}>
            <Text style={LoginScreenStyles.forgotText}>Esqueceu a senha?</Text>
          </TouchableOpacity>
        ) : null}

        <HideWithKeyboard style={{ alignItems: 'center', justifyContent: 'center' }}>
          <TouchableOpacity onPress={this.searchAllnight} style={LoginScreenStyles.findPharmacyButton}>
            <Text style={LoginScreenStyles.findPharmacyText}>Encontrar farmácia de plantão</Text>
          </TouchableOpacity>

          <TouchableOpacity disabled={disabledButtons} onPress={this.createAccount} style={LoginScreenStyles.loginButton}>
            <Text style={LoginScreenStyles.loginButtonText}>Criar conta</Text>
          </TouchableOpacity>
        </HideWithKeyboard>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({ saveLoginData: data => dispatch(userLogin(data)) });

export default connect(
  null,
  mapDispatchToProps,
)(LoginScreen);
