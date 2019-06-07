import { StyleSheet, Dimensions } from 'react-native';
import colors from './common_styles';

const { width, height } = Dimensions.get('window');

export const PostProductFormStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  textArea: {
    alignItems: 'flex-start',
  },
  textInput: {
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.fieryrose,
    width: width - 30,
    height: 45,
    margin: 12,
  },
  textInput2: {
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.fieryrose,
    width: width - 225,
    height: 45,
    margin: 12,
  },
  text: {
    position: 'absolute',
    top: 10,
    left: 15,
    fontSize: 12,
    color: colors.queenblue,
  },
  switchArea: {
    flexDirection: 'row',
    height: 25,
    alignItems: 'center',
  },
  switchText: {
    color: colors.queenblue,
    marginLeft: 8,
    marginRight: 10,
    fontSize: 16,
  },
  imageArea: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: width - 30,
    marginTop: 20,
  },
  image: {
    borderWidth: 1,
    borderColor: colors.fieryrose,
    width: 100,
    height: 100,
  },
  imageButton: {
    backgroundColor: colors.fieryrose,
    borderRadius: 10,
    height: 40,
    width: (width * 40) / 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageText: {
    textAlign: 'center',
    fontSize: 18,
    color: colors.queenblue,
  },
  footButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  postButton: {
    marginTop: 35,
    margin: 10,
    borderRadius: 10,
    height: 40,
    width: (width * 40) / 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const PharmacyCardStyles = StyleSheet.create({
  container: {
    width: width - 15,
    height: (height * 25) / 100,
    justifyContent: 'center',
    flexDirection: 'column',
    alignSelf: 'center',
    marginTop: 2,
    marginBottom: 4,
    // sombras
    padding: 5,
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1,
    },
  },
  infoContainer: {
    justifyContent: 'space-around',
    flex: 4,
    flexDirection: 'row',
  },
  imageContainer: {
    width: (width * 30) / 100,
    height: '75%',
    justifyContent: 'center',
    marginLeft: 10,
    marginTop: 20,
  },
  dataContainer: {
    marginTop: 20,
    width: '65%',
    height: '100%',
    alignItems: 'center',
  },
  image: {
    flex: 1,
  },
  imageText: {
    textAlign: 'center',
    color: '#CED4DA',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.mainPurple,
    marginTop: 0,
    margin: 5,
  },
  contactContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contact: {
    color: colors.queenblue,
    margin: 5,
  },
  pharmacyContact: {
    fontSize: 18,
    color: colors.mainPurple,
    fontWeight: 'bold',
    margin: 2,
  },
  detailContainer: {
    flex: 1,
    marginBottom: 10,
  },
  detail: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.pistachio,
  },
});

export const PostAllNightFormStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  textArea: {
    alignItems: 'flex-start',
  },
  numberNeighborArea: {
    flexDirection: 'row',
  },
  textInput: {
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.fieryrose,
    width: (width * 95) / 100,
    height: 45,
    margin: 8,
    paddingTop: 20,
    paddingBottom: 4,
    justifyContent: 'center',
  },
  text: {
    position: 'absolute',
    top: 10,
    left: 15,
    fontSize: 12,
    color: colors.queenblue,
  },
  switchArea: {
    flexDirection: 'row',
    height: 25,
    alignItems: 'center',
  },
  switchText: {
    color: colors.queenblue,
    marginLeft: 8,
    marginRight: 10,
    fontSize: 16,
  },
  imageArea: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: (width * 95) / 100,
    marginTop: 10,
  },
  image: {
    borderWidth: 1,
    borderColor: colors.fieryrose,
    width: 100,
    height: 100,
  },
  imageButton: {
    backgroundColor: colors.fieryrose,
    borderRadius: 10,
    height: 40,
    width: (width * 40) / 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageText: {
    textAlign: 'center',
    fontSize: 18,
    color: colors.queenblue,
  },
  footButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  postButton: {
    marginTop: 20,
    margin: 10,
    borderRadius: 10,
    height: 40,
    width: (width * 40) / 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  getLocation: {
    width: (width * 95) / 100,
    alignItems: 'center',
  },
  getLocationText: {
    fontSize: 18,
    color: colors.fieryrose,
    fontWeight: 'bold',
  },
});

export const ProductStyles = StyleSheet.create({
  card: {
    width: width - 15,
    height: (height * 20) / 100,
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 2,
    marginBottom: 4,
    backgroundColor: colors.white,
    shadowOffset: { width: 0, height: 2 },
    shadowColor: colors.fieryrose,
    shadowOpacity: 0.9,
    shadowRadius: 5,
    elevation: 7,
  },
  imageArea: {
    width: (width * 30) / 100,
  },
  image: {
    width: (width * 25) / 100,
    height: (height * 13) / 100,
    marginTop: 12,
    margin: 8,
  },
  noImageText: {
    fontSize: 14,
    textAlign: 'center',
    color: colors.queenblue,
  },
  onSaleText: {
    textAlign: 'center',
    fontSize: 14,
    color: colors.pistachio,
    fontWeight: 'bold',
  },
  textArea: {
    flex: 1,
    alignItems: 'flex-start',
  },
  prodName: {
    marginTop: 15,
    margin: 2,
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.queenblue,
    textAlign: 'center',
  },
  prodPrice: {
    margin: 4,
    fontSize: 16,
    color: colors.metallicseaweed,
    textAlign: 'center',
  },
  prodPlace: {
    margin: 2,
    fontSize: 14,
    color: colors.metallicseaweed,
    textAlign: 'center',
  },
  postedBy: {
    margin: 2,
    position: 'absolute',
    bottom: 5,
    right: 5,
    fontSize: 14,
    color: colors.metallicseaweed,
    textAlign: 'center',
  },
  postedByText: {
    fontSize: 14,
    color: colors.metallicseaweed,
    textAlign: 'center',
  },
  swipeableButtons: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 20,
  },
});
