import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity, Alert, AsyncStorage, ToastAndroid,
} from 'react-native';
import PropTypes from 'prop-types';
import colors from '../../configs/common_styles';
import { UserSettingsScreenStyles } from '../../configs/userStyles';

export default class UserSettingsScreen extends Component {
  static propTypes = {
    navigation: PropTypes.objectOf(Object).isRequired,
  };

  static navigationOptions = {
    headerTitle: 'Configurações',
    headerTintColor: colors.nyanza,
    headerStyle: {
      backgroundColor: colors.fieryrose,
    },
  };

  constructor(props) {
    super(props);
    this.state = {};

    this.logout = this.logout.bind(this);
  }

  logout() {
    const { navigation } = this.props;
    Alert.alert(
      'Deslogar',
      'Deseja mesmo deslogar?',
      [
        {
          text: 'Não',
        },
        {
          text: 'Sim',
          onPress: async () => {
            await AsyncStorage.removeItem('data')
              .then(() => {
                navigation.navigate('LoginScreen');
              })
              .catch(() => {
                ToastAndroid.show('Erro', ToastAndroid.SHORT);
              });
          },
        },
      ],
      { cancelable: false },
    );
  }

  render() {
    return (
      <View style={UserSettingsScreenStyles.container}>
        <View style={[UserSettingsScreenStyles.configsCards, { flex: 3 }]}>
          <Text style={UserSettingsScreenStyles.subTitle}> Configurações da conta </Text>
        </View>
        <View style={UserSettingsScreenStyles.divisor} />
        <View style={[UserSettingsScreenStyles.configsCards, { flex: 1 }]}>
          <Text style={UserSettingsScreenStyles.subTitle}> Configurações do aplicativo </Text>

          <View elevation={5} style={UserSettingsScreenStyles.buttonBox}>
            <TouchableOpacity onPress={this.logout}>
              <Text style={UserSettingsScreenStyles.buttonText}>Deslogar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
