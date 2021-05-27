/* 
該文件用於彙總所有的reducer為一個彙總的reducer
*/
//引入combineReducers,用於彙總多個reducer

import {combineReducers} from 'redux';
//引入為Customer組件服務的reducer
import CustomerReducer from './customers';

//彙總所有的reducer，變為一個reducer的集合 (本例僅有一個)
export default combineReducers({
    CustomerReducer,
}) 