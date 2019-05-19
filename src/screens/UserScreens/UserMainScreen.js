import React, { Component } from 'react';
import {
  View, StyleSheet, StatusBar, TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import colors from '../../configs/common_styles';
import Buttons from '../../components/Buttons';
import UserNameHeader from '../../components/UserNameHeader';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    backgroundColor: colors.metallicseaweed,
    flex: 1,
    padding: 10,
  },
});

class UserMainScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: <UserNameHeader />,
    headerRight: (
      <TouchableOpacity
        style={{ margin: 5, marginRight: 10 }}
        onPress={() => {
          navigation.navigate('UserSettingsScreen');
        }}
      >
        <Icon name="cogs" size={25} color={colors.nyanza} />
      </TouchableOpacity>
    ),
    headerTintColor: colors.nyanza,
    headerStyle: {
      backgroundColor: colors.fieryrose,
    },
  });

  constructor(props) {
    super(props);
    this.state = {};
    this.onNavigate = this.onNavigate.bind(this);
  }

  onNavigate = (path) => {
    const { navigation } = this.props;
    navigation.navigate(path, { authorized: true });
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={colors.fieryrose} barStyle="light-content" />
        <Buttons title="Buscar farmácias de plantão" navigateFunc={() => this.onNavigate('AllnightScreen')} />
        <Buttons title="Buscar farmácias abertas na região" navigateFunc={() => this.onNavigate('openDrugstores')} />
        <Buttons title="Pesquisar produtos" navigateFunc={() => this.onNavigate('ProductsScreen')} />
        <Buttons title="Meus produtos" navigateFunc={() => this.onNavigate('UserProductsScreen')} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  userName: state.user.name,
});

export default connect(mapStateToProps)(UserMainScreen);

UserMainScreen.propTypes = {
  navigation: PropTypes.objectOf(Object).isRequired,
};
