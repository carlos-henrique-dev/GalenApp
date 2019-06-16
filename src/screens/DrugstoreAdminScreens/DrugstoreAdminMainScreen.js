import React, { Component } from 'react';
import {
  View, StyleSheet, StatusBar, TouchableOpacity, Alert, ActivityIndicator, ToastAndroid,
} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../../configs/common_styles';
import Buttons from '../../components/Buttons';
import UserNameHeader from '../../components/UserNameHeader';

import api from '../../configs/api';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    backgroundColor: colors.honeydew,
    flex: 1,
    padding: 10,
  },
});

class DrugstoreAdminMainScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: <UserNameHeader />,
    headerRight: (
      <TouchableOpacity style={{ margin: 5, marginRight: 10 }} onPress={() => navigation.navigate('DrugstoreAdminSettingsScreen')}>
        <Icon name="cogs" size={25} color={colors.nyanza} />
      </TouchableOpacity>
    ),
    headerTintColor: colors.nyanza,
    headerStyle: {
      backgroundColor: colors.fieryrose,
    },
  });

  constructor(props) {
    super(props);
    this.state = {
      onDuty: false,
      changingStatus: false,
    };
    this.onNavigate = this.onNavigate.bind(this);
  }

  componentWillMount = async () => {
    const { drugstoreID } = this.props;
    this.changingStatus();
    await api
      .get(`drugstore/${drugstoreID}`)
      .then((res) => {
        const { allNigth } = res.data;
        this.changingStatus();
        this.setState({ onDuty: allNigth });
      })
      .catch(() => {
        this.changingStatus();
        ToastAndroid.show('Erro ao verificar seu status "plantão" ', ToastAndroid.SHORT);
      });
  };

  onNavigate = (path) => {
    const { navigation } = this.props;
    navigation.navigate(path, { authorized: true });
  };

  changingStatus = () => {
    const { changingStatus } = this.state;
    this.setState({ changingStatus: !changingStatus });
  };

  changeAllNightStatus = async () => {
    const { onDuty } = this.state;
    const { drugstoreID } = this.props;
    const newStatus = [{ propName: 'allNigth', value: !onDuty }];

    this.changingStatus();
    await api
      .patch(`drugstore/setAllnight/${drugstoreID}`, newStatus)
      .then((res) => {
        if (res.status === 200) {
          this.changingStatus();
          this.setState({ onDuty: !onDuty });
        }
      })
      .catch(() => {
        ToastAndroid.show('Erro ao alterar seu status para "plantão" ', ToastAndroid.SHORT);
      });
  };

  setToAllnight = () => {
    const { onDuty } = this.state;
    const message = onDuty ? 'Não está de plantão?' : 'Confirma que está de plantão hoje?';
    Alert.alert('Plantão', message, [
      {
        text: 'Cancelar',
        onPress: () => {},
      },
      {
        text: 'Sim',
        onPress: () => {
          this.changeAllNightStatus();
        },
      },
    ]);
  };

  render() {
    const { onDuty, changingStatus } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={colors.fieryrose} barStyle="light-content" />
        {changingStatus ? <ActivityIndicator size="large" color={colors.fieryrose} /> : null}
        <View style={{ flexDirection: 'row' }}>
          <Buttons title="Informar plantão" navigateFunc={this.setToAllnight} />
          <Ionicons
            name="ios-checkmark"
            size={80}
            style={{ position: 'absolute', right: '10%', top: '0.5%' }}
            color={onDuty ? colors.pistachio : '#c5c5c5'}
          />
        </View>
        <Buttons title="Produtos" navigateFunc={() => this.onNavigate('DrugstoreAdminProductsScreen')} />
        <Buttons title="Editar perfil" navigateFunc={() => this.onNavigate('DrugstoreAdminEditProfile')} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  drugstoreID: state.drugstore.id,
  allNight: state.drugstore.allNight,
  userName: state.drugstore.name,
});

export default connect(mapStateToProps)(DrugstoreAdminMainScreen);

DrugstoreAdminMainScreen.propTypes = {
  navigation: PropTypes.objectOf(Object).isRequired,
  drugstoreID: PropTypes.string.isRequired,
};
