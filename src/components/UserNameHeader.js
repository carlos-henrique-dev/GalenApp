import React from 'react';
import { StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import colors from '../configs/common_styles';

const styles = StyleSheet.create({
  text: {
    flex: 1,
    fontSize: 20,
    color: colors.nyanza,
    textAlign: 'center',
  },
});

const UserNameHeader = (props) => {
  const { userName, drugstorename } = props;
  return <Text style={styles.text}>{userName !== '' ? userName : drugstorename}</Text>;
};

const mapStateToProps = state => ({
  userName: state.user.name,
  drugstorename: state.drugstore.name,
});

UserNameHeader.propTypes = {
  userName: PropTypes.string,
  drugstorename: PropTypes.string,
};

UserNameHeader.defaultProps = {
  userName: '',
  drugstorename: '',
};

export default connect(mapStateToProps)(UserNameHeader);
