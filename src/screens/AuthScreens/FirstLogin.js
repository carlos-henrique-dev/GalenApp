import React, { Component } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../../configs/common_styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.metallicseaweed,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtom: {
    width: 40,
    height: 40,
    position: 'absolute',
    top: 10,
    left: 5,
  },
  title: {
    color: colors.fieryrose,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 50,
  },
  optionButtom: {
    width: 250,
    height: 150,
    padding: 10,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.fieryrose,
  },
  icon: {
    alignSelf: 'center',
    color: colors.fieryrose,
  },
});

export default class FirstLogin extends Component {
  static propTypes = {
    navigation: PropTypes.objectOf(Object).isRequired,
  };

  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {};
    this.signUp = this.signUp.bind(this);
  }

  signUp(data) {
    const { navigation } = this.props;
    navigation.navigate('SignUpScreen', { type: data });
  }

  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.backButtom}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="ios-arrow-back" size={35} style={styles.icon} />
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>Escolha a opção desejada </Text>

        <View style={styles.optionButtom}>
          <TouchableOpacity onPress={() => this.signUp('drugstoreadmin')}>
            <Ionicons name="md-globe" size={90} style={styles.icon} />
            <Text style={styles.optionText}>Possuo uma farmácia</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.optionButtom}>
          <TouchableOpacity onPress={() => this.signUp('costumer')}>
            <Ionicons name="md-people" size={90} style={styles.icon} />
            <Text style={styles.optionText}>Sou cliente</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
