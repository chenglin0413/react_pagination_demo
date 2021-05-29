/*
1. 該文件是用於創建一個為Category組件服務的reducer,reducer的本質就是一個函數
2. reducer函數會接到兩個參數，分別為之前的狀態(initState)這裡是categories , 動作對象(action)
*/
import {RETRIEVE_CATEGORIES} from '../constants';


const initState = [{}];

export default function categoryReducer(categories=initState,action){
    const{type,payload} = action;
    console.log("categoryReducer",type,payload);
    switch (type){
        case RETRIEVE_CATEGORIES:
            return payload; 
        default:
            return categories;
    }
}