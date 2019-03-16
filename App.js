import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { colors } from './src/configs/common_styles';
import LoginScreen from './src/screens/LoginScreen';
import FirstLogin from './src/screens/FirstLogin';
import SignUpScreen from './src/screens/SignUpScreen';
import TabsProfile from './src/screens/profiles/TabsProfile';

const AppNavigator = createStackNavigator(
	{
		Login: {
			screen: LoginScreen
		},
		FirstLogin: {
			screen: FirstLogin
		},
		SignUp: {
			screen: SignUpScreen
		},
		TabsProfile: {
			screen: TabsProfile,
			navigationOptions: {
				header: null
			}
		}
	},
	{
		initialRouteName: 'Login'
	}
);

export default createAppContainer(AppNavigator);
