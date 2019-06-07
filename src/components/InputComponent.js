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
    width: (width * 90) / 100,
    height: 30,
    margin: 5,
    // marginTop: 10,
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
    paddingBottom: 0,
  },
  icon: {
    color: colors.fieryrose,
    marginLeft: 5,
    marginRight: 5,
    paddingBottom: 0,
  },
});

const InputComponent = (props) => {
  const {
    special, icon, returnKeyType, style,
  } = props;
  return (
    <View style={[styles.textInputArea, special ? styles.specialInputArea : null]}>
      {icon ? <Icon name={icon} size={20} style={styles.icon} /> : null}
      <TextInput {...props} returnKeyType={returnKeyType} style={[styles.input, style]} autoCapitalize="none" numberOfLines={2} />
    </View>
  );
};

InputComponent.propTypes = {
  special: PropTypes.bool,
  icon: PropTypes.string,
  returnKeyType: PropTypes.string,
  style: PropTypes.objectOf(Object),
};

InputComponent.defaultProps = {
  special: false,
  returnKeyType: 'done',
  style: null,
  icon: '',
};

export default InputComponent;
