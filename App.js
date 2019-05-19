import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { Provider } from 'react-redux';

import configureStore from './src/store/store';

import SplashScreen from './src/screens/AuthScreens/SplashScreen';
import AuthPaths from './src/screens/AuthScreens/AuthStackConfig';
import UserPaths from './src/screens/UserScreens/UserStackConfig';

const SwitchPaths = createSwitchNavigator(
  {
    SplashScreen,
    AuthPaths,
    UserPaths,
  },
  { initialRouteName: 'SplashScreen' },
);

const Navigator = createAppContainer(SwitchPaths);

const store = configureStore();

const App = () => (
  <Provider store={store}>
    <Navigator />
  </Provider>
);

export default App;
