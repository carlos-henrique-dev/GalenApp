import { StyleSheet, Dimensions } from 'react-native';
import colors from './common_styles';

const { width } = Dimensions.get('window');

export const DrugstoreDetailsPublicStyles = StyleSheet.create({
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
    color: colors.mainPurple,
    fontWeight: 'bold',
    marginBottom: 5,
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

export const LoginScreenStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.metallicseaweed,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputBox: {
    backgroundColor: '#f00',
    width: '100%',
    height: 100,
    padding: 10,
    // marginTop: 10,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hideContainer: {
    backgroundColor: '#00f',
    flex: 2,
    width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // login button
  loginButton: {
    width: 150,
    height: 40,
    margin: 10,
    backgroundColor: colors.fieryrose,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonText: {
    color: colors.nyanza,
    fontSize: 20,
    fontWeight: 'bold',
  },
  forgotButton: {
    margin: 10,
  },
  forgotText: {
    color: colors.nyanza,
    fontSize: 14,
    textAlign: 'center',
  },
  // remember-me
  rememberButton: {
    // marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rememberText: {
    paddingLeft: 15,
    color: colors.nyanza,
    fontSize: 16,
    textAlign: 'center',
  },
  rememberTextTrue: {
    color: colors.pistachio,
  },
  rememberIconFalse: {
    color: colors.nyanza,
  },
  rememberIconTrue: {
    color: colors.pistachio,
  },

  // find drugstore
  findPharmacyButton: {
    marginBottom: 20,
    marginTop: 40,
  },
  findPharmacyText: {
    color: colors.nyanza,
    fontSize: 22,
    textAlign: 'center',
  },
});

export const SignUpScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.metallicseaweed,
  },
  footer: {
    /*  position: "absolute",
        bottom: 5 */
  },
  loginArea: {
    flexGrow: 1,
    alignItems: 'center',
    margin: 5,
    padding: 5,
    paddingBottom: 50,
  },
  loginAreaTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    color: colors.nyanza,
    marginBottom: 5,
  },
  pickImage: {
    margin: 15,
    fontSize: 18,
    marginLeft: 10,
    color: colors.nyanza,
  },
  pickImageIcon: {
    color: colors.nyanza,
    marginLeft: 5,
    marginRight: 5,
  },
  subTitle: {
    marginTop: 15,
    color: colors.nyanza,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
