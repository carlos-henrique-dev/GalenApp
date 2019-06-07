import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

/* import createLogger from 'redux-logger'; */

import user from './ducks/user';
import drugstore from './ducks/drugstore';

const rootReducer = combineReducers({
  user,
  drugstore,
});

/* const logger = createLogger(); */

const configureStore = () => createStore(rootReducer, applyMiddleware(thunk /* logger */));

export default configureStore;
