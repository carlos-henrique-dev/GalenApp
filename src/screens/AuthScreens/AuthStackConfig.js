import { createStackNavigator } from 'react-navigation';

import LoginScreen from './LoginScreen';
import FirstLogin from './FirstLogin';
import SignUpScreen from './SignUpScreen';
import AllnightScreenPublic from './AllnightScreenPublic';
import DrugstoreDetailsPublic from './DrugstoreDetailsPublic';

// stack navigator para autenticação e registro
const AuthPaths = createStackNavigator({
  LoginScreen,
  FirstLogin,
  SignUpScreen,
  AllnightScreenPublic,
  DrugstoreDetailsPublic,
});

export default AuthPaths;
