import { createStackNavigator, createAppContainer } from 'react-navigation';

import UserMainScreen from './UserMainScreen';
import AllnightScreen from '../DrugstoreScreens/AllnightScreen';
import Opendrugstores from '../DrugstoreScreens/Opendrugstores';
import AddAllNightScreen from '../DrugstoreScreens/AddAllNightScreen';
import DrugstoreDetails from '../DrugstoreScreens/DrugstoreDetails';
import ProductsScreen from '../ProductsScreens/ProductsScreen';
import AddProductScreen from '../ProductsScreens/AddProductScreen';
import EditProductScreen from '../ProductsScreens/EditProductScreen';
import UserProductsScreen from '../ProductsScreens/UserProductsScreen';
import UserSettingsScreen from './UserSettingsScreen';

const ProfileNavigator = createStackNavigator({
  UserMainScreen,
  AllnightScreen,
  Opendrugstores,
  DrugstoreDetails,
  AddAllNightScreen,
  ProductsScreen,
  AddProductScreen,
  EditProductScreen,
  UserProductsScreen,
  UserSettingsScreen,
});

export default createAppContainer(ProfileNavigator);
