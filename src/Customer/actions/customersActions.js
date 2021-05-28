import {CREATE_CUSTOMER,RETRIEVE_CUSTOMERS} from "../constants";
  
import CustomerDataService from "../services";
  
  export const createCustAction = (data) => async (dispatch) => {
    try {
      const res = await CustomerDataService.create(data);
      console.log(res.data);
      dispatch({
        type: CREATE_CUSTOMER,
        payload: res.data,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  export const retrieveCustAction =(data) => async (dispatch) => {
    try {
        const res = await CustomerDataService.getAll(data);

        dispatch({
                type:RETRIEVE_CUSTOMERS,
                payload:res.data
        });
        return Promise.resolve(res.data);
    }catch(error){
        return Promise.reject(error);
    }
  };
  