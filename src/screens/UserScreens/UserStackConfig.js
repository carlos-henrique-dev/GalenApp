import { createStackNavigator, createAppContainer } from "react-navigation";

import UserMainScreen from "./UserMainScreen";
import DrugstoreStack from "../DrugstoreScreens/DrugstoreStackConfig";
import ProductsScreen from "../ProductsScreens/ProductsScreen";
import AddProductScreen from "../ProductsScreens/AddProductScreen";
import UserSettingsScreen from "./UserSettingsScreen";

const ProfileNavigator = createStackNavigator({
    UserMainScreen,
    DrugstoreStack,
    ProductsScreen,
    AddProductScreen,
    UserSettingsScreen
});

export default createAppContainer(ProfileNavigator);
