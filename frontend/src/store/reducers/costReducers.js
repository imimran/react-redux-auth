import {
  COST_LIST_REQUEST,
  COST_LIST_SUCCESS,
  COST_LIST_FAIL,
  CREATE_COST_REQUEST,
  CREATE_COST_SUCCESS,
  CREATE_COST_FAIL,
} from "../constants/costConstants";

const initialstate = {
    costs : []
}

export const createCostReducer =(state=initialstate, action) =>{
    switch(action.type){
        case CREATE_COST_REQUEST:
            return{
                loading: true
            }
        case CREATE_COST_SUCCESS:
            return{
                loading: false, payroll: action.payload
            }    
        case CREATE_COST_FAIL:
            return{
                loading: false,
                error: action.payload
            }
        default:
            return state         
    }
}

export const costListReducer = (state=initialstate, action)=>{
    switch(action.type){
        case COST_LIST_REQUEST:
            return{
                loading: true
            }
        case COST_LIST_SUCCESS:
            return{
                loading: false,
                costs: action.payload
            }  
        case COST_LIST_FAIL:
            return{
                loading: false,
                error: action.payload
            }
        default:
            return state          
    }
}
