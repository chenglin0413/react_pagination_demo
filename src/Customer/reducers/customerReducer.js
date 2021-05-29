/*
1. 該文件是用於創建一個為Customer組件服務的reducer,reducer的本質就是一個函數
2. reducer函數會接到兩個參數，分別為之前的狀態(initState)這裡是customers , 動作對象(action)
*/
import {CREATE_CUSTOMER,RETRIEVE_CUSTOMERS} from '../constants';

const initState = [{}];

export default function customerReducer(customers=initState,action){
    const{type,payload} = action;
    console.log("reducer",type,payload);
    console.log(customers);
    switch (type){
        case CREATE_CUSTOMER:
            return [...customers,payload];
        case RETRIEVE_CUSTOMERS:
            return  payload;  
        default:
            return customers;
    }
}