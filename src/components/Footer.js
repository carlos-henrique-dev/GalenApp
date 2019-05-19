import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import colors from '../configs/common_styles';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'center',
    bottom: '1%',
  },
  button: {
    width: 160,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    marginTop: 2,
  },
  buttonText: {
    alignSelf: 'center',
    fontSize: 18,
    color: colors.nyanza,
  },
});

const Footer = (props) => {
  const {
    navigate, title1, title2, signup,
  } = props;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={navigate}>
        <View style={[styles.button, { backgroundColor: colors.lightcarminepink }]}>
          <Text style={styles.buttonText}>{title1}</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => signup()}>
        <View style={[styles.button, { backgroundColor: colors.pistachio }]}>
          <Text style={styles.buttonText}>{title2}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

Footer.propTypes = {
  navigate: PropTypes.func.isRequired,
  title1: PropTypes.string.isRequired,
  title2: PropTypes.string.isRequired,
  signup: PropTypes.func.isRequired,
};

export default Footer;
