import { createAppContainer, createStackNavigator } from 'react-navigation';

import AllnightScreen from './AllnightScreen';
import DrugstoreDetails from './DrugstoreDetails';

const DrugstoreStack = createStackNavigator({
  AllnightScreen,
  DrugstoreDetails,
});

export default DrugstoreStack;
