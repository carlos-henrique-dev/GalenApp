import React from 'react';
import {
  View, TextInput, StyleSheet, Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';
import colors from '../configs/common_styles';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  textInputArea: {
    flexDirection: 'row',
    width: (width * 80) / 100,
    height: 45,
    margin: 5,
    marginTop: 15,
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: colors.nyanza,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  specialInputArea: {
    width: '45%',
  },
  input: {
    fontSize: 16,
    marginLeft: 5,
    color: colors.nyanza,
  },
  icon: {
    color: colors.fieryrose,
    marginLeft: 5,
    marginRight: 5,
  },
});

const InputComponent = (props) => {
  const {
    special, icon, returnKeyType, style,
  } = props;
  return (
    <View style={[styles.textInputArea, special ? styles.specialInputArea : null]}>
      <Icon name={icon} size={20} style={styles.icon} />
      <TextInput {...props} returnKeyType={returnKeyType} style={[styles.input, style]} autoCapitalize="none" numberOfLines={2} />
    </View>
  );
};

InputComponent.propTypes = {
  special: PropTypes.bool,
  icon: PropTypes.string.isRequired,
  returnKeyType: PropTypes.string,
  style: PropTypes.objectOf(Object),
};

InputComponent.defaultProps = {
  special: false,
  returnKeyType: 'done',
  style: null,
};

export default InputComponent;
