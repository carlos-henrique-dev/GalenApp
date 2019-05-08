import { createStackNavigator, createAppContainer } from "react-navigation";

import UserMainScreen from "./UserMainScreen";
import AllnightScreen from "../DrugstoreScreens/AllnightScreen";
import AddAllNightScreen from "../DrugstoreScreens/AddAllNightScreen";
import DrugstoreDetails from "../DrugstoreScreens/DrugstoreDetails";
import ProductsScreen from "../ProductsScreens/ProductsScreen";
import AddProductScreen from "../ProductsScreens/AddProductScreen";
import UserProductsScreen from "../ProductsScreens/UserProductsScreen";
import UserSettingsScreen from "./UserSettingsScreen";

const ProfileNavigator = createStackNavigator({
    UserMainScreen,
    AllnightScreen,
    DrugstoreDetails,
    AddAllNightScreen,
    ProductsScreen,
    AddProductScreen,
    UserProductsScreen,
    UserSettingsScreen
});

export default createAppContainer(ProfileNavigator);
