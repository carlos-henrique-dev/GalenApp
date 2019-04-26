import React, { Component } from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { Provider } from "react-redux";

import configureStore from "./src/store/store";

import AuthPaths from "./src/screens/AuthScreens/AuthStackConfig";
import UserPaths from "./src/screens/UserScreens/UserTabsConfig";

const SwitchPaths = createSwitchNavigator(
    {
        AuthPaths,
        UserPaths /* : {
            screen: UserPaths,
            navigationOptions: {
                header: null
            }
        } */
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
