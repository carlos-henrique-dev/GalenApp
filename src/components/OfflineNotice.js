import React, { Component } from 'react';
import {
  View, Text, Dimensions, StyleSheet, Platform,
} from 'react-native';
import PropTypes from 'prop-types';
import NetInfo from '@react-native-community/netinfo';
import colors from '../configs/common_styles';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  offlineContainer: {
    backgroundColor: colors.lightcarminepink,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width,
    position: 'absolute',
    top: Platform.os === 'ios' ? 30 : 0,
  },
  offlineText: {
    color: '#fff',
  },
});

function MiniOffliineSign() {
  return (
    <View style={styles.offlineContainer}>
      <Text style={styles.offlineText}>Sem conexão com a internet</Text>
    </View>
  );
}

export default class OfflineNotice extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      isConected: 'wifi',
    };
    this.handleConnectivityChange = this.handleConnectivityChange.bind(this);
  }

  componentDidMount() {
    NetInfo.addEventListener('connectionChange', this.handleConnectivityChange);
  }

  componentWillUnmount() {
    NetInfo.removeEventListener('connectionChange', this.handleConnectivityChange);
  }

  handleConnectivityChange(connectionInfo) {
    const { isConected } = this.state;
    const { onChange } = this.props;
    this.setState({ isConected: connectionInfo.type }, () => {
      if (isConected === 'none' || isConected === 'unkown') {
        onChange(true);
      } else {
        onChange(false);
      }
    });
  }

  render() {
    const { isConected } = this.state;
    if (isConected === 'none' || isConected === 'unkown') {
      return <MiniOffliineSign />;
    }
    return null;
  }
}
