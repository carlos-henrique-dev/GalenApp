import React, { Component } from "react";
import { createStackNavigator, createAppContainer, createSwitchNavigator } from "react-navigation";
import { Provider } from "react-redux";

import configureStore from "./src/store/store";

import LoginScreen from "./src/screens/LoginScreen";
import FirstLogin from "./src/screens/FirstLogin";
import SignUpScreen from "./src/screens/SignUpScreen";

import userTabsProfile from "./src/screens/profiles/userTabsProfile";

// stack navigator para autenticação e registro
const AuthPaths = createStackNavigator({
    Login: {
        screen: LoginScreen
    },
    FirstLogin: {
        screen: FirstLogin
    },
    SignUp: {
        screen: SignUpScreen
    }
});

const SwitchPaths = createSwitchNavigator(
    {
        AuthPaths: {
            screen: AuthPaths
        },
        userTabsProfile: {
            screen: userTabsProfile,
            navigationOptions: {
                header: null
            }
        }
    },
    { initialRouteName: "AuthPaths" }
);

const Navigator = createAppContainer(SwitchPaths);

const store = configureStore();

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Navigator />
            </Provider>
        );
    }
}
