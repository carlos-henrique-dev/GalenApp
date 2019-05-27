import React from 'react';
import {
  Text, View, StyleSheet, TouchableOpacity, Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';
import colors from '../configs/common_styles';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: (width * 70) / 100,
    height: 40,
    marginTop: 20,
    // marginBottom: 10,
    justifyContent: 'space-around',
  },
  button: {
    width: 100,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: colors.nyanza,
  },
  textButton: {
    color: colors.nyanza,
    fontStyle: 'normal',
    fontSize: 16,
  },
  isCostumer: {
    backgroundColor: colors.fieryrose,
    borderColor: colors.fieryrose,
  },
});

const SelectType = (props) => {
  const { onSelect, isCostumer } = props;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onSelect} style={[styles.button, isCostumer ? styles.isCostumer : null]}>
        <Text style={styles.textButton}>Cliente</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onSelect} style={[styles.button, !isCostumer ? styles.isCostumer : null]}>
        <Text style={styles.textButton}>Farmácia</Text>
      </TouchableOpacity>
    </View>
  );
};

SelectType.propTypes = {
  onSelect: PropTypes.func.isRequired,
  isCostumer: PropTypes.bool.isRequired,
};

export default SelectType;
