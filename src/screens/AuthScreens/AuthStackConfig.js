import { createStackNavigator } from "react-navigation";

import LoginScreen from "./LoginScreen";
import FirstLogin from "./FirstLogin";
import SignUpScreen from "./SignUpScreen";

// stack navigator para autenticação e registro
const AuthPaths = createStackNavigator({
    LoginScreen,
    FirstLogin,
    SignUpScreen
});

export default AuthPaths;
