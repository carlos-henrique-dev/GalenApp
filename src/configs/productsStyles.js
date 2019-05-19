import { StyleSheet, Dimensions } from 'react-native';
import colors from './common_styles';

const { width, height } = Dimensions.get('window');

export const UserProductsScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  filter: {
    height: 35,
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
  },
  filterText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  userWhoPosted: {
    margin: 5,
    fontSize: 16,
    color: colors.fieryrose,
    opacity: 0.8,
  },
  flatList: {
    paddingBottom: 60,
  },
  addButtonContainer: {
    position: 'absolute',
    bottom: 5,
    right: 10,
    width: 60,
    height: 60,
  },
  addButton: {
    width: 60,
    height: 60,
  },
});

export const lala = '';
