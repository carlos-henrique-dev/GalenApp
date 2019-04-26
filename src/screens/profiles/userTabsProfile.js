import React from "react";
import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import { colors } from "../../configs/common_styles";
import Icon from "react-native-vector-icons/FontAwesome";

import userProfileMainStack from "./userProfileMainStack";
import userProfileSettingsScreen from "./userProfileSettingsScreen";

const TabNavigator = createBottomTabNavigator(
    {
        Home: {
            screen: userProfileMainStack,
            navigationOptions: {
                tabBarLabel: "Perfil",
                tabBarIcon: ({ focused, horizontal, tintColor }) => {
                    return (
                        <Icon
                            name="home"
                            size={30}
                            color={focused ? colors.fieryrose : colors.nyanza}
                        />
                    );
                }
            }
        },
        Settings: {
            screen: userProfileSettingsScreen,
            navigationOptions: {
                tabBarLabel: "Configurações",
                tabBarIcon: ({ focused, horizontal, tintColor }) => {
                    return (
                        <Icon
                            name="cogs"
                            size={30}
                            color={focused ? colors.fieryrose : colors.nyanza}
                        />
                    );
                }
            }
        }
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarOptions: {
                activeTintColor: colors.fieryrose,
                inactiveTintColor: colors.nyanza,
                style: {
                    borderTopColor: colors.metallicseaweed,
                    backgroundColor: colors.metallicseaweed
                }
            }
        })
    }
);

export default createAppContainer(TabNavigator);
