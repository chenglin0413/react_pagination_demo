import {RETRIEVE_CATEGORIES} from '../constants';
import  CategoryDataService from '../services';

export const retrieveCateAction =(data) => async (dispatch) => {
    try {
        const res = await CategoryDataService.getAll(data);

        dispatch({
                type:RETRIEVE_CATEGORIES,
                payload:res.data
        });
    }catch(error){
        return Promise.reject(error);
    }
  };