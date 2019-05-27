import { createStackNavigator, createAppContainer } from 'react-navigation';

import DrugstoreAdminMainScreen from './DrugstoreAdminMainScreen';
import DrugstoreAdminProductsScreen from './DrugstoreAdminProductsScreen';
import AddProductScreen from '../ProductsScreens/AddProductScreen';
import EditProductScreen from '../ProductsScreens/EditProductScreen';
import DrugstoreAdminSettingsScreen from './DrugstoreAdminSettingsScreen';

const ProfileNavigator = createStackNavigator({
  DrugstoreAdminMainScreen,
  DrugstoreAdminProductsScreen,
  AddProductScreen,
  EditProductScreen,
  DrugstoreAdminSettingsScreen,
});

export default createAppContainer(ProfileNavigator);
