import { StyleSheet, Dimensions } from 'react-native';
import colors from './common_styles';

const { width } = Dimensions.get('window');

export const DrugstoreDetailsStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginLeft: 5,
    marginRight: 5,
  },
  imageContainer: {
    width,
    height: 200,
    justifyContent: 'center',
  },
  image: {
    flex: 1,
  },
  imageText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#CED4DA',
    textAlign: 'center',
  },
  detailContainer: {
    marginTop: 15,
    width: width - 10,
    alignContent: 'flex-start',
    marginLeft: 5,
    borderLeftWidth: 1,
    borderLeftColor: colors.mainPurple,
    padding: 5,
  },
  contactContainer: {
    padding: 10,
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: colors.queenblue,
  },
  contact: {
    color: colors.black,
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
    marginBottom: 8,
  },
  addressContainer: {
    padding: 10,
  },
  addressTitle: {
    fontSize: 18,
    color: colors.queenblue,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  addressSubTitle: {
    color: colors.black,
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
    marginBottom: 5,
  },
  addressContent: {
    color: colors.black,
    fontSize: 16,
    marginTop: 2,
  },
  productButton: {
    marginTop: 20,
    width: width - 20,
    height: 50,
    backgroundColor: colors.mainBlue,
    justifyContent: 'center',
  },
  productText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.white,
    textAlign: 'center',
  },
  openMap: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.pistachio,
    margin: 10,
  },
});

export const lala = '';
