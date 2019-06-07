import { StyleSheet, Dimensions } from 'react-native';
import colors from './common_styles';

const { width } = Dimensions.get('window');

export const UserSettingsScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  divisor: {
    borderTopWidth: 0.8,
    width: (width * 80) / 100,
    color: colors.queenblue,
  },
  subTitle: {
    fontSize: 15,
    color: colors.queenblue,
    paddingBottom: 10,
  },
  configsCards: {
    margin: 5,
    width,
    paddingLeft: 10,
    paddingRight: 10,
  },
  buttonBox: {
    marginTop: 10,
    alignItems: 'center',
    padding: 5,
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 0,
      width: 4,
    },
  },
  buttonText: {
    fontSize: 15,
    color: colors.fieryrose,
  },
});

export const lala = '';
