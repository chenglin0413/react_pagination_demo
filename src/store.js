import {createStore,applyMiddleware} from 'redux';
//引入redux-devtools-extension
import {composeWithDevTools} from 'redux-devtools-extension';
import { combineReducers } from "redux";
//引入redux-thunk 用於支持異步action
import thunk from 'redux-thunk';
//引入彙總的AllReduce
import customerReducer from './Customer/reducers';
import categoryReducer from './Category/reducers';


const initialState = {};
const rootReducer =combineReducers({
    customerReducer,
    categoryReducer,
})
//export store
const store = createStore(rootReducer,initialState,composeWithDevTools(applyMiddleware(thunk)));
export default store;

