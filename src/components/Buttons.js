import React from 'react';
import {
  View, Text, StyleSheet, Dimensions, TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import colors from '../configs/common_styles';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: width - 20,
    height: height / 10,
    backgroundColor: colors.nyanza,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    padding: 5,
    shadowColor: colors.queenblue,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  text: {
    fontSize: 20,
    color: colors.fieryrose,
    textAlign: 'center',
    flexWrap: 'wrap',
  },
});

const Buttons = (props) => {
  const { navigateFunc, title } = props;

  return (
    <TouchableOpacity onPress={() => navigateFunc()}>
      <View style={styles.container}>
        <Text style={styles.text} numberOfLines={5}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Buttons;

Buttons.propTypes = {
  navigateFunc: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};
