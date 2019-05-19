import React, { Component } from 'react';
import {
  View, Text, StyleSheet, StatusBar, ActivityIndicator, AsyncStorage, ToastAndroid,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import api from '../../configs/api';
import { userLogin } from '../../store/ducks/user';
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
    saveLoginData: PropTypes.func,
  };

  static defaultProps = {
    navigation: null,
    saveLoginData: null,
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
    const { navigation, saveLoginData } = this.props;
    this.setLoading();
    await AsyncStorage.getItem('data')
      .then((result) => {
        const res = JSON.parse(result) || null;

        if (res !== null) {
          api.defaults.headers.common.Authorization = `bearer ${res.token}`;
          saveLoginData(res);
          this.setLoading();
          navigation.navigate('UserMainScreen');
        } else {
          navigation.navigate('LoginScreen');
        }
      })
      .catch(() => {
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

const mapDispatchToProps = dispatch => ({ saveLoginData: data => dispatch(userLogin(data)) });

export default connect(
  null,
  mapDispatchToProps,
)(SplashScreen);
