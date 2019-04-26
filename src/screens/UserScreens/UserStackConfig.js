import { createStackNavigator } from "react-navigation";

import UserMainScreen from "./UserMainScreen";
import DrugstoreStack from "../DrugstoreScreens/DrugstoreStackConfig";
import ProductsScreen from "../ProductsScreens/ProductsScreen";
import AddProductScreen from "../ProductsScreens/AddProductScreen";

const ProfileNavigator = createStackNavigator({
    UserMainScreen,
    DrugstoreStack,
    ProductsScreen,
    AddProductScreen
});

export default ProfileNavigator;
