import React from 'react';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { colors } from '../../configs/common_styles';
import Icon from 'react-native-vector-icons/FontAwesome';

import ProfileMainStack from './ProfileMainStack';
import ProfileSettingsScreen from './ProfileSettingsScreen';

const TabNavigator = createBottomTabNavigator(
	{
		Home: {
			screen: ProfileMainStack,
			navigationOptions: {
				tabBarLabel: 'Perfil',
				tabBarIcon: ({ focused, horizontal, tintColor }) => {
					return <Icon name="home" size={30} color={focused ? colors.mainPurple : colors.lighterPurple} />;
				}
			}
		},
		Settings: {
			screen: ProfileSettingsScreen,
			navigationOptions: {
				tabBarLabel: 'Configurações',
				tabBarIcon: ({ focused, horizontal, tintColor }) => {
					return <Icon name="cogs" size={30} color={focused ? colors.mainPurple : colors.lighterPurple} />;
				}
			}
		}
	},
	{
		defaultNavigationOptions: ({ navigation }) => ({
			tabBarOptions: {
				activeTintColor: colors.mainPurple,
				inactiveTintColor: colors.lighterPurple
			}
		})
	}
);

export default createAppContainer(TabNavigator);
