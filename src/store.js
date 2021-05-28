import {createStore,applyMiddleware} from 'redux';
//引入redux-devtools-extension
import {composeWithDevTools} from 'redux-devtools-extension';
//引入redux-thunk 用於支持異步action
import thunk from 'redux-thunk';
//引入彙總的AllReduce
import reducer from './Customer/reducers';




//export store
const store = createStore(reducer,composeWithDevTools(applyMiddleware(thunk)));
export default store;

