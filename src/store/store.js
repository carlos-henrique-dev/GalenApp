import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import user from "./ducks/user";

const rootReducer = combineReducers({
    user
});

const configureStore = () => {
    return createStore(rootReducer, applyMiddleware(thunk));
};

export default configureStore;
