import { createStackNavigator } from "react-navigation";

import LoginScreen from "./LoginScreen";
import FirstLogin from "./FirstLogin";
import SignUpScreen from "./SignUpScreen";
import AllnightScreen from "../DrugstoreScreens/AllnightScreen";
import DrugstoreDetails from "../DrugstoreScreens/DrugstoreDetails";

// stack navigator para autenticação e registro
const AuthPaths = createStackNavigator({
    LoginScreen,
    FirstLogin,
    SignUpScreen,
    AllnightScreenPublic: {
        screen: AllnightScreen
    },
    AllnightScreenDetail: {
        screen: DrugstoreDetails
    }
});

export default AuthPaths;
