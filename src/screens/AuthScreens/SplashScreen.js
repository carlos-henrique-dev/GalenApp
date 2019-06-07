import React, { Component } from 'react';
import {
  View, Text, StyleSheet, StatusBar, ActivityIndicator, AsyncStorage, ToastAndroid,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import api from '../../configs/api';
import { userLogin } from '../../store/ducks/user';
import { drugstoreLogin } from '../../store/ducks/drugstore';
import colors from '../../configs/common_styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.metallicseaweed,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 80,
    color: colors.fieryrose,
  },
});

class SplashScreen extends Component {
  static propTypes = {
    navigation: PropTypes.objectOf(Object),
    saveCostumerLoginData: PropTypes.func,
    saveDrugstoreLoginData: PropTypes.func,
  };

  static defaultProps = {
    navigation: null,
    saveCostumerLoginData: null,
    saveDrugstoreLoginData: null,
  };

  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };

    this.setLoading = this.setLoading.bind(this);
  }

  async componentDidMount() {
    const { navigation, saveCostumerLoginData, saveDrugstoreLoginData } = this.props;
    this.setLoading();
    const getuserType = await AsyncStorage.getItem('userType');
    const userType = await JSON.parse(getuserType);
    await AsyncStorage.getItem('data')
      .then((result) => {
        const res = JSON.parse(result) || null;

        if (res !== null) {
          api.defaults.headers.common.Authorization = `bearer ${res.token}`;
          this.setLoading();
          if (userType === 'costumer') {
            saveCostumerLoginData(res);
            navigation.navigate('UserMainScreen');
          } else if (userType === 'drugstoreadmin') {
            saveDrugstoreLoginData(res);

            navigation.navigate('DrugstoreAdminMainScreen');
          }
        } else {
          navigation.navigate('LoginScreen');
        }
      })
      .catch((err) => {
        console.log('err', err);
        ToastAndroid.show('erro', ToastAndroid.SHORT);
      });
  }

  setLoading() {
    this.setState(prevState => ({ loading: !prevState.loading }));
  }

  render() {
    const { loading } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={colors.metallicseaweed} />
        <Text style={styles.title}> GALEN </Text>
        {loading ? <ActivityIndicator size={50} color={colors.fieryrose} /> : null}
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  saveCostumerLoginData: data => dispatch(userLogin(data)),
  saveDrugstoreLoginData: data => dispatch(drugstoreLogin(data)),
});

export default connect(
  null,
  mapDispatchToProps,
)(SplashScreen);
